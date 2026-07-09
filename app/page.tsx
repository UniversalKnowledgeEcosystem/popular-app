import Banner from "./components/Banner";
import BottomNavigation from "./components/BottomNavigation";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import LoyaltyCard from "./components/LoyaltyCard";
import SearchBar from "./components/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-28">
      <header className="px-6 pt-8">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Popular"
            width={72}
            height={72}
            className="rounded-full shadow-xl"
            priority
          />

          <div>
            <p className="text-sm text-zinc-400">
              Boa noite 👋
            </p>

            <h1 className="text-2xl font-black">
              Popular
            </h1>

            <p className="text-sm text-yellow-400">
              📍 Rio Pardo de Minas - MG
            </p>
          </div>
        </div>
      </header>

      <SearchBar />

      <section className="px-6 mt-6">
        <Banner />
      </section>

      <Categories />

      <FeaturedProducts />

      <LoyaltyCard />

      <BottomNavigation />
    </main>
  );
}