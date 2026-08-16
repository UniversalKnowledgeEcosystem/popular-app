import Link from "next/link";

export default function LoyaltyCard() {
  return (
    <section className="px-6 mt-8 max-w-5xl mx-auto">
      <Link href="/fidelidade" className="block rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-black shadow-xl active:scale-[.99] transition">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-black text-sm">⭐ CLUBE POPULAR</p>
            <h2 className="text-3xl font-black mt-2">12 selos = X-Salada grátis</h2>
            <p className="mt-3 font-semibold">Pedidos a partir de R$ 12,00 valem 1 selo. Acompanhe seu cartão e seu progresso pelo app.</p>
          </div>
          <span className="text-3xl">→</span>
        </div>
        <div className="grid grid-cols-12 gap-1.5 mt-5" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => <div key={i} className="aspect-square rounded-full border-2 border-black/25 bg-white/25 flex items-center justify-center text-[10px] font-black">{i + 1}</div>)}
        </div>
      </Link>
    </section>
  );
}
