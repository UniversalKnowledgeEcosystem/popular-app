"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { products } from "../../data/products";
import { formatPrice } from "../../utils/format";
import { useCart } from "../context/CartContext";

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function SearchBar() {
  const [busca, setBusca] = useState("");
  const { adicionar } = useCart();

  const resultados = useMemo(() => {
    const termo = normalizar(busca);
    if (!termo) return [];

    return products
      .filter((produto) =>
        normalizar(
          `${produto.nome} ${produto.descricao} ${produto.categoria}`
        ).includes(termo)
      )
      .slice(0, 8);
  }, [busca]);

  const pesquisando = busca.trim().length > 0;

  return (
    <div className="px-6 mt-6 relative z-30">
      <div className={`flex items-center bg-zinc-900 px-5 py-4 border shadow-lg ${pesquisando ? "rounded-t-2xl border-yellow-400/50" : "rounded-2xl border-zinc-800"}`}>
        <Search size={23} className="text-yellow-400 mr-3 shrink-0" />

        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar lanche, batata, ingrediente..."
          aria-label="Buscar no cardápio"
          autoComplete="off"
          className="bg-transparent outline-none w-full text-white placeholder:text-zinc-500"
        />

        {pesquisando && (
          <button
            type="button"
            onClick={() => setBusca("")}
            aria-label="Limpar busca"
            className="ml-2 w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {pesquisando && (
        <div className="absolute left-6 right-6 top-full bg-zinc-900 border border-t-0 border-yellow-400/50 rounded-b-2xl shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto">
          {resultados.length === 0 ? (
            <div className="p-5 text-center">
              <p className="font-bold">Nenhum produto encontrado</p>
              <p className="text-sm text-zinc-400 mt-1">
                Tente buscar pelo nome, categoria ou ingrediente.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {resultados.map((produto) => (
                <div key={produto.id} className="p-4 flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-black truncate">{produto.nome}</p>
                        <p className="text-xs text-zinc-500">{produto.categoria}</p>
                      </div>
                      <b className="text-yellow-400 whitespace-nowrap">
                        {formatPrice(produto.preco)}
                      </b>
                    </div>
                    <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                      {produto.descricao}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      adicionar({
                        id: produto.id,
                        nome: produto.nome,
                        preco: produto.preco,
                      })
                    }
                    className="shrink-0 bg-yellow-400 text-black w-11 h-11 rounded-xl font-black text-xl"
                    aria-label={`Adicionar ${produto.nome} ao carrinho`}
                    title="Adicionar ao carrinho"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
