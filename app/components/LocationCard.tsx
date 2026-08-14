"use client";

import { MapPin, Navigation } from "lucide-react";

const ENDERECO = "Rua B, nº 26 - Morais 1, Rio Pardo de Minas - MG";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO)}`;

export default function LocationCard() {
  return (
    <section className="px-6 mt-7">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center shrink-0">
            <MapPin size={25} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-yellow-400 text-xs font-black uppercase tracking-wide">Onde estamos</p>
            <h2 className="text-xl font-black mt-1">Popular Hambúrgueria e Sorveteria</h2>
            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">{ENDERECO}</p>
          </div>
        </div>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 w-full bg-yellow-400 text-black py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-[.98] transition"
        >
          <Navigation size={19} />
          Abrir rota no Google Maps
        </a>

        <p className="text-center text-xs text-zinc-500 mt-3">
          Toque para abrir a localização e iniciar a rota pelo celular.
        </p>
      </div>
    </section>
  );
}
