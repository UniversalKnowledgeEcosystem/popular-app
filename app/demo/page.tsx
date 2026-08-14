import Link from "next/link";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import LoyaltyCard from "../components/LoyaltyCard";
import LocationCard from "../components/LocationCard";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-28">
      <div className="sticky top-0 z-40 bg-yellow-400 text-black px-4 py-2 text-center text-xs font-black shadow-lg">
        MODO DEMONSTRAÇÃO • veja o app sem precisar entrar
      </div>
      <Header />
      <SearchBar />
      <section className="px-6 mt-6"><Banner /></section>
      <Categories />
      <FeaturedProducts />
      <LoyaltyCard />
      <LocationCard />
      <section className="px-6 mt-6">
        <Link href="/cardapio" className="block w-full rounded-2xl bg-yellow-400 text-black text-center py-4 font-black text-lg">
          🍔 Abrir cardápio e testar
        </Link>
        <p className="text-center text-zinc-500 text-xs mt-3">Demonstração para apresentação do aplicativo.</p>
      </section>
    </main>
  );
}
