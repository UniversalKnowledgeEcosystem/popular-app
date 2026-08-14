
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export const runtime = "nodejs";

function db() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error("Supabase não configurado");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function telefoneValido(valor: unknown) {
  const telefone = String(valor || "").replace(/\D/g, "");

  return telefone.length >= 10 && telefone.length <= 13
    ? telefone
    : null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const whatsapp = telefoneValido(body.whatsapp);
    const nomeCliente = String(body.nome_cliente || "")
      .trim()
      .slice(0, 100);

    const total = Number(body.total);

    if (!whatsapp) {
      return NextResponse.json(
        { error: "WhatsApp inválido" },
        { status: 400 }
      );
    }

    if (!nomeCliente) {
      return NextResponse.json(
        { error: "Nome do cliente é obrigatório" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(total) || total <= 0) {
      return NextResponse.json(
        { error: "Total do pedido inválido" },
        { status: 400 }
      );
    }

    const pedidoId =
      `PED-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

    const database = db();

    const { data, error } = await database
      .from("pedidos")
      .insert({
        pedido_id: pedidoId,
        whatsapp,
        nome_cliente: nomeCliente,
        total: Number(total.toFixed(2)),
        status: "pendente",
        selo_creditado: false,
      })
      .select(
        "pedido_id,whatsapp,nome_cliente,total,status,criado_em,selo_creditado"
      )
      .single();

    if (error) throw error;

    return NextResponse.json(
      {
        pedido: data,
        criado: true,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("pedidos POST", e);

    return NextResponse.json(
      { error: "Não foi possível registrar o pedido" },
      { status: 500 }
    );
  }
}
