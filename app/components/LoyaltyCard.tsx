import Link from "next/link";
import { ChevronRight, Gift } from "lucide-react";

export default function LoyaltyCard() {
  return (
    <section className="px-4 sm:px-6 mt-7 max-w-5xl mx-auto">
      <Link
        href="/fidelidade"
        aria-label="Abrir Clube Popular"
        className="block rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-500 p-5 sm:p-6 text-black shadow-xl active:scale-[.99] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-black text-xs sm:text-sm flex items-center gap-2"><Gift size={18} /> CLUBE POPULAR</p>
            <h2 className="text-2xl sm:text-3xl leading-tight font-black mt-2">12 selos = X-Salada grátis</h2>
            <p className="mt-2 text-sm sm:text-base font-semibold opacity-80">Pedidos a partir de R$ 12,00 valem 1 selo. Veja seu progresso no app.</p>
          </div>
          <ChevronRight className="shrink-0 mt-1" size={26} />
        </div>
        <div className="grid grid-cols-6 gap-2 mt-4 max-w-xs" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-black/20 bg-white/25 flex items-center justify-center text-[10px] font-black justify-self-center">
              {i + 1}
            </div>
          ))}
        </div>
      </Link>
    </section>
  );
}
