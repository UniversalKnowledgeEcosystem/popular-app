import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime="nodejs";
function db(){const url=process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL;const key=process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.SUPABASE_SECRET_KEY;if(!url||!key)throw new Error("Supabase não configurado");return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}})}
function tel(v:unknown){const t=String(v||"").replace(/\D/g,"");return t.length>=10&&t.length<=13?t:null}

export async function GET(req:NextRequest){
 try{
  const telefone=tel(req.nextUrl.searchParams.get("telefone"));if(!telefone)return NextResponse.json({error:"WhatsApp inválido"},{status:400});
  const database=db();
  const [{data:cliente,error:cError},{data:pedidos,error:pError}]=await Promise.all([
   database.from("clientes_fidelidade").select("nome,telefone,pontos,total_pedidos,total_gasto,atualizado_em").eq("telefone",telefone).maybeSingle(),
   database.from("pedidos").select("pedido_id,nome_cliente,total,itens,status,criado_em,confirmado_em").eq("whatsapp",telefone).order("criado_em",{ascending:false}).limit(30)
  ]);
  if(cError)throw cError;if(pError)throw pError;
  return NextResponse.json({cliente:cliente||null,pedidos:pedidos||[]});
 }catch(e){console.error("perfil GET",e);return NextResponse.json({error:"Não foi possível carregar sua conta"},{status:500})}
}
