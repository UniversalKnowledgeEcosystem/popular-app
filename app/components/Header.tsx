"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Check, MapPin, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const LIDOS_KEY = "popular_avisos_lidos";

type Aviso = {
  id: string;
  titulo: string;
  texto: string;
  icone: string;
  link?: string;
  botao?: string;
};

function obterSaudacao() {
  const hora = Number(new Intl.DateTimeFormat("pt-BR", {timeZone:"America/Sao_Paulo",hour:"2-digit",hour12:false}).format(new Date()));
  if (hora >= 5 && hora < 12) return "Bom dia ☀️";
  if (hora >= 12 && hora < 18) return "Boa tarde 👋";
  return "Boa noite 🌙";
}

function avisosAtuais(): Aviso[] {
  return [
    {id:"clube-popular",titulo:"Clube Popular",texto:"Acompanhe seus selos e veja quanto falta para completar seu cartão fidelidade.",icone:"⭐",link:"/fidelidade",botao:"Ver meus selos"},
    {id:"pedido-app",titulo:"Peça pelo app",texto:"Escolha seus produtos no cardápio, monte o carrinho e finalize o pedido pelo WhatsApp.",icone:"🍔",link:"/cardapio",botao:"Ver cardápio"},
    {id:"atendimento",titulo:"Atendimento rápido",texto:"Ao finalizar, seu pedido é enviado pronto para o WhatsApp da Popular para você conferir e enviar.",icone:"💬"}
  ];
}

export default function Header() {
  const [saudacao,setSaudacao]=useState("");
  const [aberto,setAberto]=useState(false);
  const [lidos,setLidos]=useState<string[]>([]);
  const avisos=useMemo(()=>avisosAtuais(),[]);
  const naoLidos=avisos.filter(a=>!lidos.includes(a.id)).length;

  useEffect(()=>{const atualizar=()=>setSaudacao(obterSaudacao());atualizar();const intervalo=window.setInterval(atualizar,60_000);try{const salvo=JSON.parse(localStorage.getItem(LIDOS_KEY)||"[]");if(Array.isArray(salvo))setLidos(salvo)}catch{}return()=>window.clearInterval(intervalo)},[]);

  function salvarLidos(ids:string[]){setLidos(ids);localStorage.setItem(LIDOS_KEY,JSON.stringify(ids))}
  function marcarTodos(){salvarLidos(avisos.map(a=>a.id))}
  function abrirCentral(){setAberto(true)}
  function marcarUm(id:string){if(!lidos.includes(id))salvarLidos([...lidos,id])}

  return <>
    <header className="px-6 pt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Popular" width={68} height={68} className="rounded-2xl shadow-xl" priority />
          <div><p className="text-sm text-zinc-400 min-h-5">{saudacao}</p><h1 className="text-2xl font-black">Popular</h1><div className="flex items-center gap-1 text-yellow-400 text-sm font-bold"><MapPin size={15}/>Rio Pardo de Minas</div></div>
        </div>
        <button onClick={abrirCentral} aria-label="Abrir avisos" className="relative w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center active:scale-95 transition"><Bell size={22} className="text-yellow-400"/>{naoLidos>0&&<span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[11px] font-black flex items-center justify-center border-2 border-zinc-950">{naoLidos}</span>}</button>
      </div>
    </header>

    {aberto&&<div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={()=>setAberto(false)}>
      <section onClick={e=>e.stopPropagation()} className="w-full sm:max-w-md bg-zinc-950 border border-zinc-800 rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between gap-3"><div><p className="text-yellow-400 text-xs font-bold">POPULAR</p><h2 className="text-white text-2xl font-black">🔔 Avisos</h2><p className="text-zinc-400 text-xs mt-1">{naoLidos?`${naoLidos} aviso(s) não lido(s)`:"Você está em dia com os avisos"}</p></div><button onClick={()=>setAberto(false)} className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center"><X size={20}/></button></div>
        <div className="overflow-y-auto max-h-[62vh] p-4 space-y-3">
          {avisos.map(a=>{const lido=lidos.includes(a.id);return <article key={a.id} onClick={()=>marcarUm(a.id)} className={`rounded-2xl border p-4 ${lido?"bg-zinc-900 border-zinc-800":"bg-zinc-900 border-yellow-400/50"}`}><div className="flex gap-3"><div className="w-11 h-11 rounded-xl bg-zinc-800 flex items-center justify-center text-xl shrink-0">{a.icone}</div><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><h3 className="text-white font-black">{a.titulo}</h3>{!lido&&<span className="text-[10px] bg-yellow-400 text-black font-black px-2 py-1 rounded-full h-fit">NOVO</span>}</div><p className="text-sm text-zinc-400 mt-1 leading-relaxed">{a.texto}</p>{a.link&&<Link href={a.link} onClick={()=>{marcarUm(a.id);setAberto(false)}} className="inline-block mt-3 text-yellow-400 font-bold text-sm">{a.botao} →</Link>}</div></div></article>})}
        </div>
        <div className="p-4 border-t border-zinc-800"><button onClick={marcarTodos} disabled={naoLidos===0} className="w-full bg-zinc-900 disabled:opacity-40 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"><Check size={18}/>Marcar todos como lidos</button></div>
      </section>
    </div>}
  </>;
}
