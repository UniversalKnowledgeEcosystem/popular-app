"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../../utils/format";
export default function Carrinho(){
 const {items,total,adicionar,diminuir,remover,limpar}=useCart();
 const [nome,setNome]=useState(""); const [tipo,setTipo]=useState<"entrega"|"retirada">("entrega"); const [endereco,setEndereco]=useState(""); const [pagamento,setPagamento]=useState("Pix"); const [obs,setObs]=useState("");
async function finalizar() {
  if (!nome.trim()) {
    alert("Digite seu nome para finalizar o pedido.");
    return;
  }

  if (tipo === "entrega" && !endereco.trim()) {
    alert("Digite o endereço para entrega.");
    return;
  }

  const whatsapp = prompt(
    "Digite seu WhatsApp com DDD para registrar o pedido e participar do Clube Popular:"
  );

  if (!whatsapp) return;

  const telefone = whatsapp.replace(/\D/g, "");

  if (telefone.length < 10 || telefone.length > 13) {
    alert("Digite um WhatsApp válido com DDD.");
    return;
  }

  try {
    const resposta = await fetch("/api/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        whatsapp: telefone,
        nome_cliente: nome.trim(),
        total,
      }),
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      alert(resultado.error || "Não foi possível registrar o pedido.");
      return;
    }

    const pedidoId = resultado.pedido?.pedido_id;

    const linhas = items
      .map(
        (i) =>
          `• ${i.quantidade}x ${i.nome} — ${formatPrice(
            i.preco * i.quantidade
          )}`
      )
      .join("\n");

    const mensagem =
      `🍔 *NOVO PEDIDO - POPULAR*\n\n` +
      `🆔 *Pedido:* ${pedidoId}\n` +
      `👤 *Cliente:* ${nome}\n` +
      `📱 *WhatsApp:* ${telefone}\n` +
      `${
        tipo === "entrega"
          ? `🛵 *Entrega:* ${endereco}`
          : "🏪 *Retirada no local*"
      }\n` +
      `💳 *Pagamento:* ${pagamento}\n\n` +
      `🧾 *PEDIDO*\n${linhas}\n\n` +
      `💰 *TOTAL: ${formatPrice(total)}*` +
      `${
        obs.trim()
          ? `\n\n📝 *Observações:* ${obs}`
          : ""
      }\n\n` +
      `Pedido realizado pelo app da Popular.`;

    window.open(
      `https://wa.me/5538991429166?text=${encodeURIComponent(mensagem)}`,
      "_blank"
    );
  } catch (error) {
    console.error(error);
    alert("Não foi possível registrar o pedido. Tente novamente.");
  }
}
 if(items.length===0)return <main className="min-h-screen bg-zinc-950 text-white p-6 pb-24"><h1 className="text-3xl font-black text-yellow-400">🛒 Carrinho</h1><div className="text-center py-24"><div className="text-6xl">🛒</div><h2 className="text-xl font-bold mt-5">Seu carrinho está vazio</h2><p className="text-zinc-400 mt-2">Escolha seus produtos no cardápio.</p><Link href="/cardapio" className="inline-block mt-6 bg-yellow-400 text-black px-6 py-3 rounded-2xl font-black">Ver cardápio</Link></div></main>;
 return <main className="min-h-screen bg-zinc-950 text-white p-4 pb-28 max-w-3xl mx-auto"><div className="flex justify-between items-center"><h1 className="text-3xl font-black text-yellow-400">🛒 Carrinho</h1><button onClick={limpar} className="text-red-400 text-sm font-bold">Limpar</button></div><div className="mt-6 space-y-3">{items.map(item=><div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"><div className="flex justify-between"><div><h2 className="font-bold text-lg">{item.nome}</h2><p className="text-yellow-400 font-bold">{formatPrice(item.preco)} cada</p></div><button onClick={()=>remover(item.id)} className="text-zinc-500 text-xl">×</button></div><div className="flex justify-between items-center mt-4"><div className="flex items-center bg-zinc-800 rounded-xl"><button onClick={()=>diminuir(item.id)} className="w-11 h-11 text-xl font-black">−</button><span className="w-10 text-center font-black">{item.quantidade}</span><button onClick={()=>adicionar({id:item.id,nome:item.nome,preco:item.preco})} className="w-11 h-11 text-xl font-black text-yellow-400">+</button></div><strong>{formatPrice(item.preco*item.quantidade)}</strong></div></div>)}</div>
 <section className="mt-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4"><h2 className="text-xl font-black">Dados do pedido</h2><input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Seu nome" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 outline-none focus:border-yellow-400"/><div className="grid grid-cols-2 gap-2"><button onClick={()=>setTipo("entrega")} className={`p-3 rounded-xl font-bold ${tipo==="entrega"?"bg-yellow-400 text-black":"bg-zinc-800"}`}>🛵 Entrega</button><button onClick={()=>setTipo("retirada")} className={`p-3 rounded-xl font-bold ${tipo==="retirada"?"bg-yellow-400 text-black":"bg-zinc-800"}`}>🏪 Retirada</button></div>{tipo==="entrega"&&<input value={endereco} onChange={e=>setEndereco(e.target.value)} placeholder="Rua, número, bairro e referência" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 outline-none focus:border-yellow-400"/>}<select value={pagamento} onChange={e=>setPagamento(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3"><option>Pix</option><option>Dinheiro</option><option>Cartão</option></select><textarea value={obs} onChange={e=>setObs(e.target.value)} placeholder="Observações (opcional): sem cebola, ponto da carne..." className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 min-h-20"/><div className="border-t border-zinc-700 pt-4 flex justify-between text-xl font-black"><span>Total</span><span className="text-yellow-400">{formatPrice(total)}</span></div><button onClick={finalizar} className="w-full bg-green-500 text-black py-4 rounded-2xl font-black text-lg">Finalizar pelo WhatsApp</button><p className="text-center text-xs text-zinc-500">Você poderá conferir a mensagem antes de enviar.</p></section><Link href="/cardapio" className="block text-center mt-5 text-yellow-400 font-bold">+ Adicionar mais itens</Link></main>;
}
