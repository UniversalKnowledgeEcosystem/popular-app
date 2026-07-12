"use client";

import { products } from "../../data/products";
import { formatPrice } from "../../utils/format";
import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const { adicionar } = useCart();

  return (
    <section className="px-6 mt-8">
      <h2 className="text-2xl font-bold mb-5">
        🔥 Mais Vendidos
      </h2>

      <div className="grid gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            nome={product.nome}
            descricao={product.descricao}
            preco={formatPrice(product.preco)}
            imagem={product.imagem}
            onAdd={() =>
              adicionar({
                id: product.id,
                nome: product.nome,
                preco: product.preco,
              })
            }
          />
        ))}
      </div>
    </section>
  );
}