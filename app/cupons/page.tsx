const cupons = [
  { nome: "POPULAR10", descricao: "10% de desconto no pedido" },
  { nome: "SORVETE5", descricao: "R$ 5,00 off em sorvetes" },
  { nome: "FRETEGRATIS", descricao: "Entrega grátis acima de R$ 40" },
];

export default function Cupons() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-16">
      <h1 className="text-4xl font-black text-yellow-400 text-center">
        🎁 Cupons
      </h1>

      <div className="max-w-4xl mx-auto mt-12 grid gap-6">
        {cupons.map((cupom) => (
          <div
            key={cupom.nome}
            className="bg-zinc-900 rounded-2xl p-6 flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-bold">{cupom.nome}</h2>
              <p className="text-zinc-400">{cupom.descricao}</p>
            </div>

            <button className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold">
              Usar
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}