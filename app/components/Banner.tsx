"use client";

import Link from "next/link";
import {
  House,
  ShoppingCart,
  Star,
  User,
  UtensilsCrossed,
} from "lucide-react";

export default function BottomNavigation() {

  const quantidade = items.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-zinc-900">
      <div className="mx-auto flex max-w-md justify-around py-3">
        <Link href="/" aria-label="Início">
          <House size={26} className="text-yellow-400" />
        </Link>

        <Link href="/cardapio" aria-label="Cardápio">
          <UtensilsCrossed size={26} className="text-white" />
        </Link>

        <Link
          href="/carrinho"
          className="relative"
          aria-label="Carrinho"
        >
          <ShoppingCart size={26} className="text-white" />

          {quantidade > 0 && (
            <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
              {quantidade}
            </span>
          )}
        </Link>

        <Link href="/fidelidade" aria-label="Fidelidade">
          <Star size={26} className="text-white" />
        </Link>

        <Link href="/perfil" aria-label="Perfil">
          <User size={26} className="text-white" />
        </Link>
      </div>
    </nav>
  );
}