"use client";
import type {ReactNode} from "react";
import {usePathname} from "next/navigation";

export default function AdminLayout({children}:{children:ReactNode}){
  const pathname=usePathname();
  const mostrar=pathname==="/admin";
  return <>
    {mostrar&&<div className="sticky top-0 z-[100] bg-zinc-950/95 backdrop-blur border-b border-yellow-400/30 px-4 py-2">
      <div className="max-w-5xl mx-auto grid grid-cols-2 gap-2">
        <button type="button" onClick={()=>{window.location.href="/admin/pedidos"}} className="rounded-xl bg-green-500 hover:bg-green-400 text-black font-black px-3 py-3 shadow-lg active:scale-[.99] transition">
          🧾 PEDIDOS <span className="hidden sm:inline font-semibold">• Receber, preparar e finalizar →</span>
        </button>
        <button type="button" onClick={()=>{window.location.href="/admin/precificacao"}} className="rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black px-3 py-3 shadow-lg active:scale-[.99] transition">
          💰 PRECIFICAÇÃO <span className="hidden sm:inline font-semibold">• Custos, margem e lucro →</span>
        </button>
      </div>
    </div>}
    {children}
    {mostrar&&<div className="sm:hidden fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      <button type="button" onClick={()=>{window.location.href="/admin/pedidos"}} className="rounded-full bg-green-500 text-black font-black w-14 h-14 shadow-2xl border-2 border-green-200 active:scale-95" aria-label="Abrir Pedidos">🧾</button>
      <button type="button" onClick={()=>{window.location.href="/admin/precificacao"}} className="rounded-full bg-yellow-400 text-black font-black w-14 h-14 shadow-2xl border-2 border-yellow-200 active:scale-95" aria-label="Abrir Precificação">💰</button>
    </div>}
  </>;
}
