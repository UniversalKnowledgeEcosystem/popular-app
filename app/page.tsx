import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import LoyaltyCard from "./components/LoyaltyCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-28">
      <div className="bg-red-600 text-white text-center p-6 text-3xl font-black">
  TESTE VISUAL PUBLICADO
</div>
      <Header />
      <SearchBar />

      <section className="px-6 mt-6">
        <Banner />
      </section>

      <Categories />
      <FeaturedProducts />
      <LoyaltyCard />
    </main>
  );
}