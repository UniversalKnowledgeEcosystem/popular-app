"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, type CartItem } from "../context/CartContext";

type PedidoHistorico = {
  numero: string;
  data: string;
  status: string;
  selos: number;
  itens: CartItem[];
};

const pedidos: PedidoHistorico[] = [
  { numero: "#1021", data: "08/07/2026", status: "Entregue", selos: 1, itens: [
    { id: 101, nome: "X-Salada", preco: 0, quantidade: 1 },
    { id: 102, nome: "Batata", preco: 0, quantidade: 1 },
    { id: 103, nome: "Refrigerante", preco: 0, quantidade: 1 },
  ]},
  { numero: "#1018", data: "04/07/2026", status: "Entregue", selos: 1, itens: [
    { id: 104, nome: "X-Burger", preco: 0, quantidade: 2 },
    { id: 103, nome: "Refrigerante", preco: 0, quantidade: 1 },
  ]},
  { numero: "#1012", data: "28/06/2026", status: "Entregue", selos: 1, itens: [
    { id: 101, nome: "X-Salada", preco: 0, quantidade: 1 },
    { id: 103, nome: "Refrigerante", preco: 0, quantidade: 1 },
  ]},
];

export default function Historico() {
  const router = useRouter();
  const { limpar, adicionar } = useCart();

  function repetirPedido(pedido: PedidoHistorico) {
    limpar();
    pedido.itens.forEach((item) => {
      for (let i = 0; i < item.quantidade; i += 1) {
        adicionar({ id: item.id, nome: item.nome, preco: item.preco });
      }
    });
    try {
      localStorage.setItem("popular_pedido_repetido", JSON.stringify({
        numeroOriginal: pedido.numero,
        itens: pedido.itens,
        criadoEm: new Date().toISOString(),
      }));
    } catch {}
    router.push("/carrinho?repetido=1");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 pb-28">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-yellow-400">📜 Histórico</h1>
        <p className="text-zinc-400 mt-2">Veja o que você pediu, os selos conquistados e repita seu pedido com facilidade.</p>

        <div className="mt-8 space-y-4">
          {pedidos.map((pedido) => (
            <article key={pedido.numero} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
              <div className="flex justify-between items-center gap-3">
                <div><h2 className="font-black text-lg">Pedido {pedido.numero}</h2><p className="text-zinc-500 text-sm mt-1">{pedido.data}</p></div>
                <span className="text-green-400 text-sm font-black">✓ {pedido.status}</span>
              </div>

              <div className="mt-4 bg-zinc-950 rounded-2xl p-4">
                <p className="text-xs font-black text-zinc-500 uppercase">O que você pediu</p>
                <div className="mt-2 space-y-1">{pedido.itens.map((item)=><p key={item.id} className="font-bold">{item.quantidade}x {item.nome}</p>)}</div>
              </div>

              <div className="mt-3 flex items-center justify-between bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-4">
                <div><p className="text-xs text-yellow-400 font-black">CLUBE POPULAR</p><p className="font-bold">Selo conquistado neste pedido</p></div>
                <div className="w-12 h-12 rounded-full bg-yellow-400 text-black flex items-center justify-center text-2xl" aria-label={`${pedido.selos} selo conquistado`}>🍔</div>
              </div>

              <button onClick={()=>repetirPedido(pedido)} className="w-full mt-4 bg-yellow-400 text-black py-3 rounded-xl font-black">
                🔁 Repetir pedido
              </button>
              <p className="text-center text-xs text-zinc-500 mt-2">Vamos montar o mesmo pedido para você conferir antes de finalizar.</p>
            </article>
          ))}
        </div>

        <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
          <p className="font-black">🎁 Continue juntando selos</p>
          <p className="text-zinc-400 text-sm mt-1">Cada pedido elegível deixa você mais perto do próximo prêmio.</p>
          <Link href="/fidelidade" className="inline-block text-yellow-400 font-black mt-3">Ver meus clubes →</Link>
        </div>
      </div>
    </main>
  );
}