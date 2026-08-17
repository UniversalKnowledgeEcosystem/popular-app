import Link from "next/link";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import LoyaltyCard from "./components/LoyaltyCard";
import LocationCard from "./components/LocationCard";
import StoreStatus from "./components/StoreStatus";
import BiblicalWelcome from "./components/BiblicalWelcome";
import WordOfDay from "./components/WordOfDay";

export default function Home(){return <main className="min-h-screen bg-zinc-950 text-white pb-32">
 <BiblicalWelcome/>
 <Header/>
 <StoreStatus/>
 <WordOfDay/>
 <section className="px-6 mt-5 max-w-5xl mx-auto">
  <div className="grid grid-cols-2 gap-3">
   <Link href="/cardapio" className="popular-primary col-span-2 rounded-3xl p-5 flex items-center justify-between shadow-xl active:scale-[.99] transition"><div><p className="text-xs font-black uppercase opacity-60">Bateu a fome?</p><h2 className="text-2xl font-black">🍔 Fazer pedido</h2><p className="text-sm font-semibold mt-1">Personalize seu lanche em poucos toques</p></div><span className="text-3xl">→</span></Link>
   <Link href="/fidelidade" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"><span className="text-2xl">⭐</span><h3 className="font-black mt-2">Clube Popular</h3><p className="text-xs text-zinc-400 mt-1">Selos, prêmio e progresso</p></Link>
   <Link href="/biblioteca/pedidos" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"><span className="text-2xl">🔁</span><h3 className="font-black mt-2">Meus pedidos</h3><p className="text-xs text-zinc-400 mt-1">Acompanhe e consulte anteriores</p></Link>
  </div>
 </section>
 <SearchBar/>
 <section className="px-6 mt-6 max-w-5xl mx-auto"><Banner/></section>
 <Categories/><FeaturedProducts/>
 <section className="px-6 max-w-5xl mx-auto"><div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex gap-4 items-center"><div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-2xl">⚡</div><div><h3 className="font-black">Mais rápido a cada pedido</h3><p className="text-sm text-zinc-400 mt-1">Favoritos, dados salvos no aparelho, personalização e acompanhamento automático.</p></div></div></section>
 <LoyaltyCard/><LocationCard/>
 <footer className="px-6 mt-8 max-w-5xl mx-auto text-center"><div className="border-t border-zinc-900 pt-5"><p className="text-xs text-zinc-600">Popular Hambúrgueria e Sorveteria • Since 2017</p></div></footer>
 </main>}
