"use client";
import type {ReactNode} from "react";
import {usePathname} from "next/navigation";

export default function AdminLayout({children}:{children:ReactNode}){
  const pathname=usePathname();
  const mostrar=pathname==="/admin";
  return <>
    {children}
    {mostrar&&<button
      type="button"
      onClick={()=>{window.location.href="/admin/precificacao"}}
      className="fixed bottom-5 right-5 z-50 rounded-2xl bg-yellow-400 px-5 py-4 font-black text-black shadow-2xl border border-yellow-200 hover:bg-yellow-300 active:scale-95 transition"
      aria-label="Abrir Central de Precificação"
    >💰 Precificação</button>}
  </>;
}
