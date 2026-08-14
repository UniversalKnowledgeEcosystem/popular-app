import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function admin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Supabase não configurado");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function telefoneValido(valor: unknown) {
  const telefone = String(valor || "").replace(/\D/g, "");
  return telefone.length >= 10 && telefone.length <= 13 ? telefone : null;
}

export async function GET(req: NextRequest) {
  try {
    const telefone = telefoneValido(req.nextUrl.searchParams.get("telefone"));
    if (!telefone) return NextResponse.json({ error: "WhatsApp inválido" }, { status: 400 });
    const db = admin();
    const { data, error } = await db.from("clientes_fidelidade")
      .select("nome,telefone,pontos,total_pedidos,total_gasto,atualizado_em")
      .eq("telefone", telefone).maybeSingle();
    if (error) throw error;
    return NextResponse.json({ cliente: data || null });
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
    if (existente) return NextResponse.json({ cliente: existente, criado: false });
    const { data, error } = await db.from("clientes_fidelidade")
      .insert({ nome, telefone }).select("id,nome,telefone,pontos,total_pedidos,total_gasto,atualizado_em").single();
    if (error) throw error;
    return NextResponse.json({ cliente: data, criado: true }, { status: 201 });
  } catch (e) {
    console.error("fidelidade POST", e);
    return NextResponse.json({ error: "Não foi possível salvar o cartão" }, { status: 500 });
  }
}
