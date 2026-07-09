const etapas = [
  "Pedido recebido",
  "Preparando",
  "Saiu para entrega",
  "Entregue",
];

export default function StatusPedido() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 pb-24">
      <h1 className="text-4xl font-black text-yellow-400">
        📦 Status do Pedido
      </h1>

      <p className="text-zinc-400 mt-2">
        Pedido #1021
      </p>

      <div className="mt-10 space-y-5">
        {etapas.map((etapa, index) => (
          <div
            key={etapa}
            className="bg-zinc-900 rounded-2xl p-5 flex items-center gap-4"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                index <= 1
                  ? "bg-yellow-400 text-black"
                  : "bg-zinc-700 text-zinc-400"
              }`}
            >
              {index + 1}
            </div>

            <span className={index <= 1 ? "text-white" : "text-zinc-500"}>
              {etapa}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}