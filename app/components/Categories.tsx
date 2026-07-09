import CategoryCard from "./CategoryCard";
import { categories } from "../../data/categories";

export default function Categories() {
  return (
    <section className="px-6 mt-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-black">
          Categorias
        </h2>

        <button className="text-yellow-400 font-bold">
          Ver todas
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            titulo={category.titulo}
            emoji={category.emoji}
            href={category.href}
          />
        ))}
      </div>
    </section>
  );
}