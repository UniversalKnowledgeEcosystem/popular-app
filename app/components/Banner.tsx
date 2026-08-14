export default function Banner() {
  return (
    <div className="relative h-52 overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 shadow-2xl">
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex h-full flex-col justify-center px-8">
        <span className="w-fit rounded-full bg-white px-3 py-1 text-sm font-black text-red-600">
          🔥 PROMOÇÃO
        </span>

        <h2 className="mt-4 text-4xl font-black leading-tight text-white">
          Big Duplo
        </h2>

        <p className="mt-2 text-lg text-white/90">
          2 carnes, queijo, bacon e molho especial.
        </p>

        <button className="mt-5 w-fit rounded-full bg-white px-6 py-3 font-black text-red-600 transition hover:scale-105">
          Pedir Agora →
        </button>
      </div>
    </div>
  );
}
