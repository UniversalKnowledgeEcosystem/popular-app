   
"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import {
  House,
  UtensilsCrossed,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
const { items } = useCart();

const quantidade = items.reduce(
  (total, item) => total + item.quantidade,
  0
);
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

        <Link href="/carrinho" className="relative">
  <ShoppingCart size={26} className="text-white" />

  {quantidade > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {quantidade}
    </span>
  )}
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