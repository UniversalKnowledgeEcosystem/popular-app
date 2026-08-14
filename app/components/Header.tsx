"use client";

import Image from "next/image";
import { Bell, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

function obterSaudacao() {
  const hora = Number(
    new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      hour12: false,
    }).format(new Date())
  );

  if (hora >= 5 && hora < 12) return "Bom dia ☀️";
  if (hora >= 12 && hora < 18) return "Boa tarde 👋";
  return "Boa noite 🌙";
}

export default function Header() {
  const [saudacao, setSaudacao] = useState("");

  useEffect(() => {
    const atualizar = () => setSaudacao(obterSaudacao());
    atualizar();
    const intervalo = window.setInterval(atualizar, 60_000);
    return () => window.clearInterval(intervalo);
  }, []);

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
            <p className="text-sm text-zinc-400 min-h-5">{saudacao}</p>
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
