"use client";
import Link from "next/link";
import {useState} from "react";

export default function UsoContinuo(){
  const[itens,setItens]=useState(["Medicamento de uso contínuo","Vitamina diária"]);
  const[novo,setNovo]=useState("");
  function adicionar(){if(!novo.trim())return;setItens([...itens,novo.trim()]);setNovo("")}
  return <main className="min-h-screen bg-[#fffaf2] text-[#331b1b] p-4 pb-28"><div className="max-w-2xl mx-auto">
    <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase text-[#d71920]">Cuidado recorrente</p><h1 className="text-3xl font-black">Uso contínuo</h1><p className="text-sm text-[#806666] mt-1">Organize produtos recorrentes e lembretes de recompra.</p></div><Link href="/" className="text-sm font-black text-[#d71920]">Início</Link></div>
    <section className="mt-5 bg-[#fff3c4] border border-[#f0d35b] rounded-3xl p-5"><div className="flex gap-3"><div className="text-3xl">⏰</div><div><h2 className="font-black text-lg">Não deixe faltar</h2><p className="text-sm text-[#765b35] mt-1">Cadastre seus itens e mantenha sua rotina de cuidado organizada.</p></div></div></section>
    <section className="mt-4 bg-white border border-[#f1dedc] rounded-3xl p-5"><h2 className="font-black text-lg">Adicionar item recorrente</h2><div className="flex gap-2 mt-3"><input value={novo} onChange={e=>setNovo(e.target.value)} placeholder="Ex.: medicamento, vitamina..." className="flex-1 bg-[#fffaf2] border border-[#f1dedc] rounded-xl p-3"/><button onClick={adicionar} className="bg-[#d71920] text-white px-4 rounded-xl font-black">Adicionar</button></div></section>
    <section className="mt-4 space-y-3">{itens.map((item,i)=><article key={`${item}-${i}`} className="bg-white border border-[#f1dedc] rounded-2xl p-4 flex items-center justify-between gap-3"><div><b>{item}</b><p className="text-xs text-[#806666] mt-1">Lembrete demonstrativo • a cada 30 dias</p></div><button onClick={()=>setItens(itens.filter((_,x)=>x!==i))} className="text-[#b20e14] font-black">Remover</button></article>)}</section>
    <div className="mt-5 grid grid-cols-2 gap-2"><Link href="/catalogo" className="text-center bg-[#d71920] text-white py-4 rounded-2xl font-black">Abrir catálogo</Link><Link href="/historico" className="text-center bg-[#ffc928] text-[#451000] py-4 rounded-2xl font-black">Ver pedidos</Link></div>
  </div></main>
}
