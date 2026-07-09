const promocoes = [
  {
    titulo: "Combo da Semana",
    descricao: "X-Burger + Batata + Refri",
    preco: "R$ 29,90",
  },
  {
    titulo: "Sorvete em Dobro",
    descricao: "Compre 1 casquinha e ganhe outra",
    preco: "Hoje",
  },
];

export default function Promocoes() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 pb-24">
      <h1 className="text-4xl font-black text-yellow-400">
        🔥 Promoções
      </h1>

      <div className="mt-8 space-y-5">
        {promocoes.map((promo) => (
          <div
            key={promo.titulo}
            className="rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-6"
          >
            <h2 className="text-3xl font-black">{promo.titulo}</h2>
            <p className="mt-2">{promo.descricao}</p>
            <p className="mt-4 text-2xl font-black">{promo.preco}</p>
          </div>
        ))}
      </div>
    </main>
  );
}