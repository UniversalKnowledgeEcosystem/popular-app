"use client";
import Link from "next/link";
import {useMemo,useState} from "react";
import {useCart} from "../context/CartContext";
import {formatPrice} from "../../utils/format";

export default function Checkout(){
 const {items,total,limpar}=useCart();
 const [tipo,setTipo]=useState<"entrega"|"retirada">("entrega");
 const [pagamento,setPagamento]=useState("Pix");
 const [endereco,setEndereco]=useState("");
 const [nome,setNome]=useState("");
 const [tel,setTel]=useState("");
 const [slot,setSlot]=useState("Hoje • 18h–20h");
 const [substituicao,setSubstituicao]=useState("similar");
 const [cupom,setCupom]=useState("");
 const [desconto,setDesconto]=useState(0);
 const [ok,setOk]=useState(false);
 const frete=tipo==="entrega"?7.9:0;
 const totalFinal=useMemo(()=>Math.max(0,total+frete-desconto),[total,frete,desconto]);
 function aplicar(){const c=cupom.trim().toUpperCase();if(c==="MERCADO5")setDesconto(5);else if(c==="FRETEGRATIS"&&tipo==="entrega")setDesconto(frete);else setDesconto(0)}
 function finalizar(){if(!items.length||!nome.trim()||!tel.trim()||(tipo==="entrega"&&!endereco.trim()))return;setOk(true);limpar()}
 if(ok)return <main className="min-h-screen bg-[#f6f7f9] p-5 text-zinc-900"><div className="max-w-md mx-auto bg-white rounded-3xl p-7 text-center border border-zinc-200 mt-10"><div className="text-6xl">✅</div><h1 className="text-3xl font-black mt-3">Pedido confirmado</h1><p className="text-zinc-500 mt-2">Protótipo concluído com sucesso. Nesta base, o próximo passo é ligar o checkout ao banco e ao meio de pagamento real.</p><Link href="/cardapio" className="block bg-emerald-700 text-white py-4 rounded-2xl font-black mt-5">Voltar ao catálogo</Link></div></main>;
 return <main className="min-h-screen bg-[#f6f7f9] text-zinc-900 p-4 pb-28"><div className="max-w-3xl mx-auto"><div className="flex items-center justify-between"><div><p className="text-xs font-black text-emerald-700 uppercase">Mercado Fácil</p><h1 className="text-3xl font-black">Finalizar compra</h1></div><Link href="/carrinho" className="text-sm font-bold text-emerald-700">← Carrinho</Link></div>
 <section className="mt-5 bg-white border border-zinc-200 rounded-3xl p-5"><h2 className="font-black text-lg">Como você quer receber?</h2><div className="grid grid-cols-2 gap-2 mt-3"><button onClick={()=>setTipo("entrega")} className={`p-4 rounded-2xl font-black ${tipo==="entrega"?"bg-emerald-700 text-white":"bg-zinc-100"}`}>🚚 Entrega</button><button onClick={()=>setTipo("retirada")} className={`p-4 rounded-2xl font-black ${tipo==="retirada"?"bg-emerald-700 text-white":"bg-zinc-100"}`}>🏪 Retirada</button></div>{tipo==="entrega"&&<input value={endereco} onChange={e=>setEndereco(e.target.value)} placeholder="Rua, nº, bairro e referência" className="w-full mt-3 bg-zinc-100 border border-zinc-200 rounded-xl p-3"/>}<select value={slot} onChange={e=>setSlot(e.target.value)} className="w-full mt-3 bg-zinc-100 border border-zinc-200 rounded-xl p-3"><option>Hoje • 18h–20h</option><option>Hoje • 20h–22h</option><option>Amanhã • 8h–10h</option><option>Amanhã • 10h–12h</option></select></section>
 <section className="mt-4 bg-white border border-zinc-200 rounded-3xl p-5"><h2 className="font-black text-lg">Se faltar algum produto</h2><div className="space-y-2 mt-3 text-sm"><label className="flex gap-2"><input type="radio" checked={substituicao==="similar"} onChange={()=>setSubstituicao("similar")}/> Aceitar produto similar de valor próximo</label><label className="flex gap-2"><input type="radio" checked={substituicao==="contato"} onChange={()=>setSubstituicao("contato")}/> Entrar em contato antes de substituir</label><label className="flex gap-2"><input type="radio" checked={substituicao==="remover"} onChange={()=>setSubstituicao("remover")}/> Remover o item do pedido</label></div></section>
 <section className="mt-4 bg-white border border-zinc-200 rounded-3xl p-5 space-y-3"><h2 className="font-black text-lg">Seus dados</h2><input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Nome" className="w-full bg-zinc-100 border border-zinc-200 rounded-xl p-3"/><input value={tel} onChange={e=>setTel(e.target.value)} placeholder="WhatsApp" className="w-full bg-zinc-100 border border-zinc-200 rounded-xl p-3"/><select value={pagamento} onChange={e=>setPagamento(e.target.value)} className="w-full bg-zinc-100 border border-zinc-200 rounded-xl p-3"><option>Pix</option><option>Cartão na entrega</option><option>Dinheiro</option></select></section>
 <section className="mt-4 bg-white border border-zinc-200 rounded-3xl p-5"><h2 className="font-black">Cupom</h2><div className="flex gap-2 mt-3"><input value={cupom} onChange={e=>setCupom(e.target.value)} placeholder="Ex.: MERCADO5" className="flex-1 bg-zinc-100 border border-zinc-200 rounded-xl p-3"/><button onClick={aplicar} className="bg-zinc-900 text-white px-4 rounded-xl font-black">Aplicar</button></div></section>
 <section className="mt-4 bg-white border border-zinc-200 rounded-3xl p-5"><div className="flex justify-between text-sm"><span>Produtos</span><b>{formatPrice(total)}</b></div><div className="flex justify-between text-sm mt-2"><span>{tipo==="entrega"?"Entrega":"Retirada"}</span><b>{formatPrice(frete)}</b></div>{desconto>0&&<div className="flex justify-between text-sm mt-2 text-emerald-700"><span>Desconto</span><b>- {formatPrice(desconto)}</b></div>}<div className="flex justify-between text-xl font-black mt-4 pt-4 border-t"><span>Total</span><span className="text-emerald-700">{formatPrice(totalFinal)}</span></div><button onClick={finalizar} disabled={!items.length} className="w-full mt-4 bg-emerald-700 disabled:bg-zinc-300 text-white py-4 rounded-2xl font-black">Confirmar pedido</button></section></div></main>
}
