export default function Perfil() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-16">

      <div className="max-w-xl mx-auto bg-zinc-900 rounded-3xl p-8">

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-yellow-400 flex items-center justify-center text-5xl">
            👤
          </div>

          <h1 className="mt-6 text-3xl font-black">
            Italo Carmo Patricio
          </h1>

          <p className="text-zinc-400">
            Cliente Premium
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-10">

          <div className="bg-zinc-800 rounded-2xl p-5 text-center">
            <h2 className="text-yellow-400 text-3xl font-black">
              275
            </h2>

            <p>Pontos</p>
          </div>

          <div className="bg-zinc-800 rounded-2xl p-5 text-center">
            <h2 className="text-green-400 text-3xl font-black">
              R$ 18
            </h2>

            <p>Cashback</p>
          </div>

        </div>

        <button className="w-full mt-10 bg-yellow-400 text-black py-4 rounded-xl font-bold">
          Editar Perfil
        </button>

      </div>

    </main>
  );
}