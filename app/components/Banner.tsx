export default function Banner() {
  return (
    <div className="relative overflow-hidden rounded-3xl h-52 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 shadow-2xl">

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 h-full flex flex-col justify-center px-8">

        <span className="bg-white text-red-600 font-black px-3 py-1 rounded-full w-fit text-sm">
          🔥 PROMOÇÃO
        </span>

        <h2 className="text-4xl font-black text-white mt-4 leading-tight">
          Big Duplo
        </h2>

        <p className="text-white/90 mt-2 text-lg">
          2 carnes, queijo, bacon e molho especial.
        </p>

        <button className="mt-5 bg-white text-red-600 font-black px-6 py-3 rounded-full w-fit hover:scale-105 transition">
          Pedir Agora →
        </button>

      </div>

    </div>
  );
}