type Props = {
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
};

export default function ProductCard({
  nome,
  descricao,
  preco,
  imagem,
}: Props) {
  return (
    <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl hover:scale-[1.02] transition-all duration-300">

      <div className="relative">
        <img
          src={imagem}
          alt={nome}
          className="w-full h-56 object-cover"
        />

        <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          MAIS VENDIDO
        </span>

        <span className="absolute top-3 right-3 bg-black/70 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
          ⭐ 4.9
        </span>
      </div>

      <div className="p-5">

        <h2 className="text-2xl font-black">
          {nome}
        </h2>

        <p className="text-zinc-400 mt-2">
          {descricao}
        </p>

        <div className="flex items-center justify-between mt-6">

          <div>
            <p className="text-zinc-500 text-sm">
              A partir de
            </p>

            <p className="text-yellow-400 text-3xl font-black">
              {preco}
            </p>
          </div>

          <button className="bg-yellow-400 text-black w-14 h-14 rounded-full text-3xl font-black hover:scale-110 transition">
            +
          </button>

        </div>

      </div>

    </div>
  );
}