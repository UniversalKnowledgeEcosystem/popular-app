import Link from "next/link";
import {produtosFarmacia} from "../data/farmacia";

const atalhos=[
  ["💊","Catálogo","/catalogo","Medicamentos, vitaminas e cuidados"],
  ["📄","Enviar receita","/receitas","Foto, PDF ou receita digital"],
  ["💉","Vacinas e testes","/servicos","Agende serviços de saúde"],
  ["⏰","Uso contínuo","/uso-continuo","Lembretes e recompra facilitada"],
];

const categorias=[
  ["🤒","Dor e febre"],["🤧","Gripes e resfriados"],["🌿","Vitaminas"],["🧴","Higiene"],
  ["✨","Dermocosméticos"],["👶","Mamãe e bebê"],["🩹","Primeiros socorros"],["❤️","Saúde diária"]
];

const destaques=produtosFarmacia.filter(p=>!p.receita).slice(0,6);
const brl=(v:number)=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

export default function Home(){return <main className="min-h-screen bg-[#fffaf2] text-[#331b1b] pb-28">
  <header className="bg-white border-b border-[#f1dedc]">
    <div className="max-w-6xl mx-auto px-4 pt-4 pb-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-[#d71920] text-white flex items-center justify-center shadow-sm"><span className="pharma-cross" aria-hidden="true"/></div>
          <div className="min-w-0"><p className="text-[10px] uppercase tracking-[.2em] font-black text-[#d71920]">Farmácia & Saúde</p><h1 className="text-2xl font-black leading-tight">Farma Vida</h1><p className="text-xs text-[#806666] truncate">Cuidado e bem-estar perto de você</p></div>
        </div>
        <Link href="/carrinho" className="relative w-12 h-12 rounded-2xl bg-[#fff3c4] text-[#b20e14] flex items-center justify-center text-xl border border-[#f2d766]" aria-label="Abrir sacola">🛍️</Link>
      </div>
      <Link href="/catalogo" className="mt-4 bg-[#fff9e9] border border-[#f0dfb2] rounded-2xl px-4 py-3.5 text-[#806666] flex items-center gap-3"><span className="text-lg">🔎</span><div><p className="text-sm font-bold text-[#331b1b]">Buscar no catálogo</p><p className="text-xs">Medicamentos, vitaminas, higiene, beleza...</p></div></Link>
    </div>
  </header>

  <section className="max-w-6xl mx-auto px-4 mt-4">
    <div className="rounded-3xl bg-[#d71920] text-white p-5 shadow-lg shadow-red-900/10 overflow-hidden relative">
      <div className="relative z-10 max-w-[78%]"><span className="inline-block text-[10px] font-black uppercase tracking-[.18em] bg-[#ffc928] text-[#451000] px-2.5 py-1 rounded-full">Receita digital</span><h2 className="text-2xl font-black mt-3 leading-tight">Envie sua receita pelo app</h2><p className="text-sm text-white/90 mt-2">Anexe a prescrição para conferência farmacêutica antes da dispensação.</p><Link href="/receitas" className="inline-flex mt-4 bg-[#ffc928] text-[#451000] rounded-xl px-4 py-3 font-black text-sm">Enviar receita →</Link></div>
      <div className="absolute -right-6 -bottom-7 w-32 h-32 rounded-full bg-white/10"/><div className="absolute right-8 top-6 text-6xl">📋</div>
    </div>
  </section>

  <section className="max-w-6xl mx-auto px-4 mt-5">
    <div className="grid grid-cols-2 gap-3">{atalhos.map(([icon,nome,href,desc])=><Link key={nome} href={href} className="pharma-card p-4 min-h-[132px] flex flex-col"><div className="w-11 h-11 rounded-2xl bg-[#fff3c4] text-2xl flex items-center justify-center">{icon}</div><h3 className="font-black mt-3 text-[15px] leading-tight">{nome}</h3><p className="text-[11px] leading-snug text-[#806666] mt-1">{desc}</p></Link>)}</div>
  </section>

  <section className="max-w-6xl mx-auto px-4 mt-7">
    <div className="flex items-center justify-between"><div><p className="text-[10px] font-black text-[#d71920] uppercase tracking-[.16em]">Por necessidade</p><h2 className="text-xl font-black mt-0.5">Cuidados para o dia a dia</h2></div><Link href="/catalogo" className="text-sm font-black text-[#d71920]">Ver catálogo</Link></div>
    <div className="grid grid-cols-4 gap-3 mt-4">{categorias.map(([icon,nome])=><Link key={nome} href="/catalogo" className="text-center"><div className="aspect-square rounded-2xl bg-white border border-[#f1dedc] flex items-center justify-center text-2xl shadow-sm">{icon}</div><p className="text-[10px] font-bold leading-tight mt-2 text-[#654b4b]">{nome}</p></Link>)}</div>
  </section>

  <section className="max-w-6xl mx-auto px-4 mt-7">
    <Link href="/uso-continuo" className="block rounded-3xl bg-[#fff3c4] border border-[#f0d35b] p-5"><div className="flex items-start gap-4"><div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm">⏰</div><div className="flex-1"><p className="text-[10px] font-black uppercase tracking-[.15em] text-[#a65b00]">Uso contínuo</p><h2 className="font-black text-lg mt-1">Mantenha seu tratamento em dia</h2><p className="text-sm text-[#765b35] mt-1">Cadastre seus itens recorrentes, receba lembretes e facilite a recompra.</p><span className="inline-block mt-3 text-[#b20e14] font-black text-sm">Configurar lembretes →</span></div></div></Link>
  </section>

  <section className="max-w-6xl mx-auto px-4 mt-7">
    <div className="flex items-end justify-between gap-3"><div><p className="text-[10px] font-black text-[#d71920] uppercase tracking-[.16em]">Ofertas da farmácia</p><h2 className="text-xl font-black mt-0.5">Economize em saúde e cuidado</h2></div><Link href="/catalogo" className="text-sm font-black text-[#d71920]">Ver mais</Link></div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">{destaques.map(p=><article key={p.id} className="pharma-card p-3"><div className="aspect-square rounded-2xl bg-gradient-to-br from-[#fff9e9] to-[#fff1f1] flex items-center justify-center text-6xl">{p.emoji}</div><div className="mt-3"><span className="inline-flex text-[9px] font-black px-2 py-1 rounded-full bg-[#ffe1e1] text-[#b20e14]">{p.tag}</span><h3 className="font-bold text-sm mt-2 min-h-[40px] leading-tight">{p.nome}</h3><p className="text-xs text-[#a88d8d] line-through mt-1">{brl(p.normal)}</p><p className="text-xl font-black text-[#d71920] leading-tight">{brl(p.preco)}</p><p className="text-[10px] font-black text-[#9b6500] mt-1">Oferta cadastrada: {brl(p.clube)}</p><Link href="/catalogo" className="block text-center bg-[#d71920] text-white rounded-xl py-2.5 mt-3 font-black text-sm">Ver produto</Link></div></article>)}</div>
  </section>

  <section className="max-w-6xl mx-auto px-4 mt-7 grid md:grid-cols-3 gap-3">
    <Link href="/servicos" className="pharma-card p-5"><div className="w-11 h-11 rounded-2xl bg-[#fff3c4] flex items-center justify-center text-2xl">💉</div><h3 className="font-black mt-3">Vacinas e testes</h3><p className="text-sm text-[#806666] mt-1">Agende serviços disponíveis na unidade.</p></Link>
    <Link href="/servicos" className="pharma-card p-5"><div className="w-11 h-11 rounded-2xl bg-[#ffe7e7] flex items-center justify-center text-2xl">🧑‍⚕️</div><h3 className="font-black mt-3">Fale com o farmacêutico</h3><p className="text-sm text-[#806666] mt-1">Orientação e atendimento farmacêutico.</p></Link>
    <Link href="/historico" className="pharma-card p-5"><div className="w-11 h-11 rounded-2xl bg-[#fff3c4] flex items-center justify-center text-2xl">📦</div><h3 className="font-black mt-3">Meus pedidos</h3><p className="text-sm text-[#806666] mt-1">Acompanhe compras e consulte seu histórico.</p></Link>
  </section>

  <footer className="max-w-6xl mx-auto px-4 mt-8 pb-4"><div className="text-center text-[11px] text-[#9e8585]">Farma Vida • Base demonstrativa de aplicativo para farmácias</div></footer>

  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#f1dedc] z-50"><div className="max-w-md mx-auto grid grid-cols-5 px-1 py-2"><Link href="/" className="text-center text-[#d71920]"><div className="text-xl">⌂</div><span className="text-[10px] font-black">Início</span></Link><Link href="/catalogo" className="text-center text-[#806666]"><div className="text-xl">💊</div><span className="text-[10px] font-bold">Catálogo</span></Link><Link href="/receitas" className="text-center text-[#806666]"><div className="text-xl">📄</div><span className="text-[10px] font-bold">Receitas</span></Link><Link href="/servicos" className="text-center text-[#806666]"><div className="text-xl">🩺</div><span className="text-[10px] font-bold">Serviços</span></Link><Link href="/cadastro" className="text-center text-[#806666]"><div className="text-xl">👤</div><span className="text-[10px] font-bold">Conta</span></Link></div></nav>
</main>}
