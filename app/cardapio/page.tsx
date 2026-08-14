import { products } from "../../data/products";
import { formatPrice } from "../../utils/format";

export default function Cardapio() {
  return (
    <main className="min-h-screen bg-black text-white p-6 pb-24">
      <h1 className="text-4xl font-bold text-yellow-400">
        Cardápio
      </h1>

      <div className="mt-8 space-y-4">
        {products.map((produto) => (
          <div
            key={produto.id}
            className="bg-zinc-900 rounded-2xl p-5 flex items-center justify-between gap-4"
          >
            <div>
              <div className="text-4xl">
                {produto.categoria === "Batatas" ? "🍟" : "🍔"}
              </div>
              <h2 className="text-xl font-bold mt-2">{produto.nome}</h2>
              <p className="text-zinc-400 mt-1">{produto.descricao}</p>
              <p className="text-yellow-400 font-bold mt-2">
                {formatPrice(produto.preco)}
              </p>
            </div>

            <button className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold shrink-0">
              Pedir
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
