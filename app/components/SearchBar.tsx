export default function SearchBar() {
  return (
    <div className="px-6 mt-6">
      <div className="flex items-center bg-zinc-900 rounded-2xl px-5 py-4 border border-zinc-800 shadow-lg">

        <span className="text-2xl mr-3">🔍</span>

        <input
          type="text"
          placeholder="O que você deseja comer hoje?"
          className="bg-transparent outline-none w-full text-white placeholder:text-zinc-500"
        />

      </div>
    </div>
  );
}