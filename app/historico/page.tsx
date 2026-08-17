const pedidos = [
  {
    numero: "#1021",
    data: "08/07/2026",
    status: "Entregue",
  },
  {
    numero: "#1018",
    data: "04/07/2026",
    status: "Entregue",
  },
  {
    numero: "#1012",
    data: "28/06/2026",
    status: "Entregue",
  },
];

export default function Historico() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 pb-24">
      <h1 className="text-4xl font-black text-yellow-400">
        📜 Histórico
      </h1>
      <p className="text-zinc-400 mt-2">Consulte seus pedidos anteriores e peça novamente quando quiser.</p>

      <div className="mt-8 space-y-4">
        {pedidos.map((pedido) => (
          <div
            key={pedido.numero}
            className="bg-zinc-900 rounded-3xl p-5"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-bold">{pedido.numero}</h2>
              <span className="text-green-400 font-bold">✓ {pedido.status}</span>
            </div>

            <p className="text-zinc-400 mt-2">
              {pedido.data}
            </p>

            <button className="w-full mt-4 bg-yellow-400 text-black py-3 rounded-xl font-black">
              🔁 Pedir novamente
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}