import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import LoyaltyCard from "./components/LoyaltyCard";
import LocationCard from "./components/LocationCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-28">
      <Header />

      <SearchBar />

      <section className="px-6 mt-6">
        <Banner />
      </section>

      <Categories />

      <FeaturedProducts />

      <LoyaltyCard />

      <LocationCard />
    </main>
  );
}
