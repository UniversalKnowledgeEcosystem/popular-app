import Link from "next/link";
import {produtosFarmacia} from "../data/farmacia";

const atalhos=[
  ["💊","Medicamentos","/cardapio","Encontre por nome ou categoria"],
  ["📄","Enviar receita","/receitas","Foto, PDF ou receita digital"],
  ["💉","Vacinas e testes","/servicos","Agende serviços de saúde"],
  ["🧑‍⚕️","Falar com farmacêutico","/servicos","Orientação e atendimento"],
];

const categorias=[
  ["🤒","Dor e febre"],["🤧","Gripes e resfriados"],["🌿","Vitaminas"],["🧴","Higiene"],
  ["✨","Dermocosméticos"],["👶","Mamãe e bebê"],["🩹","Primeiros socorros"],["❤️","Saúde diária"]
];

const destaques=produtosFarmacia.filter(p=>!p.receita).slice(0,6);
const brl=(v:number)=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

export default function Home(){return <main className="min-h-screen bg-[#f5f8fb] text-[#123047] pb-28">
  <header className="bg-white border-b border-[#dce7f0]">
    <div className="max-w-6xl mx-auto px-4 pt-4 pb-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-[#0b6bcb] text-white flex items-center justify-center shadow-sm"><span className="pharma-cross" aria-hidden="true"/></div>
          <div className="min-w-0"><p className="text-[10px] uppercase tracking-[.2em] font-black text-[#07966f]">Farmácia & Saúde</p><h1 className="text-2xl font-black leading-tight">Farma Vida</h1><p className="text-xs text-[#63798b] truncate">Cuidar de você é o nosso propósito</p></div>
        </div>
        <Link href="/carrinho" className="relative w-12 h-12 rounded-2xl bg-[#eef7ff] text-[#0b6bcb] flex items-center justify-center text-xl border border-[#dce7f0]" aria-label="Abrir sacola">🛍️</Link>
      </div>
      <Link href="/cardapio" className="mt-4 bg-[#f5f8fb] border border-[#dce7f0] rounded-2xl px-4 py-3.5 text-[#63798b] flex items-center gap-3"><span className="text-lg">🔎</span><div><p className="text-sm font-bold text-[#123047]">O que você procura?</p><p className="text-xs">Medicamentos, vitaminas, higiene, beleza...</p></div></Link>
    </div>
  </header>

  <section className="max-w-6xl mx-auto px-4 mt-4">
    <div className="rounded-3xl bg-gradient-to-br from-[#0b6bcb] to-[#07966f] text-white p-5 shadow-lg shadow-sky-900/10 overflow-hidden relative">
      <div className="relative z-10 max-w-[78%]"><span className="inline-block text-[10px] font-black uppercase tracking-[.18em] bg-white/15 px-2.5 py-1 rounded-full">Atendimento seguro</span><h2 className="text-2xl font-black mt-3 leading-tight">Compre com receita sem complicação</h2><p className="text-sm text-white/85 mt-2">Envie a prescrição e acompanhe a análise farmacêutica pelo app.</p><Link href="/receitas" className="inline-flex mt-4 bg-white text-[#0b6bcb] rounded-xl px-4 py-3 font-black text-sm">Enviar receita →</Link></div>
      <div className="absolute -right-6 -bottom-7 w-32 h-32 rounded-full bg-white/10"/><div className="absolute right-8 top-6 text-6xl opacity-90">📋</div>
    </div>
  </section>

  <section className="max-w-6xl mx-auto px-4 mt-5">
    <div className="grid grid-cols-2 gap-3">{atalhos.map(([icon,nome,href,desc])=><Link key={nome} href={href} className="pharma-card p-4 min-h-[132px] flex flex-col"><div className="w-11 h-11 rounded-2xl bg-[#eef7ff] text-2xl flex items-center justify-center">{icon}</div><h3 className="font-black mt-3 text-[15px] leading-tight">{nome}</h3><p className="text-[11px] leading-snug text-[#63798b] mt-1">{desc}</p></Link>)}</div>
  </section>

  <section className="max-w-6xl mx-auto px-4 mt-7">
    <div className="flex items-center justify-between"><div><p className="text-[10px] font-black text-[#07966f] uppercase tracking-[.16em]">Por necessidade</p><h2 className="text-xl font-black mt-0.5">Cuidados para o dia a dia</h2></div><Link href="/cardapio" className="text-sm font-black text-[#0b6bcb]">Ver tudo</Link></div>
    <div className="grid grid-cols-4 gap-3 mt-4">{categorias.map(([icon,nome])=><Link key={nome} href="/cardapio" className="text-center"><div className="aspect-square rounded-2xl bg-white border border-[#dce7f0] flex items-center justify-center text-2xl shadow-sm">{icon}</div><p className="text-[10px] font-bold leading-tight mt-2 text-[#34536a]">{nome}</p></Link>)}</div>
  </section>

  <section className="max-w-6xl mx-auto px-4 mt-7">
    <div className="rounded-3xl bg-[#eaf8f3] border border-[#cdeee2] p-5 flex items-start gap-4"><div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm">⏰</div><div className="flex-1"><p className="text-[10px] font-black uppercase tracking-[.15em] text-[#07966f]">Uso contínuo</p><h2 className="font-black text-lg mt-1">Não fique sem seus medicamentos</h2><p className="text-sm text-[#547269] mt-1">Receba lembretes de reposição e facilite suas próximas compras.</p><button className="mt-3 text-[#07966f] font-black text-sm">Criar lembrete →</button></div></div>
  </section>

  <section className="max-w-6xl mx-auto px-4 mt-7">
    <div className="flex items-end justify-between gap-3"><div><p className="text-[10px] font-black text-[#0b6bcb] uppercase tracking-[.16em]">Economize com segurança</p><h2 className="text-xl font-black mt-0.5">Ofertas em saúde e cuidado</h2></div><Link href="/cardapio" className="text-sm font-black text-[#0b6bcb]">Ver mais</Link></div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">{destaques.map(p=><article key={p.id} className="pharma-card p-3"><div className="aspect-square rounded-2xl bg-gradient-to-br from-[#eef7ff] to-[#eaf8f3] flex items-center justify-center text-6xl">{p.emoji}</div><div className="mt-3"><span className="inline-flex text-[9px] font-black px-2 py-1 rounded-full bg-[#eef7ff] text-[#0b6bcb]">{p.tag}</span><h3 className="font-bold text-sm mt-2 min-h-[40px] leading-tight">{p.nome}</h3><p className="text-xs text-[#8ca0af] line-through mt-1">{brl(p.normal)}</p><p className="text-xl font-black text-[#0b6bcb] leading-tight">{brl(p.preco)}</p><p className="text-[10px] font-black text-[#07966f] mt-1">Benefício cliente: {brl(p.clube)}</p><Link href="/cardapio" className="block text-center bg-[#0b6bcb] text-white rounded-xl py-2.5 mt-3 font-black text-sm">Ver produto</Link></div></article>)}</div>
  </section>

  <section className="max-w-6xl mx-auto px-4 mt-7 grid md:grid-cols-3 gap-3">
    <Link href="/servicos" className="pharma-card p-5"><div className="w-11 h-11 rounded-2xl bg-[#eaf8f3] flex items-center justify-center text-2xl">💉</div><h3 className="font-black mt-3">Vacinas e testes</h3><p className="text-sm text-[#63798b] mt-1">Agende um serviço e escolha o melhor horário.</p></Link>
    <Link href="/servicos" className="pharma-card p-5"><div className="w-11 h-11 rounded-2xl bg-[#eef7ff] flex items-center justify-center text-2xl">🩺</div><h3 className="font-black mt-3">Serviços farmacêuticos</h3><p className="text-sm text-[#63798b] mt-1">Pressão, glicemia, orientação e outros cuidados.</p></Link>
    <Link href="/historico" className="pharma-card p-5"><div className="w-11 h-11 rounded-2xl bg-[#f7f3ff] flex items-center justify-center text-2xl">📦</div><h3 className="font-black mt-3">Meus pedidos</h3><p className="text-sm text-[#63798b] mt-1">Acompanhe compras e veja seu histórico.</p></Link>
  </section>

  <section className="max-w-6xl mx-auto px-4 mt-7"><div className="rounded-3xl bg-white border border-[#dce7f0] p-5"><div className="flex items-start gap-3"><div className="w-10 h-10 rounded-xl bg-[#fff5e6] flex items-center justify-center">🛡️</div><div><p className="text-[10px] font-black uppercase tracking-[.15em] text-[#a46608]">Uso responsável</p><h3 className="font-black mt-1">Medicamentos com prescrição passam por validação</h3><p className="text-xs text-[#63798b] mt-1 leading-relaxed">O aplicativo não substitui orientação médica ou farmacêutica. Produtos sujeitos a receita entram em um fluxo específico de conferência antes da dispensação.</p></div></div></div></section>

  <footer className="max-w-6xl mx-auto px-4 mt-8 pb-4"><div className="text-center text-[11px] text-[#8ca0af]">Farma Vida • Base demonstrativa de aplicativo para farmácias</div></footer>

  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#dce7f0] z-50"><div className="max-w-md mx-auto grid grid-cols-5 px-1 py-2"><Link href="/" className="text-center text-[#0b6bcb]"><div className="text-xl">⌂</div><span className="text-[10px] font-black">Início</span></Link><Link href="/cardapio" className="text-center text-[#63798b]"><div className="text-xl">💊</div><span className="text-[10px] font-bold">Produtos</span></Link><Link href="/receitas" className="text-center text-[#63798b]"><div className="text-xl">📄</div><span className="text-[10px] font-bold">Receitas</span></Link><Link href="/servicos" className="text-center text-[#63798b]"><div className="text-xl">🩺</div><span className="text-[10px] font-bold">Serviços</span></Link><Link href="/cadastro" className="text-center text-[#63798b]"><div className="text-xl">👤</div><span className="text-[10px] font-bold">Conta</span></Link></div></nav>
</main>}
