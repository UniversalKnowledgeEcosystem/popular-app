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
    <div className="bg-zinc-900 rounded-3xl overflow-hidden shadow-xl">
      <img
        src={imagem}
        alt={nome}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold text-white">
          {nome}
        </h2>

        <p className="text-zinc-400 mt-2">
          {descricao}
        </p>

        <div className="flex justify-between items-center mt-6">
          <span className="text-yellow-400 text-2xl font-black">
            {preco}
          </span>

          <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}