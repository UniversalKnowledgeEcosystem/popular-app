const produtos = [
  { nome: "X-Burger", preco: "R$ 14,99", emoji: "🍔" },
  { nome: "X-Bacon", preco: "R$ 22,99", emoji: "🥓" },
  { nome: "Batata Frita", preco: "R$ 12,00", emoji: "🍟" },
  { nome: "Sorvete", preco: "R$ 8,99", emoji: "🍦" },
];

export default function Cardapio() {
  return (
    <main className="min-h-screen bg-black text-white p-6 pb-24">
      <h1 className="text-4xl font-bold text-yellow-400">
        Cardápio
      </h1>

      <div className="mt-8 space-y-4">
        {produtos.map((produto) => (
          <div
            key={produto.nome}
            className="bg-zinc-900 rounded-2xl p-5 flex items-center justify-between"
          >
            <div>
              <div className="text-4xl">{produto.emoji}</div>
              <h2 className="text-xl font-bold mt-2">{produto.nome}</h2>
              <p className="text-zinc-400">{produto.preco}</p>
            </div>

            <button className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold">
              Pedir
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}