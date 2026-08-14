"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, Gift, MapPin, Pencil, Phone, ReceiptText, Save, ShoppingBag, Star, UserRound, X } from "lucide-react";

type PerfilSalvo = { nome: string; telefone: string; endereco: string };
const PERFIL_KEY = "popular_perfil_cliente";
const DADOS_PEDIDO_KEY = "popular_dados_cliente";

export default function Perfil() {
  const [perfil,setPerfil]=useState<PerfilSalvo>({nome:"Cliente Popular",telefone:"",endereco:""});
  const [rascunho,setRascunho]=useState<PerfilSalvo>({nome:"",telefone:"",endereco:""});
  const [editando,setEditando]=useState(false);
  const [salvo,setSalvo]=useState(false);

  useEffect(()=>{
    try{
      const proprio=localStorage.getItem(PERFIL_KEY);
      const pedido=localStorage.getItem(DADOS_PEDIDO_KEY);
      const origem=proprio?JSON.parse(proprio):pedido?JSON.parse(pedido):null;
      if(origem){
        const dados={nome:String(origem.nome||"Cliente Popular"),telefone:String(origem.telefone||""),endereco:String(origem.endereco||"")};
        setPerfil(dados);setRascunho(dados);
      } else setRascunho({nome:"Cliente Popular",telefone:"",endereco:""});
    }catch{}
  },[]);

  function abrirEdicao(){setRascunho(perfil);setSalvo(false);setEditando(true)}
  function salvar(){
    const dados={nome:rascunho.nome.trim()||"Cliente Popular",telefone:rascunho.telefone.replace(/\D/g,""),endereco:rascunho.endereco.trim()};
    localStorage.setItem(PERFIL_KEY,JSON.stringify(dados));
    try{const atual=JSON.parse(localStorage.getItem(DADOS_PEDIDO_KEY)||"{}");localStorage.setItem(DADOS_PEDIDO_KEY,JSON.stringify({...atual,...dados}))}catch{}
    setPerfil(dados);setRascunho(dados);setEditando(false);setSalvo(true);setTimeout(()=>setSalvo(false),2500);
  }

  const primeiroNome=perfil.nome.split(" ")[0]||"Cliente";

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-4 pt-8 pb-28">
      <div className="max-w-xl mx-auto space-y-4">
        <header className="flex items-center justify-between px-1">
          <div><p className="text-yellow-400 text-xs font-black uppercase tracking-wider">Minha conta</p><h1 className="text-3xl font-black">Olá, {primeiroNome} 👋</h1></div>
          <button onClick={abrirEdicao} aria-label="Editar perfil" className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center"><Pencil size={19}/></button>
        </header>

        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-black flex items-center justify-center shrink-0"><UserRound size={34}/></div>
            <div className="min-w-0"><h2 className="text-xl font-black truncate">{perfil.nome}</h2><div className="flex items-center gap-1 text-yellow-400 text-sm font-bold mt-1"><Star size={15} fill="currentColor"/> Cliente Popular</div>{perfil.telefone&&<p className="text-zinc-400 text-sm mt-1">{perfil.telefone}</p>}</div>
          </div>
          {salvo&&<div className="mt-4 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-bold rounded-xl p-3">✓ Perfil atualizado com sucesso.</div>}
        </section>

        <section className="grid grid-cols-2 gap-3">
          <Link href="/biblioteca/pedidos" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 active:scale-[.98] transition"><div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center"><ReceiptText size={21}/></div><b className="block mt-3">Meus pedidos</b><span className="text-xs text-zinc-400">Acompanhe seu histórico</span></Link>
          <Link href="/biblioteca/cashback" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 active:scale-[.98] transition"><div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center"><Gift size={21}/></div><b className="block mt-3">Benefícios</b><span className="text-xs text-zinc-400">Selos, pontos e vantagens</span></Link>
        </section>

        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
          <div className="px-5 pt-5 pb-2"><p className="text-xs text-yellow-400 font-black uppercase">Seus dados</p><h3 className="text-lg font-black">Informações para pedidos</h3></div>
          <button onClick={abrirEdicao} className="w-full px-5 py-4 flex items-center gap-3 text-left border-t border-zinc-800"><Phone size={19} className="text-zinc-400"/><div className="flex-1 min-w-0"><p className="text-sm font-bold">WhatsApp</p><p className="text-xs text-zinc-400 truncate">{perfil.telefone||"Adicionar telefone"}</p></div><ChevronRight size={18} className="text-zinc-500"/></button>
          <button onClick={abrirEdicao} className="w-full px-5 py-4 flex items-center gap-3 text-left border-t border-zinc-800"><MapPin size={19} className="text-zinc-400"/><div className="flex-1 min-w-0"><p className="text-sm font-bold">Endereço padrão</p><p className="text-xs text-zinc-400 truncate">{perfil.endereco||"Adicionar endereço para entrega"}</p></div><ChevronRight size={18} className="text-zinc-500"/></button>
        </section>

        <Link href="/cardapio" className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-[.98] transition"><ShoppingBag size={20}/> Fazer novo pedido</Link>
        <p className="text-center text-xs text-zinc-600">Seus dados ficam salvos neste aparelho para agilizar seus próximos pedidos.</p>
      </div>

      {editando&&<div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4"><div className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl"><div className="flex justify-between items-center"><div><p className="text-yellow-400 text-xs font-black uppercase">Perfil</p><h2 className="text-2xl font-black">Editar meus dados</h2></div><button onClick={()=>setEditando(false)} className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center"><X size={20}/></button></div><div className="space-y-3 mt-6"><label className="block"><span className="text-xs text-zinc-400">Nome</span><input value={rascunho.nome} onChange={e=>setRascunho({...rascunho,nome:e.target.value})} autoComplete="name" className="mt-1 w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none rounded-xl p-4" placeholder="Seu nome"/></label><label className="block"><span className="text-xs text-zinc-400">WhatsApp</span><input value={rascunho.telefone} onChange={e=>setRascunho({...rascunho,telefone:e.target.value})} inputMode="tel" autoComplete="tel" className="mt-1 w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none rounded-xl p-4" placeholder="WhatsApp com DDD"/></label><label className="block"><span className="text-xs text-zinc-400">Endereço padrão</span><input value={rascunho.endereco} onChange={e=>setRascunho({...rascunho,endereco:e.target.value})} autoComplete="street-address" className="mt-1 w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none rounded-xl p-4" placeholder="Rua, número, bairro e referência"/></label></div><button onClick={salvar} className="mt-6 w-full bg-yellow-400 text-black py-4 rounded-2xl font-black flex items-center justify-center gap-2"><Save size={19}/> Salvar alterações</button></div></div>}
    </main>
  );
}
