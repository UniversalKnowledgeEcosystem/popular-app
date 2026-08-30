"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingCart, Sparkles } from "lucide-react";
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
    <section className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-zinc-900 shadow-2xl">
      <div className="relative min-h-[300px] sm:min-h-[320px]">
        <Image
          src="/burgers/supreme.jpg"
          alt="Big Duplo da Popular"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />

        <div className="relative z-10 flex min-h-[300px] sm:min-h-[320px] flex-col justify-between p-5 sm:p-7">
          <div className="max-w-[82%] sm:max-w-[70%]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 px-3 py-1.5 text-[11px] font-black text-black shadow-lg">
              <Sparkles size={13} /> OFERTA POPULAR
            </span>

            <h2 className="mt-4 text-[34px] sm:text-4xl font-black leading-[0.95] text-white">
              Big Duplo + Refri
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-200">
              Big Duplo completo + Coca-Cola lata 350 ml.
            </p>
          </div>

          <div className="flex items-end justify-between gap-4 pt-8">
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-wide text-zinc-300">Combo por</p>
              <p className="mt-0.5 text-4xl font-black leading-none text-yellow-400">{formatPrice(COMBO.preco)}</p>
              <p className="mt-2 text-xs font-medium text-zinc-300">Economize R$ 1,10</p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/15 bg-red-600 px-3 py-2.5 text-center shadow-xl">
              <span className="block text-2xl leading-none">🥤</span>
              <span className="mt-1 block whitespace-nowrap text-[9px] font-black text-white">LATA 350 ML</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 bg-zinc-900 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3 text-[11px] text-zinc-300">
          <span className="flex items-center gap-1.5"><Check size={14} className="text-yellow-400" /> Big Duplo completo</span>
          <span className="flex items-center gap-1.5"><Check size={14} className="text-yellow-400" /> Coca-Cola 350 ml</span>
        </div>

        <button
          type="button"
          onClick={adicionarCombo}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-4 py-4 text-base font-black text-black transition active:scale-[.98]"
        >
          <ShoppingCart size={20} />
          <span>Adicionar combo</span>
          <span className="opacity-60">•</span>
          <span>{formatPrice(COMBO.preco)}</span>
        </button>

        <Link
          href="/cardapio?categoria=Lanches"
          className="block py-1 text-center text-sm font-bold text-zinc-400 transition hover:text-yellow-400"
        >
          Ver outras opções do cardápio →
        </Link>
      </div>
    </section>
  );
}
