const cards = [
  { titulo: "Pedidos hoje", valor: "28" },
  { titulo: "Faturamento", valor: "R$ 1.248,90" },
  { titulo: "Clientes", valor: "342" },
  { titulo: "Cupons ativos", valor: "5" },
];

export default function Admin() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 pb-24">
      <h1 className="text-4xl font-black text-yellow-400">
        👨‍💼 Painel Admin
      </h1>

      <div className="grid grid-cols-2 gap-4 mt-8">
        {cards.map((card) => (
          <div key={card.titulo} className="bg-zinc-900 rounded-3xl p-5">
            <p className="text-zinc-400">{card.titulo}</p>
            <h2 className="text-3xl font-black mt-2">{card.valor}</h2>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        <button className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-black">
          Gerenciar Cardápio
        </button>

        <button className="w-full bg-zinc-900 py-4 rounded-2xl font-bold">
          Ver Pedidos
        </button>

        <button className="w-full bg-zinc-900 py-4 rounded-2xl font-bold">
          Clientes e Pontos
        </button>
      </div>
    </main>
  );
}