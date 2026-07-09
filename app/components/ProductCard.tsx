type Props = {
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
};

export default function ProductCard({ nome, descricao, preco, imagem }: Props) {
  return (
    <div className="bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-zinc-800">
      <div className="relative">
        <img src={imagem} alt={nome} className="w-full h-56 object-cover" />

        <div className="absolute top-4 left-4 bg-black/70 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
          ⭐ 4.9
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-black text-white">{nome}</h2>

        <p className="text-zinc-400 mt-2 leading-6">{descricao}</p>

        <div className="flex justify-between items-center mt-6">
          <span className="text-yellow-400 text-3xl font-black">{preco}</span>

          <button className="bg-yellow-400 hover:bg-yellow-300 text-black w-12 h-12 rounded-full font-black text-2xl transition active:scale-95">
            +
          </button>
        </div>
      </div>
    </div>
  );
}