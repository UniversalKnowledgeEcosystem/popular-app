export default function Login() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-zinc-900 rounded-3xl p-8">

        <h1 className="text-4xl font-black text-yellow-400 text-center">
          Entrar
        </h1>

        <p className="text-center text-zinc-400 mt-2">
          Acesse sua conta Popular
        </p>

        <input
          type="email"
          placeholder="E-mail"
          className="w-full mt-8 p-4 rounded-xl bg-zinc-800 outline-none"
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full mt-4 p-4 rounded-xl bg-zinc-800 outline-none"
        />

        <button className="w-full mt-6 bg-yellow-400 text-black py-4 rounded-xl font-bold hover:bg-yellow-300 transition">
          Entrar
        </button>

        <button className="w-full mt-4 border border-zinc-700 py-4 rounded-xl hover:bg-zinc-800 transition">
          Criar Conta
        </button>

      </div>

    </main>
  );
}