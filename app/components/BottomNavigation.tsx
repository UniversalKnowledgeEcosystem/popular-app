"use client";

import Link from "next/link";
import { House, ShoppingCart, Star, User, UtensilsCrossed } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";

const links=[
  {href:"/",label:"Início",Icon:House},
  {href:"/cardapio",label:"Cardápio",Icon:UtensilsCrossed},
  {href:"/carrinho",label:"Carrinho",Icon:ShoppingCart},
  {href:"/fidelidade",label:"Clube",Icon:Star},
  {href:"/perfil",label:"Perfil",Icon:User},
];

export default function BottomNavigation(){
 const {items}=useCart(); const pathname=usePathname();
 const quantidade=items.reduce((t,i)=>t+i.quantidade,0);
 return <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_30px_rgba(0,0,0,.35)]">
  <div className="mx-auto flex max-w-md justify-around px-2 py-2">
   {links.map(({href,label,Icon})=>{const ativo=href==="/"?pathname===href:pathname.startsWith(href);return <Link key={href} href={href} aria-label={label} className={`relative min-w-14 rounded-2xl px-2 py-2 flex flex-col items-center gap-1 transition active:scale-95 ${ativo?"bg-yellow-400/10 text-yellow-400":"text-zinc-400"}`}>
    <Icon size={23}/><span className="text-[10px] font-bold">{label}</span>
    {href==="/carrinho"&&quantidade>0&&<span className="absolute right-1 top-0 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-zinc-950">{quantidade}</span>}
   </Link>})}
  </div>
 </nav>
}