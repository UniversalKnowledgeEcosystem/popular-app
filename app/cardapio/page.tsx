"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

const categorias = ["Todos","Hortifruti","Carnes","Padaria","Frios","Laticínios","Mercearia","Bebidas","Limpeza","Higiene","Congelados","Pet","Bebê"];

const produtos = [
 {id:2001,nome:"Banana prata",categoria:"Hortifruti",unidade:"kg",preco:4.49,normal:5.49,clube:4.19,emoji:"🍌",tag:"OFERTA"},
 {id:2002,nome:"Tomate",categoria:"Hortifruti",unidade:"kg",preco:4.99,normal:6.49,clube:4.59,emoji:"🍅",tag:"HORTIFRUTI"},
 {id:2003,nome:"Batata inglesa",categoria:"Hortifruti",unidade:"kg",preco:5.79,normal:6.99,clube:5.39,emoji:"🥔",tag:"OFERTA"},
 {id:2004,nome:"Maçã gala",categoria:"Hortifruti",unidade:"kg",preco:8.99,normal:9.99,clube:8.49,emoji:"🍎",tag:"FRESCO"},
 {id:2101,nome:"Patinho bovino",categoria:"Carnes",unidade:"kg",preco:39.90,normal:44.90,clube:37.90,emoji:"🥩",tag:"AÇOUGUE"},
 {id:2102,nome:"Peito de frango",categoria:"Carnes",unidade:"kg",preco:17.90,normal:20.90,clube:16.90,emoji:"🍗",tag:"OFERTA"},
 {id:2103,nome:"Linguiça toscana",categoria:"Carnes",unidade:"kg",preco:18.99,normal:21.99,clube:17.99,emoji:"🌭",tag:"CHURRASCO"},
 {id:2201,nome:"Pão francês",categoria:"Padaria",unidade:"kg",preco:14.90,normal:15.90,clube:14.50,emoji:"🥖",tag:"PADARIA"},
 {id:2202,nome:"Pão de forma 500g",categoria:"Padaria",unidade:"un",preco:8.49,normal:9.49,clube:7.99,emoji:"🍞",tag:"OFERTA"},
 {id:2301,nome:"Presunto fatiado",categoria:"Frios",unidade:"200g",preco:8.90,normal:10.49,clube:8.49,emoji:"🥓",tag:"FRIOS"},
 {id:2302,nome:"Queijo muçarela",categoria:"Frios",unidade:"200g",preco:12.90,normal:14.90,clube:11.90,emoji:"🧀",tag:"CLUBE"},
 {id:2401,nome:"Leite integral 1L",categoria:"Laticínios",unidade:"un",preco:4.79,normal:5.29,clube:4.49,emoji:"🥛",tag:"MAIS VENDIDO"},
 {id:2402,nome:"Iogurte natural 170g",categoria:"Laticínios",unidade:"un",preco:3.49,normal:3.99,clube:3.29,emoji:"🥣",tag:"CLUBE"},
 {id:2501,nome:"Arroz tipo 1 5kg",categoria:"Mercearia",unidade:"pct",preco:27.90,normal:31.90,clube:25.90,emoji:"🍚",tag:"OFERTA"},
 {id:2502,nome:"Feijão carioca 1kg",categoria:"Mercearia",unidade:"pct",preco:7.49,normal:8.99,clube:6.99,emoji:"🫘",tag:"CLUBE"},
 {id:2503,nome:"Café torrado 500g",categoria:"Mercearia",unidade:"pct",preco:19.90,normal:22.90,clube:18.49,emoji:"☕",tag:"OFERTA"},
 {id:2504,nome:"Óleo de soja 900ml",categoria:"Mercearia",unidade:"un",preco:7.99,normal:8.99,clube:7.49,emoji:"🫗",tag:"MERCEARIA"},
 {id:2505,nome:"Açúcar cristal 5kg",categoria:"Mercearia",unidade:"pct",preco:17.90,normal:19.90,clube:16.99,emoji:"🧂",tag:"ECONOMIA"},
 {id:2601,nome:"Refrigerante cola 2L",categoria:"Bebidas",unidade:"un",preco:8.99,normal:10.49,clube:8.49,emoji:"🥤",tag:"BEBIDAS"},
 {id:2602,nome:"Água mineral 1,5L",categoria:"Bebidas",unidade:"un",preco:2.99,normal:3.49,clube:2.79,emoji:"💧",tag:"CLUBE"},
 {id:2603,nome:"Suco de uva 1L",categoria:"Bebidas",unidade:"un",preco:12.90,normal:14.90,clube:11.90,emoji:"🧃",tag:"OFERTA"},
 {id:2701,nome:"Detergente 500ml",categoria:"Limpeza",unidade:"un",preco:2.79,normal:3.29,clube:2.49,emoji:"🧴",tag:"LIMPEZA"},
 {id:2702,nome:"Sabão em pó 1,6kg",categoria:"Limpeza",unidade:"un",preco:18.90,normal:21.90,clube:17.49,emoji:"🧼",tag:"OFERTA"},
 {id:2703,nome:"Papel toalha 2 rolos",categoria:"Limpeza",unidade:"pct",preco:6.99,normal:7.99,clube:6.49,emoji:"🧻",tag:"CASA"},
 {id:2801,nome:"Sabonete 85g",categoria:"Higiene",unidade:"un",preco:2.49,normal:2.99,clube:2.29,emoji:"🧼",tag:"HIGIENE"},
 {id:2802,nome:"Papel higiênico 12 rolos",categoria:"Higiene",unidade:"pct",preco:17.90,normal:19.90,clube:16.90,emoji:"🧻",tag:"OFERTA"},
 {id:2901,nome:"Pizza congelada 460g",categoria:"Congelados",unidade:"un",preco:16.90,normal:18.90,clube:15.90,emoji:"🍕",tag:"CONGELADOS"},
 {id:2902,nome:"Batata congelada 2kg",categoria:"Congelados",unidade:"pct",preco:26.90,normal:29.90,clube:24.90,emoji:"🍟",tag:"ECONOMIA"},
 {id:3001,nome:"Ração cães 10kg",categoria:"Pet",unidade:"pct",preco:89.90,normal:99.90,clube:84.90,emoji:"🐶",tag:"PET"},
 {id:3101,nome:"Fralda descartável M 40un",categoria:"Bebê",unidade:"pct",preco:49.90,normal:54.90,clube:46.90,emoji:"👶",tag:"BEBÊ"},
];

const brl=(v:number)=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

export default function Catalogo(){
 const {adicionar,quantidadeTotal,total}=useCart();
 const [busca,setBusca]=useState("");
 const [categoria,setCategoria]=useState("Todos");
 const [somenteOfertas,setSomenteOfertas]=useState(false);
 const [toast,setToast]=useState("");
 const q=busca.trim().toLowerCase();
 const lista=useMemo(()=>produtos.filter(p=>(categoria==="Todos"||p.categoria===categoria)&&(!q||p.nome.toLowerCase().includes(q)||p.categoria.toLowerCase().includes(q))&&(!somenteOfertas||p.normal>p.preco)),[categoria,q,somenteOfertas]);
 function add(p:(typeof produtos)[number]){adicionar({id:p.id,nome:`${p.nome} • ${p.unidade}`,preco:p.preco});setToast(`✓ ${p.nome} adicionado`);setTimeout(()=>setToast(""),1300)}
 return <main className="min-h-screen bg-[#f6f7f9] text-zinc-900 pb-36">
   <header className="bg-emerald-700 text-white px-4 py-5 shadow-sm"><div className="max-w-6xl mx-auto"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[.15em] text-emerald-100">Mercado Fácil</p><h1 className="text-2xl font-black">Produtos</h1></div><Link href="/carrinho" className="bg-white text-emerald-800 rounded-2xl px-4 py-3 font-black">🛒 {quantidadeTotal}</Link></div><input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="🔎 Buscar arroz, carne, limpeza..." className="w-full mt-4 rounded-2xl px-4 py-3 text-base text-zinc-900 outline-none"/></div></header>
   <div className="max-w-6xl mx-auto px-4">
    <div className="flex gap-2 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{categorias.map(c=><button key={c} onClick={()=>setCategoria(c)} className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-black ${categoria===c?"bg-emerald-700 text-white":"bg-white border border-zinc-200"}`}>{c}</button>)}</div>
    <div className="flex items-center justify-between gap-3 mb-4"><div><p className="text-xs font-black text-emerald-700 uppercase">{lista.length} produtos</p><h2 className="text-xl font-black">{categoria}</h2></div><label className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-2 text-sm font-bold"><input type="checkbox" checked={somenteOfertas} onChange={e=>setSomenteOfertas(e.target.checked)}/> Só ofertas</label></div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{lista.map(p=><article key={p.id} className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm"><div className="aspect-square bg-gradient-to-br from-emerald-50 to-zinc-100 flex items-center justify-center text-6xl relative"><span>{p.emoji}</span><span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-full">{p.tag}</span></div><div className="p-3"><p className="text-xs font-bold text-zinc-400">{p.categoria} • {p.unidade}</p><h3 className="font-black text-sm mt-1 min-h-[40px] leading-tight">{p.nome}</h3><p className="text-xs line-through text-zinc-400 mt-2">{brl(p.normal)}</p><p className="text-xl font-black text-emerald-700 leading-none">{brl(p.preco)}</p><p className="text-[11px] font-black text-amber-700 mt-1">⭐ Clube {brl(p.clube)}</p><button onClick={()=>add(p)} className="w-full bg-emerald-700 text-white rounded-xl py-3 mt-3 font-black">Adicionar</button></div></article>)}</div>
    {!lista.length&&<div className="bg-white border border-zinc-200 rounded-3xl p-8 text-center mt-4"><div className="text-4xl">🔎</div><h3 className="font-black mt-2">Nenhum produto encontrado</h3><p className="text-sm text-zinc-500 mt-1">Tente outra busca ou categoria.</p></div>}
   </div>
   {quantidadeTotal>0&&<Link href="/carrinho" className="fixed bottom-4 left-4 right-4 max-w-xl mx-auto bg-zinc-950 text-white rounded-2xl p-4 flex items-center justify-between shadow-2xl z-50"><div><b>{quantidadeTotal} {quantidadeTotal===1?"item":"itens"}</b><p className="text-xs text-zinc-400">Ir para o carrinho</p></div><b className="text-emerald-300">{brl(total)} →</b></Link>}
   {toast&&<div className="fixed top-4 left-1/2 -translate-x-1/2 z-[80] bg-zinc-950 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-bold">{toast}</div>}
 </main>
}
