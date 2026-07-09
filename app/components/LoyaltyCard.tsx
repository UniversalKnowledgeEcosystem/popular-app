export default function LoyaltyCard() {
  return (
    <section className="px-6 mt-8">
      <div className="rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-black shadow-xl">

        <p className="font-bold">
          ⭐ Clube Popular
        </p>

        <h2 className="text-4xl font-black mt-2">
          120 Pontos
        </h2>

        <p className="mt-3">
          Faltam apenas <strong>30 pontos</strong> para ganhar um hambúrguer grátis.
        </p>

        <div className="w-full bg-yellow-200 rounded-full h-3 mt-6">
          <div className="bg-black h-3 rounded-full w-3/4"></div>
        </div>

      </div>
    </section>
  );
}