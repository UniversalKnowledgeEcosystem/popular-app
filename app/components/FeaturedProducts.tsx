import { formatPrice } from "../../utils/format";
import ProductCard from "./ProductCard";
import { products } from "../../data/products";

export default function FeaturedProducts() {
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
            preco={formatPrice(product.preco)}            imagem={product.imagem}
          />
        ))}
      </div>
    </section>
  );
}   