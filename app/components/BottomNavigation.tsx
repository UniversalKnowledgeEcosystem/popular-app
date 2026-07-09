    "use client";

import Link from "next/link";
import {
  House,
  UtensilsCrossed,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800">

      <div className="max-w-md mx-auto flex justify-around py-3">

        <Link href="/">
          <House size={26} className="text-yellow-400" />
        </Link>

        <Link href="/cardapio">
          <UtensilsCrossed size={26} className="text-white" />
        </Link>

        <Link href="/carrinho">
          <ShoppingCart size={26} className="text-white" />
        </Link>

        <Link href="/fidelidade">
          <Star size={26} className="text-white" />
        </Link>

        <Link href="/perfil">
          <User size={26} className="text-white" />
        </Link>

      </div>

    </nav>
  );
}