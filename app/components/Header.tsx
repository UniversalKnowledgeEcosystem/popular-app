import Image from "next/image";
import { Bell, MapPin } from "lucide-react";

export default function Header() {
  return (
    <header className="px-6 pt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Popular"
            width={68}
            height={68}
            className="rounded-2xl shadow-xl"
            priority
          />

          <div>
            <p className="text-sm text-zinc-400">Boa noite 👋</p>
            <h1 className="text-2xl font-black">Popular</h1>

            <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
              <MapPin size={15} />
              Rio Pardo de Minas
            </div>
          </div>
        </div>

        <button className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <Bell size={22} className="text-yellow-400" />
        </button>
      </div>
    </header>
  );
}