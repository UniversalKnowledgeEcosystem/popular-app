"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../../utils/format";

const COMBO = {
  id: 90001,
  nome: "Combo Big Duplo + Coca-Cola lata",
  preco: 27.9,
};

export default function Banner() {
  const { adicionar } = useCart();

  function adicionarCombo() {
    adicionar(COMBO);
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-yellow-400/20 bg-zinc-900 shadow-2xl">
      <div className="relative h-48 sm:h-56">
        <Image
          src="/burgers/supreme.jpg"
          alt="Big Duplo da Popular"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />

        <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-[11px] font-black text-black shadow-lg">
              <Sparkles size={13} /> OFERTA POPULAR
            </span>
            <h2 className="mt-3 max-w-[70%] text-3xl sm:text-4xl font-black leading-none text-white">
              Big Duplo + Refri
            </h2>
            <p className="mt-2 max-w-[68%] text-xs sm:text-sm text-zinc-200">
              Big Duplo completo + Coca-Cola lata 350ml.
            </p>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-300">Combo por</p>
              <p className="text-3xl font-black text-yellow-400">{formatPrice(COMBO.preco)}</p>
              <p className="text-[10px] text-zinc-300">Economize R$ 1,10 no combo</p>
            </div>
            <div className="rounded-2xl bg-red-600/95 px-3 py-2 text-center shadow-lg border border-white/20">
              <span className="block text-2xl">🥤</span>
              <span className="text-[9px] font-black text-white">LATA 350ML</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-zinc-900">
        <button
          type="button"
          onClick={adicionarCombo}
          className="w-full bg-yellow-400 text-black py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-[.98] transition"
        >
          <ShoppingCart size={19} /> Adicionar combo • {formatPrice(COMBO.preco)}
        </button>
        <Link href="/cardapio?categoria=Lanches" className="block text-center mt-3 text-sm font-bold text-zinc-400 hover:text-yellow-400">
          Ver outras opções do cardápio →
        </Link>
      </div>
    </section>
  );
}
