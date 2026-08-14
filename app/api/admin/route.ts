import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export const runtime = "nodejs";

function db() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Supabase não configurado");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function secret() {
  const s = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!s) throw new Error("Chave do servidor não configurada");
  return s;
}

function sign(payload: string) { return crypto.createHmac("sha256", secret()).update(payload).digest("hex"); }
function makeToken() { const exp = Date.now() + 8*60*60*1000; const payload=`admin:${exp}`; return Buffer.from(`${payload}:${sign(payload)}`).toString("base64url"); }
function validToken(token: string | null) { try { if(!token)return false; const raw=Buffer.from(token,"base64url").toString(); const [role,exp,sig]=raw.split(":"); const payload=`${role}:${exp}`; if(role!=="admin"||Number(exp)<Date.now())return false; const a=Buffer.from(sig,"hex"),b=Buffer.from(sign(payload),"hex"); return a.length===b.length&&crypto.timingSafeEqual(a,b); } catch{return false;} }
function telefone(v: unknown) { const t=String(v||"").replace(/\D/g,""); return t.length>=10&&t.length<=13?t:null; }

async function dadosCliente(database: ReturnType<typeof db>, id: number) {
  const { data: cliente, error } = await database.from("clientes_fidelidade").select("id,nome,telefone,pontos,total_pedidos,total_gasto,atualizado_em").eq("id",id).single();
  if(error) throw error;
  const { data: historico, error: hError } = await database.from("historico_fidelidade").select("id,tipo,pontos,descricao,pedido_id,criado_em").eq("cliente_id",id).order("criado_em",{ascending:false}).limit(20);
  if(hError) throw hError;
  return { cliente, historico: historico || [] };
}

export async function POST(req: NextRequest) {
  try {
    const body=await req.json(); const database=db();
    if(body.action==="login") { const usuario=String(body.usuario||"").trim(),senha=String(body.senha||""); const {data,error}=await database.rpc("verificar_admin_popular",{p_usuario:usuario,p_senha:senha}); if(error)throw error; if(!data)return NextResponse.json({error:"Usuário ou senha incorretos"},{status:401}); return NextResponse.json({token:makeToken()}); }
    if(!validToken(req.headers.get("authorization")?.replace(/^Bearer\s+/i,"")||null)) return NextResponse.json({error:"Sessão inválida ou expirada"},{status:401});
    if (body.action === "listar_pedidos") {
  const { data: pedidos, error } = await database
    .from("pedidos")
    .select(
      "id,pedido_id,whatsapp,nome_cliente,total,status,selo_creditado,criado_em,confirmado_em"
    )
    .eq("status", "pendente")
    .order("criado_em", { ascending: false })
    .limit(50);

  if (error) throw error;

  return NextResponse.json({
    pedidos: pedidos || [],
  });
}
    const tel=telefone(body.telefone); if(!tel)return NextResponse.json({error:"WhatsApp inválido"},{status:400});
    const {data:cliente,error:buscaErro}=await database.from("clientes_fidelidade").select("id,nome,telefone,pontos,total_pedidos,total_gasto,atualizado_em").eq("telefone",tel).maybeSingle();
    if(buscaErro)throw buscaErro; if(!cliente)return NextResponse.json({error:"Cliente não encontrado"},{status:404});
    if(body.action==="buscar") return NextResponse.json(await dadosCliente(database,cliente.id));
    if(body.action==="adicionar") { const pedidoId=`ADMIN-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`; const {error}=await database.rpc("creditar_selo_fidelidade",{p_telefone:tel,p_pedido_id:pedidoId}); if(error)throw error; }
    else if(body.action==="remover") {
      if(cliente.pontos<=0)return NextResponse.json({error:"Cliente já está com 0 selos"},{status:400});
      const {error:updateError}=await database.from("clientes_fidelidade").update({pontos:cliente.pontos-1,atualizado_em:new Date().toISOString()}).eq("id",cliente.id); if(updateError)throw updateError;
      const {error:historicoError}=await database.from("historico_fidelidade").insert({cliente_id:cliente.id,tipo:"resgate",pontos:-1,descricao:"Selo removido manualmente pelo painel administrativo",pedido_id:`ADMIN-REMOVER-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`});
      if(historicoError){await database.from("clientes_fidelidade").update({pontos:cliente.pontos,atualizado_em:new Date().toISOString()}).eq("id",cliente.id);throw historicoError;}
    } else return NextResponse.json({error:"Ação inválida"},{status:400});
    return NextResponse.json(await dadosCliente(database,cliente.id));
  } catch(e){console.error("admin API",e);return NextResponse.json({error:"Não foi possível concluir a operação"},{status:500});}
}
