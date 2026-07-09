export default function Checkout() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 pb-24">
      <h1 className="text-4xl font-black text-yellow-400">
        💳 Finalizar Pedido
      </h1>

      <div className="mt-8 space-y-5">
        <div className="bg-zinc-900 rounded-3xl p-6">
          <h2 className="text-xl font-bold">Endereço</h2>
          <p className="text-zinc-400 mt-2">
            Rua B, nº 26 - Morais 1
          </p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6">
          <h2 className="text-xl font-bold">Pagamento</h2>
          <p className="text-zinc-400 mt-2">
            Pix, dinheiro ou cartão na entrega.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6">
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-yellow-400">R$ 46,90</span>
          </div>
        </div>

        <button className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-black">
          Confirmar Pedido
        </button>
      </div>
    </main>
  );
}