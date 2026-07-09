
import LoyaltyCard from "./components/LoyaltyCard";
import FeaturedProducts from "./components/FeaturedProducts";
import Categories from "./components/Categories";
import DeliveryBar from "./components/DeliveryBar";
import BottomNavigation from "./components/BottomNavigation";
import SearchBar from "./components/SearchBar";
import Banner from "./components/Banner";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-24">
      <section className="px-6 pt-8 text-center">
        <Image
          src="/logo.png"
          alt="Popular"
          width={170}
          height={170}
          className="mx-auto rounded-full shadow-2xl"
          priority
        />

        <DeliveryBar />

        <p className="text-zinc-300 mt-3">
          Hambúrgueria & Sorveteria
        </p>

        <h1 className="text-4xl font-extrabold mt-8">
          Bem-vindo à Popular
        </h1>

        <p className="mt-3 text-zinc-400">
          O melhor hambúrguer da cidade com vantagens exclusivas.
        </p>

        <SearchBar />
      </section>

      <section className="px-6 mt-8">
  <Banner />
</section>

<Categories />

<FeaturedProducts />

<LoyaltyCard />

<BottomNavigation />
    </main>
  );
}