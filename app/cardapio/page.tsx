"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products } from "../../data/products";
import { formatPrice } from "../../utils/format";
import { useCart } from "../context/CartContext";

type Item = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  emoji: string;
  disponivel: boolean;
  destaque: boolean;
  normal?: number;
};

const FAV = "popular_favoritos";
const extras = [
  { n: "Bacon extra", p: 3 },
  { n: "Carne extra", p: 4 },
  { n: "Queijo extra", p: 2 },
  { n: "Ovo extra", p: 2 },
];

const dados = [
  ["Bebidas", "🥤", [["Coca-Cola lata 350ml", 5], ["Coca-Cola mini lata", 3.5], ["Coca-Cola 1 litro", 8], ["Coca-Cola 2 litros", 12], ["Kuat Guaraná 2 litros", 8.5], ["Monster", 12]]],
  ["Sucos", "🍹", [["Suco médio", 6], ["Suco grande", 7], ["Vitamina média", 7], ["Vitamina grande", 8]]],
  ["Açaí", "🫐", [["Açaí 200ml", 8], ["Açaí 300ml", 10], ["Açaí 400ml", 12], ["Açaí 500ml", 14]]],
  ["Sorvetes", "🍦", [["1 bola de sorvete", 2.5], ["Picolé comum", 2], ["Picolé de casquinha", 3.5]]],
  ["Milk Shakes", "🥛", [["Milk shake 300ml", 9], ["Milk shake 400ml", 11], ["Milk shake 500ml", 13]]],
] as const;

const ordemSecoes = ["Lanches", "Batatas", "Bebidas", "Sucos", "Açaí", "Sorvetes", "Milk Shakes"];
const categorias = ["Todos", "Favoritos", ...ordemSecoes];

function slugCategoria(c: string) {
  return `categoria-${c.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").toLowerCase()}`;
}

function volumeDoProduto(nome: string) {
  const ml = nome.match(/(\d+(?:[.,]\d+)?)\s*ml\b/i);
  if (ml) return Number(ml[1].replace(",", "."));
  const l = nome.match(/(\d+(?:[.,]\d+)?)\s*(?:litro|litros|l)\b/i);
  if (l) return Number(l[1].replace(",", ".")) * 1000;
  if (/mini lata/i.test(nome)) return 220;
  if (/lata/i.test(nome)) return 350;
  if (/monster/i.test(nome)) return 473;
  if (/\bgrande\b/i.test(nome)) return 500;
  if (/\bm[eé]di[oa]\b/i.test(nome)) return 300;
  return 350;
}

const FOTOS_REFRIGERANTES = [
  { test: /coca-cola mini lata/i, url: "https://andinacocacola.vtexassets.com/arquivos/ids/157652-800-auto?aspect=true&height=auto&v=639094449080200000&width=800", alt: "Coca-Cola Original mini lata 220ml" },
  { test: /coca-cola lata 350ml/i, url: "https://gbarbosa.vtexassets.com/arquivos/ids/221004/6553621106598519a772ee8d.jpg?v=638355602138730000", alt: "Coca-Cola Original lata 350ml" },
  { test: /coca-cola 1 litro/i, url: "https://www.pontocertoconveniencia.com.br/media/catalog/product/c/o/coca-litro-vidro.jpg", alt: "Coca-Cola 1 litro" },
  { test: /coca-cola 2 litros/i, url: "https://andinacocacola.vtexassets.com/arquivos/ids/158758-800-auto?aspect=true&height=auto&v=639156020671730000&width=800", alt: "Coca-Cola Original 2 litros PET" },
  { test: /kuat/i, url: "https://supermercadosimperatriz.vteximg.com.br/arquivos/ids/212019-1000-1000/7894900911510-preview-Photoroom.png?v=639015083306130000", alt: "Kuat Guaraná 2 litros" },
  { test: /monster/i, url: "https://andinacocacola.vtexassets.com/arquivos/ids/158541-800-auto?aspect=true&height=auto&v=639094449074100000&width=800", alt: "Monster Energy Green 473ml" },
];

function RefrigeranteRealista({ nome }: { nome: string }) {
  const volume = volumeDoProduto(nome);
  const foto = FOTOS_REFRIGERANTES.find(x => x.test.test(nome));
  const altura = volume >= 2000 ? 112 : volume >= 1000 ? 104 : volume >= 470 ? 92 : volume >= 350 ? 86 : 78;
  const filtro = `remove-white-${nome.replace(/[^a-z0-9]/gi, "-")}`;
  if (!foto) return <div className="text-5xl h-28 flex items-center justify-center">🥤</div>;
  return (
    <div className="h-32 w-full flex flex-col items-center justify-end" title={foto.alt}>
      <svg width="98" height={altura} viewBox="0 0 100 120" className="overflow-visible drop-shadow-[0_10px_12px_rgba(0,0,0,.6)]" role="img" aria-label={foto.alt}>
        <defs><filter id={filtro} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 0 3" /></filter></defs>
        <image href={foto.url} x="0" y="0" width="100" height="120" preserveAspectRatio="xMidYMid meet" filter={`url(#${filtro})`} />
      </svg>
      <span className="text-[10px] font-black text-zinc-400 mt-1">{volume >= 1000 ? `${volume / 1000}L` : `${volume}ml`}</span>
    </div>
  );
}

function IconeProduto({ item }: { item: Item }) {
  if (item.categoria === "Bebidas") return <RefrigeranteRealista nome={item.nome} />;
  if (!["Sucos", "Açaí", "Milk Shakes"].includes(item.categoria)) return <div className="text-6xl h-28 flex items-center justify-center">{item.emoji}</div>;
  const volume = volumeDoProduto(item.nome);
  const escala = Math.max(.9, Math.min(1.55, .78 + volume / 1700));
  const largura = Math.round(42 * escala);
  const altura = Math.round(58 * escala);
  const isAcai = item.categoria === "Açaí";
  const isMilk = item.categoria === "Milk Shakes";
  const isVitamina = /vitamina/i.test(item.nome);
  const cor = isAcai ? "#6d28d9" : isMilk || isVitamina ? "#f5deb3" : "#f59e0b";
  const simbolo = isAcai ? "🫐" : isMilk ? "🥛" : isVitamina ? "🍌" : "🍊";
  return (
    <div className="h-32 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: largura + 12, height: altura + 12 }}>
        <div className="relative border-2 border-white/70 shadow-lg flex items-center justify-center overflow-hidden" style={{ width: largura, height: altura, background: `linear-gradient(to top,${cor} 0%,${cor} 74%,rgba(255,255,255,.2) 74%)`, borderRadius: "5px 5px 12px 12px", clipPath: "polygon(8% 0,92% 0,82% 100%,18% 100%)" }}><span style={{ fontSize: Math.max(18, Math.round(21 * escala)) }}>{simbolo}</span></div>
        <div className="absolute -top-1 h-2 rounded-full bg-white/80" style={{ width: Math.round(largura * .9) }} />
      </div>
      <span className="text-[10px] font-black text-zinc-400 mt-1">{volume >= 1000 ? `${volume / 1000}L` : `${volume}ml`}</span>
    </div>
  );
}

function C() {
  const params = useSearchParams();
  const { adicionar, quantidadeTotal, total } = useCart();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [edit, setEdit] = useState<Item | null>(null);
  const [creme, setCreme] = useState("");
  const [sem, setSem] = useState<string[]>([]);
  const [add, setAdd] = useState<string[]>([]);
  const [fav, setFav] = useState<number[]>([]);
  const [cfg, setCfg] = useState<any[]>([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try { setFav(JSON.parse(localStorage.getItem(FAV) || "[]")); } catch {}
    const c = params.get("categoria");
    if (c && categorias.includes(c)) setCategoria(c);
    fetch("/api/cardapio", { cache: "no-store" }).then(r => r.json()).then(j => setCfg(j.config || [])).catch(() => {});
  }, [params]);

  const itens: Item[] = useMemo(() => {
    let id = 10000;
    const base: Item[] = [
      ...products.map(p => ({ id: p.id, nome: p.nome, descricao: p.descricao || "", preco: p.preco, categoria: p.categoria === "Batatas" ? "Batatas" : "Lanches", emoji: p.categoria === "Batatas" ? "🍟" : "🍔", disponivel: true, destaque: false })),
      ...dados.flatMap(([cat, emoji, l]) => l.map(([nome, preco]) => ({ id: id++, nome, descricao: "", preco: Number(preco), categoria: String(cat), emoji: String(emoji), disponivel: true, destaque: false }))),
    ];
    return base.map((i): Item => {
      const c = cfg.find((x: any) => String(x.produto_id) === String(i.id) || String(x.nome).toLowerCase() === i.nome.toLowerCase());
      if (!c) return i;
      const promo = c.preco_promocional != null ? Number(c.preco_promocional) : null;
      const normal = Number(c.preco);
      return { ...i, preco: promo ?? normal, normal: promo != null ? normal : undefined, disponivel: c.disponivel !== false, destaque: !!c.destaque };
    }).sort((a, b) => Number(b.destaque) - Number(a.destaque));
  }, [cfg]);

  const q = busca.trim().toLowerCase();
  const itensVisiveis = itens.filter(i => !q || i.nome.toLowerCase().includes(q));
  const favoritosVisiveis = itensVisiveis.filter(i => fav.includes(i.id));
  const secoes = categoria === "Favoritos"
    ? (favoritosVisiveis.length ? [{ nome: "Favoritos", itens: favoritosVisiveis }] : [])
    : [
        ...(fav.length ? [{ nome: "Favoritos", itens: favoritosVisiveis }] : []),
        ...ordemSecoes.map(nome => ({ nome, itens: itensVisiveis.filter(i => i.categoria === nome) })),
      ].filter(s => s.itens.length > 0);

  function irPara(c: string) {
    setCategoria(c);
    if (c === "Todos" || c === "Favoritos") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setTimeout(() => document.getElementById(slugCategoria(c))?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  function favorito(id: number) {
    const n = fav.includes(id) ? fav.filter(x => x !== id) : [...fav, id];
    setFav(n);
    localStorage.setItem(FAV, JSON.stringify(n));
  }

  function abrir(i: Item) {
    if (!i.disponivel) return;
    if (i.categoria !== "Lanches") {
      adicionar({ id: i.id, nome: i.nome, preco: i.preco });
      return aviso(i.nome);
    }
    setEdit(i);
    setCreme(/^big\b/i.test(i.nome) ? "Cheddar" : "");
    setSem([]);
    setAdd([]);
  }

  function aviso(n: string) {
    setToast(`✓ ${n} adicionado`);
    setTimeout(() => setToast(""), 1500);
  }

  function montar() {
    if (!edit) return;
    const e = extras.filter(x => add.includes(x.n));
    const preco = edit.preco + e.reduce((s, x) => s + x.p, 0);
    const det = [creme && /^big\b/i.test(edit.nome) ? creme : "", ...sem.map(x => `sem ${x}`), ...e.map(x => `+ ${x.n}`)].filter(Boolean);
    const nome = `${edit.nome}${det.length ? ` • ${det.join(" • ")}` : ""}`;
    const id = edit.id * 100000 + Math.abs(nome.split("").reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0));
    adicionar({ id, nome, preco });
    setEdit(null);
    aviso(edit.nome);
  }

  const ing = edit?.descricao.split(/[,.]/).map(x => x.trim()).filter(x => x && x.length < 24).slice(0, 8) || [];

  return <main className="min-h-screen bg-black text-white pb-40">
    <div className="sticky top-0 z-40 bg-black/95 border-b border-zinc-800 p-4 backdrop-blur">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-start"><div><p className="text-yellow-400 text-xs font-black">CARDÁPIO ATUALIZADO</p><h1 className="text-2xl font-black">Popular</h1></div><Link href="/" className="text-sm text-zinc-300">Início</Link></div>
        <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="🔎 O que você quer comer?" className="w-full bg-zinc-900 p-3 rounded-xl mt-3 outline-none focus:ring-2 focus:ring-yellow-400" />
        <div className="flex gap-2 overflow-x-auto pt-3 pb-1 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categorias.map(c => <button key={c} onClick={() => irPara(c)} className={`snap-start whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition ${categoria === c ? "bg-yellow-400 text-black" : "bg-zinc-900 text-zinc-200"}`}>{c}</button>)}
        </div>
      </div>
    </div>

    <div className="max-w-5xl mx-auto py-3">
      {secoes.map(secao => <section key={secao.nome} id={slugCategoria(secao.nome)} className="scroll-mt-40 py-4">
        <div className="px-4 mb-3 flex items-end justify-between gap-3"><div><p className="text-[11px] uppercase tracking-[.18em] text-yellow-400 font-black">Explore</p><h2 className="text-2xl font-black">{secao.nome}</h2></div><span className="text-xs text-zinc-400 whitespace-nowrap">Arraste →</span></div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-3 snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {secao.itens.map(i => <article key={i.id} className={`relative snap-start shrink-0 w-[68vw] max-w-[270px] min-h-[245px] rounded-3xl border p-3.5 flex flex-col ${i.disponivel ? "bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800" : "bg-zinc-950 border-zinc-900 opacity-60"}`}>
            {i.destaque && <span className="absolute top-3 left-3 z-10 bg-yellow-400 text-black text-[10px] font-black px-2 py-1 rounded-full">🔥 DESTAQUE</span>}
            <button onClick={() => favorito(i.id)} className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/55 backdrop-blur flex items-center justify-center text-lg" aria-label="Favoritar">{fav.includes(i.id) ? "❤️" : "🤍"}</button>
            <div className="rounded-2xl bg-black/35 border border-white/5 flex items-center justify-center min-h-32 mb-3 overflow-hidden"><IconeProduto item={i} /></div>
            <div className="flex-1"><h3 className="font-black text-[15px] leading-tight pr-8">{i.nome}</h3>{!i.disponivel ? <p className="text-red-400 font-black text-xs mt-2">● ESGOTADO NO MOMENTO</p> : <div className="mt-2 flex items-center flex-wrap gap-2">{i.normal && <span className="text-xs text-zinc-500 line-through">{formatPrice(i.normal)}</span>}<b className={`text-lg ${i.normal ? "text-green-400" : "text-yellow-400"}`}>{formatPrice(i.preco)}</b>{i.normal && <span className="text-[9px] bg-green-500 text-black font-black px-2 py-1 rounded-full">OFERTA</span>}</div>}</div>
            <button disabled={!i.disponivel} onClick={() => abrir(i)} className={`mt-3 w-full h-10 rounded-xl font-black flex items-center justify-center gap-2 ${i.disponivel ? "bg-yellow-400 text-black active:scale-[.98]" : "bg-zinc-800 text-zinc-600"}`}>{i.disponivel ? <><span className="text-xl">+</span><span>Adicionar</span></> : "Indisponível"}</button>
          </article>)}
        </div>
      </section>)}

      {categoria === "Favoritos" && !favoritosVisiveis.length && <div className="px-6 py-20 text-center"><div className="text-5xl mb-4">🤍</div><h2 className="text-xl font-black">Nenhum favorito ainda</h2><p className="text-sm text-zinc-400 mt-2">Toque no coração de um produto para ele aparecer aqui.</p></div>}
      {categoria !== "Favoritos" && !secoes.length && <div className="px-4 py-16 text-center text-zinc-400"><div className="text-4xl mb-3">🔎</div><b>Nenhum item encontrado</b><p className="text-sm mt-1">Tente buscar por outro nome.</p></div>}
    </div>

    {toast && <div className="fixed top-4 z-[90] left-4 right-4 max-w-sm mx-auto bg-green-500 text-black p-3 rounded-xl text-center font-black shadow-xl">{toast}</div>}
    {edit && <div className="fixed inset-0 z-[80] bg-black/80 p-4 overflow-y-auto"><div className="max-w-md mx-auto bg-zinc-900 rounded-3xl p-5 my-8"><div className="flex justify-between"><h2 className="text-2xl font-black">{edit.nome}</h2><button onClick={() => setEdit(null)}>✕</button></div>{/^big\b/i.test(edit.nome) && <div className="grid grid-cols-2 gap-2 mt-4">{["Cheddar", "Catupiry"].map(x => <button key={x} onClick={() => setCreme(x)} className={`p-3 rounded-xl font-bold ${creme === x ? "bg-yellow-400 text-black" : "bg-zinc-800"}`}>{x}</button>)}</div>}<section className="mt-5"><b>🚫 Retirar ingredientes</b><div className="flex flex-wrap gap-2 mt-2">{ing.map(x => <button key={x} onClick={() => setSem(sem.includes(x) ? sem.filter(y => y !== x) : [...sem, x])} className={`px-3 py-2 rounded-xl text-xs ${sem.includes(x) ? "bg-red-500" : "bg-zinc-800"}`}>{x}</button>)}</div></section><section className="mt-5"><b>➕ Adicionais</b>{extras.map(x => <button key={x.n} onClick={() => setAdd(add.includes(x.n) ? add.filter(y => y !== x.n) : [...add, x.n])} className={`w-full flex justify-between p-3 rounded-xl mt-2 ${add.includes(x.n) ? "bg-green-500 text-black" : "bg-zinc-800"}`}><span>{x.n}</span><b>+ {formatPrice(x.p)}</b></button>)}</section><button onClick={montar} className="w-full bg-yellow-400 text-black p-4 rounded-xl font-black mt-5">Adicionar ao carrinho</button></div></div>}
    {quantidadeTotal > 0 && <Link href="/carrinho" className="fixed bottom-20 left-4 right-4 max-w-md mx-auto bg-yellow-400 text-black rounded-2xl p-4 flex justify-between font-black shadow-2xl"><span>🛒 {quantidadeTotal} itens</span><span>{formatPrice(total)} →</span></Link>}
  </main>;
}

export default function Cardapio() {
  return <Suspense><C /></Suspense>;
}
