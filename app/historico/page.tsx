const pedidos = [
  {
    numero: "#1021",
    data: "08/07/2026",
    total: "R$ 46,90",
    status: "Entregue",
  },
  {
    numero: "#1018",
    data: "04/07/2026",
    total: "R$ 62,80",
    status: "Entregue",
  },
  {
    numero: "#1012",
    data: "28/06/2026",
    total: "R$ 35,90",
    status: "Entregue",
  },
];

export default function Historico() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 pb-24">
      <h1 className="text-4xl font-black text-yellow-400">
        📜 Histórico
      </h1>

      <div className="mt-8 space-y-4">
        {pedidos.map((pedido) => (
          <div
            key={pedido.numero}
            className="bg-zinc-900 rounded-3xl p-5"
          >
            <div className="flex justify-between">
              <h2 className="font-bold">{pedido.numero}</h2>
              <span className="text-yellow-400">
                {pedido.total}
              </span>
            </div>

            <p className="text-zinc-400 mt-2">
              {pedido.data}
            </p>

            <p className="mt-2 text-green-400">
              {pedido.status}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}