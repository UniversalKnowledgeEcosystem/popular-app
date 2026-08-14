import Link from "next/link";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import LoyaltyCard from "./components/LoyaltyCard";
import LocationCard from "./components/LocationCard";

export default function Home(){return <main className="min-h-screen bg-zinc-950 text-white pb-32">
 <Header/>
 <section className="px-6 mt-5 max-w-5xl mx-auto">
  <div className="grid grid-cols-2 gap-3">
   <Link href="/cardapio" className="col-span-2 bg-yellow-400 text-black rounded-3xl p-5 flex items-center justify-between shadow-xl active:scale-[.99] transition"><div><p className="text-xs font-black uppercase opacity-60">Bateu a fome?</p><h2 className="text-2xl font-black">🍔 Fazer pedido</h2><p className="text-sm font-semibold mt-1">Cardápio completo em poucos toques</p></div><span className="text-3xl">→</span></Link>
   <Link href="/fidelidade" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"><span className="text-2xl">⭐</span><h3 className="font-black mt-2">Clube Popular</h3><p className="text-xs text-zinc-400 mt-1">Veja seus selos e prêmio</p></Link>
   <Link href="/carrinho" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"><span className="text-2xl">🛒</span><h3 className="font-black mt-2">Meu carrinho</h3><p className="text-xs text-zinc-400 mt-1">Revise antes de pedir</p></Link>
  </div>
 </section>
 <SearchBar/>
 <section className="px-6 mt-6 max-w-5xl mx-auto"><Banner/></section>
 <Categories/><FeaturedProducts/>
 <section className="px-6 max-w-5xl mx-auto"><div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex gap-4 items-center"><div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-2xl">⚡</div><div><h3 className="font-black">Pedido simples e rápido</h3><p className="text-sm text-zinc-400 mt-1">Escolha, confira o carrinho e finalize pelo WhatsApp da Popular.</p></div></div></section>
 <LoyaltyCard/><LocationCard/>
 </main>}