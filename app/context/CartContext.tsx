"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CartItem = { id: number; nome: string; preco: number; quantidade: number };
type CartContextType = {
  items: CartItem[];
  quantidadeTotal: number;
  total: number;
  adicionar: (item: Omit<CartItem, "quantidade">) => void;
  diminuir: (id: number) => void;
  remover: (id: number) => void;
  limpar: () => void;
};
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  function adicionar(item: Omit<CartItem,"quantidade">) { setItems(lista => { const atual=lista.find(p=>p.id===item.id); return atual ? lista.map(p=>p.id===item.id?{...p,quantidade:p.quantidade+1}:p) : [...lista,{...item,quantidade:1}]; }); }
  function diminuir(id:number) { setItems(lista=>lista.map(p=>p.id===id?{...p,quantidade:p.quantidade-1}:p).filter(p=>p.quantidade>0)); }
  function remover(id:number) { setItems(lista=>lista.filter(p=>p.id!==id)); }
  function limpar(){setItems([])}
  const quantidadeTotal=useMemo(()=>items.reduce((t,p)=>t+p.quantidade,0),[items]);
  const total=useMemo(()=>items.reduce((t,p)=>t+p.preco*p.quantidade,0),[items]);
  return <CartContext.Provider value={{items,quantidadeTotal,total,adicionar,diminuir,remover,limpar}}>{children}</CartContext.Provider>;
}
export function useCart(){const c=useContext(CartContext);if(!c)throw new Error("useCart precisa estar dentro do CartProvider.");return c;}
