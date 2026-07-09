export default function Fidelidade() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 pb-24">

      <h1 className="text-4xl font-black text-yellow-400">
        ⭐ Fidelidade
      </h1>

      <p className="text-zinc-400 mt-2">
        Ganhe pontos em todas as compras.
      </p>

      <div className="mt-8 bg-zinc-900 rounded-3xl p-6">

        <p className="text-zinc-400">
          Seus Pontos
        </p>

        <h2 className="text-6xl font-black text-yellow-400 mt-2">
          120
        </h2>

        <div className="w-full bg-zinc-700 rounded-full h-4 mt-6">

          <div className="bg-yellow-400 h-4 rounded-full w-3/4"></div>

        </div>

        <p className="mt-4 text-zinc-400">
          Faltam apenas
          <span className="text-yellow-400 font-bold">
            {" "}30 pontos{" "}
          </span>
          para ganhar um hambúrguer grátis.
        </p>

      </div>

      <div className="mt-8 bg-zinc-900 rounded-3xl p-6">

        <h3 className="text-2xl font-bold">
          🎁 Próxima recompensa
        </h3>

        <p className="text-zinc-400 mt-3">
          X-Burger Tradicional
        </p>

      </div>

    </main>
  );
}