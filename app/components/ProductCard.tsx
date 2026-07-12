type Props = {
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  onAdd: () => void;
};

export default function ProductCard({
  nome,
  descricao,
  preco,
  imagem,
  onAdd,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl">
      <div className="relative">
        <img
          src={imagem}
          alt={nome}
          className="h-56 w-full object-cover"
        />

        <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
          MAIS VENDIDO
        </span>

        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-sm font-bold text-yellow-400">
          ⭐ 4.9
        </span>
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-black">{nome}</h2>

        <p className="mt-2 text-zinc-400">{descricao}</p>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">A partir de</p>
            <p className="text-3xl font-black text-yellow-400">
              {preco}
            </p>
          </div>

          <button
            type="button"
            onClick={onAdd}
            className="h-14 w-14 rounded-full bg-yellow-400 text-3xl font-black text-black active:scale-95"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}