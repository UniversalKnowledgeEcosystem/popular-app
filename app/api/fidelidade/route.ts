import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
const MINIMO_SELO = 12;

function admin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Supabase não configurado");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function telefoneValido(valor: unknown) {
  let telefone = String(valor || "").replace(/\D/g, "");
  if (telefone.startsWith("0055")) telefone = telefone.slice(4);
  else if (telefone.startsWith("55") && telefone.length >= 12) telefone = telefone.slice(2);
  if (/^0\d{10,11}$/.test(telefone)) telefone = telefone.slice(1);
  return telefone.length >= 10 && telefone.length <= 11 ? telefone : null;
}

async function reconciliarSelos(db: ReturnType<typeof admin>, telefone: string) {
  // Corrige automaticamente qualquer pedido elegível que tenha sido confirmado,
  // mas cujo selo ainda não tenha sido contabilizado. A marcação no pedido
  // garante que o mesmo pedido nunca gere dois selos.
  const { data: pedidos, error: pedidosErro } = await db
    .from("pedidos")
    .select("id,pedido_id,total,selo_creditado,status")
    .eq("whatsapp", telefone)
    .eq("selo_creditado", false)
    .gte("total", MINIMO_SELO)
    .in("status", ["confirmado", "caminho", "entregue"]);
  if (pedidosErro) throw pedidosErro;
  if (!pedidos?.length) return 0;

  let creditados = 0;
  let gasto = 0;
  for (const pedido of pedidos) {
    const { data: marcado, error: marcarErro } = await db
      .from("pedidos")
      .update({ selo_creditado: true, confirmado_em: new Date().toISOString() })
      .eq("id", pedido.id)
      .eq("selo_creditado", false)
      .select("id,total")
      .maybeSingle();
    if (marcarErro) throw marcarErro;
    if (marcado) {
      creditados += 1;
      gasto += Number(marcado.total || 0);
    }
  }
  if (!creditados) return 0;

  const { data: cliente, error: clienteErro } = await db
    .from("clientes_fidelidade")
    .select("id,pontos,total_pedidos,total_gasto")
    .eq("telefone", telefone)
    .maybeSingle();
  if (clienteErro) throw clienteErro;

  if (cliente) {
    const { error } = await db.from("clientes_fidelidade").update({
      pontos: Number(cliente.pontos || 0) + creditados,
      total_pedidos: Number(cliente.total_pedidos || 0) + creditados,
      total_gasto: Number((Number(cliente.total_gasto || 0) + gasto).toFixed(2)),
      atualizado_em: new Date().toISOString(),
    }).eq("id", cliente.id);
    if (error) throw error;
  } else {
    const { error } = await db.from("clientes_fidelidade").insert({
      nome: "Cliente",
      telefone,
      pontos: creditados,
      total_pedidos: creditados,
      total_gasto: Number(gasto.toFixed(2)),
      atualizado_em: new Date().toISOString(),
    });
    if (error) throw error;
  }
  return creditados;
}

export async function GET(req: NextRequest) {
  try {
    const telefone = telefoneValido(req.nextUrl.searchParams.get("telefone"));
    if (!telefone) return NextResponse.json({ error: "WhatsApp inválido" }, { status: 400 });
    const db = admin();
    const novosSelos = await reconciliarSelos(db, telefone);
    const { data, error } = await db.from("clientes_fidelidade")
      .select("nome,telefone,pontos,total_pedidos,total_gasto,atualizado_em")
      .eq("telefone", telefone).maybeSingle();
    if (error) throw error;
    return NextResponse.json({ cliente: data || null, novos_selos: novosSelos });
  } catch (e) {
    console.error("fidelidade GET", e);
    return NextResponse.json({ error: "Não foi possível consultar a fidelidade" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const telefone = telefoneValido(body.telefone);
    if (!telefone) return NextResponse.json({ error: "WhatsApp inválido" }, { status: 400 });
    const nome = String(body.nome || "Cliente").trim().slice(0, 100) || "Cliente";
    const db = admin();
    const { data: existente, error: buscaErro } = await db.from("clientes_fidelidade")
      .select("id,nome,telefone,pontos,total_pedidos,total_gasto,atualizado_em")
      .eq("telefone", telefone).maybeSingle();
    if (buscaErro) throw buscaErro;
    if (!existente) {
      const { error } = await db.from("clientes_fidelidade").insert({ nome, telefone });
      if (error) throw error;
    }
    const novosSelos = await reconciliarSelos(db, telefone);
    const { data, error } = await db.from("clientes_fidelidade")
      .select("id,nome,telefone,pontos,total_pedidos,total_gasto,atualizado_em")
      .eq("telefone", telefone).single();
    if (error) throw error;
    return NextResponse.json({ cliente: data, criado: !existente, novos_selos: novosSelos }, { status: existente ? 200 : 201 });
  } catch (e) {
    console.error("fidelidade POST", e);
    return NextResponse.json({ error: "Não foi possível salvar o cartão" }, { status: 500 });
  }
}
