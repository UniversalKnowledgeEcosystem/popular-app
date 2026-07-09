"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type CartItem = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
};

type CartContextType = {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, "quantidade">) => void;
  removeItem: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(item: Omit<CartItem, "quantidade">) {
    setItems((prev) => {
      const existe = prev.find((p) => p.id === item.id);

      if (existe) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantidade: p.quantidade + 1 }
            : p
        );
      }

      return [...prev, { ...item, quantidade: 1 }];
    });
  }

  function increase(id: number) {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantidade: p.quantidade + 1 }
          : p
      )
    );
  }

  function decrease(id: number) {
    setItems((prev) =>
      prev
        .map((p) =>
          p.id === id
            ? { ...p, quantidade: p.quantidade - 1 }
            : p
        )
        .filter((p) => p.quantidade > 0)
    );
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  const total = useMemo(() => {
    return items.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addItem,
        removeItem,
        increase,
        decrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro do CartProvider");
  }

  return context;
}