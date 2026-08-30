"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserRound, ShoppingBag, Heart, MapPin, Ruler, Ticket, Bell, CreditCard, HelpCircle, ShieldCheck, ChevronRight, LogOut, PackageCheck } from "lucide-react";

const KEY = "popular_perfil_cliente";
const PED = "popular_dados_cliente";

type Perfil = { nome: string; telefone: string; endereco: string };

export default function PerfilPage() {
  const [perfil, setPerfil] = useState<Perfil>({ nome: "Cliente", telefone: "", endereco: "" });

  useEffect(() => {
    try {
      const x = JSON.parse(localStorage.getItem(KEY) || localStorage.getItem(PED) || "null");
      if (x) setPerfil({ nome: String(x.nome || "Cliente"), telefone: String(x.telefone || ""), endereco: String(x.endereco || "") });
    } catch {}
  }, []);

  const primeiroNome = perfil.nome.split(" ")[0] || "Cliente";

  return (
    <main className="min-h-screen bg-[#f7f5f2] text-zinc-950 px-4 pt-6 pb-32">
      <div className="max-w-xl mx-auto space-y-5">
        <header>
          <p className="text-[11px] uppercase tracking-[.22em] font-black text-zinc-500">Minha conta</p>
          <h1 className="text-3xl font-black mt-1">Olá, {primeiroNome} 👋</h1>
          <p className="text-sm text-zinc-500 mt-1">Gerencie suas compras e preferências em um só lugar.</p>
        </header>

        <section className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-zinc-950 text-white grid place-items-center"><UserRound size={32}/></div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-black truncate">{perfil.nome}</h2>
              <p className="text-sm text-zinc-500 truncate">{perfil.telefone || "Adicione seu telefone"}</p>
              <p className="text-xs text-zinc-400 mt-1 truncate">{perfil.endereco || "Complete seus dados de entrega"}</p>
            </div>
            <button className="text-sm font-black border border-zinc-200 rounded-full px-4 py-2">Editar</button>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-3">
          <Atalho href="/historico" icon={<ShoppingBag size={23}/>} titulo="Pedidos" texto="Acompanhar" />
          <Atalho href="/favoritos" icon={<Heart size={23}/>} titulo="Favoritos" texto="Peças salvas" />
          <Atalho href="/cardapio" icon={<PackageCheck size={23}/>} titulo="Comprar" texto="Ver catálogo" />
        </section>

        <section>
          <Titulo texto="Compras" />
          <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden">
            <Item href="/historico" icon={<ShoppingBag/>} titulo="Meus pedidos" texto="Status, histórico e repetir compra" />
            <Item href="/favoritos" icon={<Heart/>} titulo="Meus favoritos" texto="Peças que você salvou" />
            <Item href="/cupons" icon={<Ticket/>} titulo="Cupons e descontos" texto="Confira benefícios disponíveis" />
            <Item href="/trocas" icon={<PackageCheck/>} titulo="Trocas e devoluções" texto="Solicitações e acompanhamento" ultimo />
          </div>
        </section>

        <section>
          <Titulo texto="Minha conta" />
          <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden">
            <Item href="/enderecos" icon={<MapPin/>} titulo="Endereços" texto="Entrega e retirada" />
            <Item href="/guia-tamanhos" icon={<Ruler/>} titulo="Meus tamanhos" texto="Guia para escolher melhor" />
            <Item href="/pagamentos" icon={<CreditCard/>} titulo="Pagamentos" texto="Preferências de pagamento" />
            <Item href="/notificacoes" icon={<Bell/>} titulo="Notificações" texto="Pedidos, ofertas e reposições" ultimo />
          </div>
        </section>

        <section>
          <Titulo texto="Ajuda e segurança" />
          <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden">
            <Item href="/ajuda" icon={<HelpCircle/>} titulo="Central de ajuda" texto="Dúvidas sobre compras e entregas" />
            <Item href="/privacidade" icon={<ShieldCheck/>} titulo="Privacidade e segurança" texto="Seus dados e sua conta" ultimo />
          </div>
        </section>

        <button className="w-full bg-white border border-zinc-200 text-red-600 rounded-2xl py-4 font-black flex items-center justify-center gap-2"><LogOut size={19}/> Sair da conta</button>
        <p className="text-center text-[11px] text-zinc-400">Loja de roupas • experiência de compra personalizada</p>
      </div>
    </main>
  );
}

function Titulo({texto}:{texto:string}) { return <h2 className="font-black text-lg mb-2 px-1">{texto}</h2>; }

function Atalho({href,icon,titulo,texto}:{href:string;icon:React.ReactNode;titulo:string;texto:string}) {
  return <Link href={href} className="bg-white border border-zinc-200 rounded-2xl p-4 text-center min-w-0"><div className="mx-auto w-10 h-10 rounded-full bg-zinc-100 grid place-items-center">{icon}</div><b className="block text-sm mt-2 truncate">{titulo}</b><p className="text-[10px] text-zinc-500 mt-1 truncate">{texto}</p></Link>;
}

function Item({href,icon,titulo,texto,ultimo=false}:{href:string;icon:React.ReactNode;titulo:string;texto:string;ultimo?:boolean}) {
  return <Link href={href} className={`flex items-center gap-3 p-4 active:bg-zinc-50 ${ultimo ? "" : "border-b border-zinc-100"}`}><div className="w-11 h-11 rounded-2xl bg-zinc-100 grid place-items-center shrink-0">{icon}</div><div className="flex-1 min-w-0"><b className="block text-sm">{titulo}</b><p className="text-xs text-zinc-500 mt-0.5 truncate">{texto}</p></div><ChevronRight size={18} className="text-zinc-400 shrink-0"/></Link>;
}
