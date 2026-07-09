export default function Cadastro() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-zinc-900 rounded-3xl p-8">

        <h1 className="text-4xl font-black text-yellow-400 text-center">
          Criar Conta
        </h1>

        <input
          type="text"
          placeholder="Nome Completo"
          className="w-full mt-8 p-4 rounded-xl bg-zinc-800 outline-none"
        />

        <input
          type="email"
          placeholder="E-mail"
          className="w-full mt-4 p-4 rounded-xl bg-zinc-800 outline-none"
        />

        <input
          type="tel"
          placeholder="WhatsApp"
          className="w-full mt-4 p-4 rounded-xl bg-zinc-800 outline-none"
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full mt-4 p-4 rounded-xl bg-zinc-800 outline-none"
        />

        <button className="w-full mt-6 bg-yellow-400 text-black py-4 rounded-xl font-bold">
          Criar Conta
        </button>

      </div>

    </main>
  );
}