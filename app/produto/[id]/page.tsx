import Image from "next/image";

const adicionais = [
  { nome: "Bacon extra", preco: "+ R$ 5,00" },
  { nome: "Cheddar extra", preco: "+ R$ 4,00" },
  { nome: "Hambúrguer extra", preco: "+ R$ 8,00" },
];

export default function Produto() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-24">
      <Image
        src="/burgers/bacon.jpg"
        alt="Popular Bacon"
        width={800}
        height={500}
        className="w-full h-72 object-cover"
      />

      <div className="p-6">
        <h1 className="text-4xl font-black">Popular Bacon</h1>

        <p className="text-zinc-400 mt-4">
          Hambúrguer artesanal, cheddar, bacon crocante e molho especial.
        </p>

        <h2 className="text-yellow-400 text-4xl font-black mt-8">
          R$ 34,90
        </h2>

        <h3 className="text-2xl font-bold mt-10 mb-4">
          Adicionais
        </h3>

        <div className="space-y-4">
          {adicionais.map((item) => (
            <div
              key={item.nome}
              className="bg-zinc-900 rounded-2xl p-5 flex justify-between items-center"
            >
              <div>
                <h4 className="font-bold">{item.nome}</h4>
                <p className="text-yellow-400">{item.preco}</p>
              </div>

              <button className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                +
              </button>
            </div>
          ))}
        </div>

        <button className="w-full mt-10 bg-yellow-400 text-black py-4 rounded-2xl font-black">
          Adicionar ao Carrinho
        </button>
      </div>
    </main>
  );
}