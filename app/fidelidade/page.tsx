"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const META = 12;
const MINIMO = 12;

function incentivo(s: number) {
  if (s >= META) return { emoji: "🎉", titulo: "Parabéns! Você completou o cartão!", texto: "Seu X-Salada grátis está liberado. Resgate seu prêmio e depois comece um novo cartão.", acao: "Resgatar meu X-Salada" };
  const faltam = META - s;
  if (faltam === 1) return { emoji: "🤩", titulo: "Só falta 1 selo!", texto: "Você está a uma compra elegível de liberar seu X-Salada grátis.", acao: "Quero completar meu cartão" };
  if (faltam === 2) return { emoji: "🚀", titulo: "Faltam apenas 2 selos!", texto: "Seu X-Salada está muito perto. Continue avançando no Clube Popular.", acao: "Continuar juntando" };
  if (faltam === 3) return { emoji: "👀", titulo: "Agora ficou perto!", texto: "Só mais 3 selos para desbloquear seu X-Salada grátis.", acao: "Chegar mais perto" };
  if (s >= Math.ceil(META / 2)) return { emoji: "🔥", titulo: `Faltam só ${faltam} selos`, texto: "Você já passou da metade do cartão. Continue juntando para liberar seu prêmio.", acao: "Continuar meu cartão" };
  if (s >= 3) return { emoji: "⭐", titulo: "Você está avançando!", texto: `Mais ${faltam} selos e o X-Salada grátis é seu.`, acao: "Ganhar mais um selo" };
  return { emoji: "🍔", titulo: "Seu X-Salada já está no caminho", texto: `Junte mais ${faltam} selos para desbloquear seu prêmio.`, acao: "Começar a avançar" };
}

export default function Fidelidade() {
  const [telefone, setTelefone] = useState("");
  const [selos, setSelos] = useState(0);
  const [carregado, setCarregado] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [status, setStatus] = useState("");

  async function consultar(t: string) {
    const tel = t.replace(/\D/g, "");
    if (tel.length < 10) return;
    try {
      const r = await fetch(`/api/fidelidade?telefone=${encodeURIComponent(tel)}`, { cache: "no-store" });
      const j = await r.json();
      if (r.ok && j.cliente) {
        setSelos(Number(j.cliente.pontos || 0));
        setStatus("Cartão sincronizado com a Popular.");
      } else if (r.ok) {
        setSelos(0);
        setStatus("WhatsApp ainda não cadastrado no Clube Popular.");
      }
    } catch {
      setStatus("Não foi possível sincronizar agora.");
    }
  }

  useEffect(() => {
    const t = localStorage.getItem("popular-fidelidade-telefone") || "";
    setTelefone(t);
    setCarregado(true);
    if (t) void consultar(t);
  }, []);

  async function salvar() {
    const tel = telefone.replace(/\D/g, "");
    if (tel.length < 10) {
      alert("Digite um WhatsApp válido com DDD.");
      return;
    }
    setSalvando(true);
    try {
      const r = await fetch("/api/fidelidade", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ telefone: tel }) });
      const j = await r.json();
      if (!r.ok) throw new Error();
      localStorage.setItem("popular-fidelidade-telefone", tel);
      setTelefone(tel);
      setSelos(Number(j.cliente?.pontos || 0));
      setStatus("Cartão sincronizado!");
    } catch {
      setStatus("Não foi possível salvar agora.");
    } finally {
      setSalvando(false);
    }
  }

  function resgatar() {
    if (!telefone) {
      alert("Cadastre seu WhatsApp primeiro.");
      return;
    }
    const msg = `🎁 *RESGATE CLUBE POPULAR*\n\nCompletei ${META} selos e quero resgatar meu X-Salada grátis.\n📱 ${telefone}`;
    window.open(`https://wa.me/5538991429166?text=${encodeURIComponent(msg)}`, "_blank");
  }

  if (!carregado) return <main className="min-h-screen bg-zinc-950" />;

  const faltam = Math.max(META - selos, 0);
  const progresso = Math.min((selos / META) * 100, 100);
  const completo = selos >= META;
  const m = incentivo(selos);
  const perto = faltam <= 4 && !completo;

  return <main className="min-h-screen bg-zinc-950 text-white p-4 pb-28 max-w-2xl mx-auto">
    <header className="pt-3">
      <p className="text-yellow-400 font-bold text-sm">POPULAR HAMBURGUERIA E SORVETERIA</p>
      <h1 className="text-3xl font-black mt-1">⭐ Clube Popular</h1>
      <p className="text-zinc-400 mt-2">Pedidos a partir de <b className="text-white">R$ 12,00</b> ganham 1 selo.</p>
    </header>

    <section className={`mt-6 rounded-3xl p-6 shadow-2xl ${completo ? "bg-gradient-to-br from-green-400 to-emerald-600 text-black" : perto ? "bg-gradient-to-br from-yellow-300 to-orange-400 text-black" : "bg-zinc-900 border border-zinc-800"}`}>
      <div className="flex gap-4">
        <div className="text-5xl">{m.emoji}</div>
        <div><p className="text-xs font-black uppercase opacity-60">Seu progresso</p><h2 className="text-2xl font-black">{m.titulo}</h2><p className="text-sm mt-2 opacity-75">{m.texto}</p></div>
      </div>
      {completo ? <button onClick={resgatar} className="w-full mt-5 bg-black text-white py-4 rounded-2xl font-black">🎁 {m.acao}</button> : <Link href="/cardapio" className={`block text-center mt-5 py-4 rounded-2xl font-black ${perto ? "bg-black text-white" : "bg-yellow-400 text-black"}`}>{m.acao} →</Link>}
    </section>

    <section className={`mt-4 ${completo ? "bg-zinc-900" : "bg-yellow-400 text-black"} rounded-3xl p-5`}>
      <div className="flex justify-between items-start"><div><p className="font-bold opacity-60 text-sm">SEU CARTÃO</p><h2 className="text-3xl font-black">{Math.min(selos, META)}/{META}</h2></div>{!completo && <div className="text-right"><p className="text-xs font-bold opacity-60">FALTAM</p><b className="text-xl">{faltam}</b></div>}</div>
      <div className="grid grid-cols-6 gap-2 mt-4 justify-items-center">{Array.from({ length: META }).map((_, i) => <div key={i} className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border ${i < selos ? (completo ? "bg-yellow-400 text-black" : "bg-black text-yellow-400 border-black") : "bg-white/20 border-current/20"}`}>{i < selos ? "★" : i + 1}</div>)}</div>
      <div className="h-2 bg-black/20 rounded-full mt-4 overflow-hidden"><div className={`h-full rounded-full ${completo ? "bg-green-400" : "bg-black"}`} style={{ width: `${progresso}%` }} /></div>
    </section>

    {!completo && <section className="mt-4 bg-zinc-900 border border-zinc-800 rounded-3xl p-5"><div className="flex gap-4 items-center"><div className="text-5xl">🍔</div><div><p className="text-yellow-400 text-xs font-black">REGRA SIMPLES</p><h2 className="text-xl font-black">R$ 12 ou mais = 1 selo</h2><p className="text-zinc-400 text-sm mt-1">Vale pelo valor total do pedido. Não precisa comprar especificamente um X-Salada.</p></div></div><div className="mt-4 bg-zinc-800 rounded-xl p-3 text-sm text-zinc-300">⭐ {META} selos = <b className="text-white">1 X-Salada grátis</b></div></section>}

    <section className="mt-5 bg-zinc-900 border border-zinc-800 rounded-3xl p-5"><h2 className="text-xl font-black">📱 Seu cartão</h2><p className="text-zinc-400 text-sm mt-1">Use o mesmo WhatsApp dos pedidos.</p><input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(38) 99999-9999" inputMode="tel" className="w-full mt-4 bg-zinc-800 border border-zinc-700 rounded-xl p-3" /><button disabled={salvando} onClick={salvar} className="w-full mt-3 bg-yellow-400 text-black py-3 rounded-xl font-black">{salvando ? "Sincronizando..." : "Salvar e sincronizar"}</button>{status && <p className="text-sm text-zinc-300 mt-3">{status}</p>}</section>

    <details className="mt-5 bg-zinc-900 border border-zinc-800 rounded-3xl p-5"><summary className="font-black cursor-pointer">ℹ️ Regras do Clube Popular</summary><div className="text-sm text-zinc-400 mt-3 space-y-2"><p>• Pedido confirmado de R$ {MINIMO.toFixed(2).replace(".", ",")} ou mais: 1 selo.</p><p>• Pedidos abaixo desse valor continuam normalmente, mas não geram selo.</p><p>• Cada pedido elegível gera no máximo 1 selo.</p><p>• {META} selos liberam 1 X-Salada grátis.</p><p>• O saldo é vinculado ao WhatsApp cadastrado.</p></div></details>
  </main>;
}
