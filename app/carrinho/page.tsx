const itens = [
  { nome: "Popular Bacon", preco: "R$ 34,90", quantidade: 1 },
  { nome: "Batata Frita", preco: "R$ 12,00", quantidade: 1 },
];

export default function Carrinho() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 pb-24">
      <h1 className="text-4xl font-black text-yellow-400">
        🛒 Carrinho
      </h1>

      <div className="mt-8 space-y-4">
        {itens.map((item) => (
          <div
            key={item.nome}
            className="bg-zinc-900 rounded-3xl p-5 flex justify-between"
          >
            <div>
              <h2 className="text-xl font-bold">{item.nome}</h2>
              <p className="text-zinc-400">Qtd: {item.quantidade}</p>
            </div>

            <strong className="text-yellow-400">{item.preco}</strong>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-zinc-900 rounded-3xl p-6">
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span className="text-yellow-400">R$ 46,90</span>
        </div>

        <button className="mt-6 w-full bg-yellow-400 text-black py-4 rounded-2xl font-black">
          Finalizar Pedido
        </button>
      </div>
    </main>
  );
}