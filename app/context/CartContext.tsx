"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CartItem = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};

type CartContextType = {
  items: CartItem[];
  quantidadeTotal: number;
  adicionar: (item: Omit<CartItem, "quantidade">) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function adicionar(item: Omit<CartItem, "quantidade">) {
    setItems((lista) => {
      const produtoExistente = lista.find(
        (produto) => produto.id === item.id
      );

      if (produtoExistente) {
        return lista.map((produto) =>
          produto.id === item.id
            ? { ...produto, quantidade: produto.quantidade + 1 }
            : produto
        );
      }

      return [...lista, { ...item, quantidade: 1 }];
    });
  }

  const quantidadeTotal = useMemo(
    () =>
      items.reduce(
        (total, produto) => total + produto.quantidade,
        0
      ),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, quantidadeTotal, adicionar }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const contexto = useContext(CartContext);

  if (contexto === undefined) {
    throw new Error("useCart precisa estar dentro do CartProvider.");
  }

  return contexto;
}