"use client";
import Link from "next/link";
import {products} from "../../data/products";
import {formatPrice} from "../../utils/format";
import {useCart} from "../context/CartContext";
import {ChevronRight,Flame,Plus,ShoppingBag,Star} from "lucide-react";

const destaques=[
 {id:11,imagem:"https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/x-tudo.jpg",tag:"CAMPEÃO DE PEDIDOS"},
 {id:8,imagem:"https://uptay.com.br/wp-content/uploads/2024/12/x-egg-bacon.png",tag:"QUERIDINHO DA CASA"},
 {id:15,imagem:"https://tb-static.uber.com/prod/image-proc/processed_images/434e953aaf4a73da33a6a5fe9220ee76/c67fc65e9b4e16a553eb7574fba090f1.jpeg",tag:"PARA COMPARTILHAR"},
].map(d=>({...products.find(p=>p.id===d.id)!,...d})).filter(Boolean);

export default function FeaturedProducts(){
 const{adicionar}=useCart();
 return <section className="mt-9">
  <div className="px-5 flex items-end justify-between gap-3"><div><div className="flex items-center gap-2 text-yellow-400 text-xs font-black uppercase tracking-wider"><Flame size={15} fill="currentColor"/> Os mais pedidos</div><h2 className="text-2xl font-black mt-1">Favoritos da Popular</h2><p className="text-sm text-zinc-400 mt-1">Escolha rápido entre os destaques do cardápio.</p></div><Link href="/cardapio" className="shrink-0 text-sm font-bold text-yellow-400 flex items-center">Ver todos <ChevronRight size={17}/></Link></div>
  <div className="mt-5 flex gap-4 overflow-x-auto px-5 pb-3 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
   {destaques.map((p,index)=><article key={p.id} className="relative shrink-0 w-[82vw] max-w-[340px] snap-center overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl">
    <div className="relative h-48 overflow-hidden bg-zinc-800"><img src={p.imagem} alt={`${p.nome} - Popular Hamburgueria e Sorveteria`} loading="lazy" className="w-full h-full object-cover transition duration-300 hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10"/><span className="absolute top-3 left-3 bg-yellow-400 text-black text-[10px] font-black px-3 py-1.5 rounded-full">#{index+1} {p.tag}</span><span className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold"><Star size={13} className="text-yellow-400" fill="currentColor"/> Popular</span></div>
    <div className="p-5"><div className="flex justify-between gap-3"><div className="min-w-0"><h3 className="text-xl font-black">{p.nome}</h3><p className="text-sm text-zinc-400 mt-1 line-clamp-2">{p.descricao}</p></div><div className="text-right shrink-0"><span className="text-[10px] text-zinc-500">A partir de</span><p className="text-xl font-black text-yellow-400">{formatPrice(p.preco)}</p></div></div><button onClick={()=>adicionar({id:p.id,nome:p.nome,preco:p.preco})} className="mt-4 w-full h-12 bg-yellow-400 text-black rounded-xl font-black flex items-center justify-center gap-2 active:scale-[.98] transition"><Plus size={19}/> Adicionar ao carrinho</button></div>
   </article>)}
  </div>
  <div className="px-5 mt-1"><Link href="/cardapio" className="w-full border border-zinc-800 bg-zinc-900 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm"><ShoppingBag size={18} className="text-yellow-400"/> Explorar cardápio completo</Link></div>
 </section>;
}
