import CategoryCard from "./CategoryCard";

export default function Categories() {
  return (
    <section className="px-6 mt-8">
      <h2 className="text-2xl font-bold mb-5">Categorias</h2>

      <div className="grid grid-cols-2 gap-4">
        <CategoryCard titulo="Hambúrgueres" emoji="🍔" href="/cardapio" />
        <CategoryCard titulo="Sorvetes" emoji="🍦" href="/sorvetes" />
        <CategoryCard titulo="Bebidas" emoji="🥤" href="/bebidas" />
        <CategoryCard titulo="Promoções" emoji="🔥" href="/promocoes" />
      </div>
    </section>
  );
}