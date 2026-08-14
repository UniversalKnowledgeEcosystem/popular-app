import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
export const runtime="nodejs";
const MINIMO_SELO=12;
function db(){const url=process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL;const key=process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.SUPABASE_SECRET_KEY;if(!url||!key)throw new Error("Supabase não configurado");return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}})}
function telefoneValido(valor:unknown){const telefone=String(valor||"").replace(/\D/g,"");return telefone.length>=10&&telefone.length<=13?telefone:null}
type ItemEntrada={produto_id?:unknown;nome?:unknown;preco?:unknown;quantidade?:unknown};
export async function POST(req:NextRequest){try{const body=await req.json();const whatsapp=telefoneValido(body.whatsapp);const nomeCliente=String(body.nome_cliente||"").trim().slice(0,100);const total=Number(body.total);const itens=Array.isArray(body.itens)?body.itens as ItemEntrada[]:[];
 if(!whatsapp)return NextResponse.json({error:"WhatsApp inválido"},{status:400});if(!nomeCliente)return NextResponse.json({error:"Nome do cliente é obrigatório"},{status:400});if(!Number.isFinite(total)||total<=0)return NextResponse.json({error:"Total do pedido inválido"},{status:400});
 const itensValidos=itens.map(i=>({produto_id:String(i.produto_id||"").slice(0,100),nome:String(i.nome||"").trim().slice(0,150),preco:Number(i.preco),quantidade:Math.floor(Number(i.quantidade))})).filter(i=>i.nome&&Number.isFinite(i.preco)&&i.preco>=0&&Number.isFinite(i.quantidade)&&i.quantidade>0);if(!itensValidos.length)return NextResponse.json({error:"O pedido precisa ter pelo menos um item"},{status:400});
 const soma=itensValidos.reduce((s,i)=>s+i.preco*i.quantidade,0);if(Math.abs(soma-total)>0.02)return NextResponse.json({error:"O total do pedido não confere com os itens"},{status:400});
 const elegivelSelo=total>=MINIMO_SELO;const pedidoId=`PED-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;const database=db();const agora=new Date().toISOString();
 const registro={pedido_id:pedidoId,whatsapp,nome_cliente:nomeCliente,total:Number(total.toFixed(2)),status:elegivelSelo?"pendente":"confirmado",selo_creditado:false,itens:itensValidos,...(!elegivelSelo?{confirmado_em:agora}:{})};
 const{data,error}=await database.from("pedidos").insert(registro).select("pedido_id,whatsapp,nome_cliente,total,status,criado_em,confirmado_em,selo_creditado").single();
 if(error){if(String(error.message||"").toLowerCase().includes("itens")){const fallback=await database.from("pedidos").insert({pedido_id:pedidoId,whatsapp,nome_cliente:nomeCliente,total:Number(total.toFixed(2)),status:elegivelSelo?"pendente":"confirmado",selo_creditado:false,...(!elegivelSelo?{confirmado_em:agora}:{})}).select("pedido_id,whatsapp,nome_cliente,total,status,criado_em,confirmado_em,selo_creditado").single();if(fallback.error)throw fallback.error;return NextResponse.json({pedido:fallback.data,criado:true,elegivel_selo:elegivelSelo,minimo_selo:MINIMO_SELO,aviso:"Banco ainda precisa da coluna itens"},{status:201})}throw error}
 return NextResponse.json({pedido:data,criado:true,elegivel_selo:elegivelSelo,minimo_selo:MINIMO_SELO},{status:201});
 }catch(e){console.error("pedidos POST",e);return NextResponse.json({error:"Não foi possível registrar o pedido"},{status:500})}}
