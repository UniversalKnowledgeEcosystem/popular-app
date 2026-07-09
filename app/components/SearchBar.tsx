import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="px-6 mt-5">
      <div className="flex items-center bg-zinc-900 rounded-2xl px-4 py-4">

        <Search className="text-zinc-500" size={22} />

        <input
          type="text"
          placeholder="Pesquisar hambúrguer, sorvete..."
          className="bg-transparent ml-3 w-full outline-none text-white placeholder:text-zinc-500"
        />

      </div>
    </div>
  );
}