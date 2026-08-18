import Link from "next/link";
import { ChevronRight, Gift } from "lucide-react";

function Stamps() {
  return (
    <div className="grid grid-cols-6 gap-2 mt-4 max-w-xs" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-black/20 bg-white/25 flex items-center justify-center text-[10px] font-black justify-self-center">
          {i + 1}
        </div>
      ))}
    </div>
  );
}

export default function LoyaltyCard() {
  return (
    <section className="px-4 sm:px-6 mt-7 max-w-5xl mx-auto">
      <div className="mb-3 px-1">
        <p className="text-yellow-400 text-xs font-black tracking-wider">CLUBE POPULAR</p>
        <h2 className="text-xl font-black text-white">Ganhe prêmios nos seus pedidos</h2>
        <p className="text-xs text-zinc-400 mt-1">São dois clubes, com selos e prêmios separados.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/fidelidade?clube=lanche"
          aria-label="Abrir Clube do Lanche"
          className="block rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-500 p-5 sm:p-6 text-black shadow-xl active:scale-[.99] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-black text-xs sm:text-sm flex items-center gap-2"><Gift size={18} /> 🍔 CLUBE DO LANCHE</p>
              <h3 className="text-2xl leading-tight font-black mt-2">12 selos = X-Salada grátis</h3>
              <p className="mt-2 text-sm font-semibold opacity-80">R$ 20 em itens elegíveis no pedido = 1 selo.</p>
            </div>
            <ChevronRight className="shrink-0 mt-1" size={26} />
          </div>
          <Stamps />
        </Link>

        <Link
          href="/fidelidade?clube=acai"
          aria-label="Abrir Clube do Açaí"
          className="block rounded-3xl bg-gradient-to-r from-purple-500 to-fuchsia-600 p-5 sm:p-6 text-white shadow-xl active:scale-[.99] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-black text-xs sm:text-sm flex items-center gap-2"><Gift size={18} /> 🥤 CLUBE DO AÇAÍ</p>
              <h3 className="text-2xl leading-tight font-black mt-2">12 selos = Açaí 200 ml grátis</h3>
              <p className="mt-2 text-sm font-semibold opacity-90">Açaí de 500 ml no pedido = 1 selo.</p>
            </div>
            <ChevronRight className="shrink-0 mt-1" size={26} />
          </div>
          <Stamps />
        </Link>
      </div>
    </section>
  );
}
