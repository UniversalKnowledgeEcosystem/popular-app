"use client";

import { createContext, useContext, useState } from "react";

type CartItem = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};

type CartContextType = {
  items: CartItem[];
  adicionar: (item: Omit<CartItem, "quantidade">) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);

  function adicionar(item: Omit<CartItem, "quantidade">) {
    setItems((lista) => {
      const existe = lista.find((i) => i.id === item.id);

      if (existe) {
        return lista.map((i) =>
          i.id === item.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
      }

      return [...lista, { ...item, quantidade: 1 }];
    });
  }

  return (
    <CartContext.Provider value={{ items, adicionar }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const contexto = useContext(CartContext);

  if (!contexto) {
    throw new Error("CartProvider não encontrado.");
  }

  return contexto;
}