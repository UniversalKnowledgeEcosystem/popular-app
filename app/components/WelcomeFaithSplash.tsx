"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "popular_abertura_fe_v2";
const mensagens = [
  { texto: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele.", ref: "Salmos 118:24" },
  { texto: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.", ref: "Salmos 37:5" },
  { texto: "O Senhor é o meu pastor; nada me faltará.", ref: "Salmos 23:1" },
  { texto: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4:13" },
  { texto: "Confia no Senhor de todo o teu coração.", ref: "Provérbios 3:5" },
];

export default function WelcomeFaithSplash() {
  const [aberto, setAberto] = useState(false);
  const [mensagem, setMensagem] = useState(mensagens[0]);

  useEffect(() => {
    let timer: number | undefined;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === "1") return;
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}

    const hoje = new Date();
    const indice = Math.abs(hoje.getFullYear() * 372 + (hoje.getMonth() + 1) * 31 + hoje.getDate()) % mensagens.length;
    setMensagem(mensagens[indice]);
    setAberto(true);
    timer = window.setTimeout(() => setAberto(false), 3000);
    return () => { if (timer) window.clearTimeout(timer); };
  }, []);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-zinc-950 flex items-center justify-center p-6 overflow-y-auto" role="dialog" aria-modal="true" aria-label="Mensagem de fé de boas-vindas">
      <div className="w-full max-w-sm text-center py-6">
        <img
          src="/mascote%20oficial%20novo.png"
          alt="Mascote oficial da Popular"
          className="mx-auto h-40 max-w-full w-auto object-contain"
        />
        <p className="mt-3 text-yellow-400 text-xs font-black tracking-[0.22em]">MOMENTO DE FÉ</p>
        <p className="mt-4 text-xl leading-relaxed font-bold text-white">“{mensagem.texto}”</p>
        <p className="mt-3 text-yellow-400 font-black">{mensagem.ref}</p>
        <p className="mt-4 text-sm text-zinc-400">Que Deus abençoe o seu dia. 🙏</p>
        <button type="button" onClick={() => setAberto(false)} className="mt-5 px-5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-300">Entrar agora</button>
      </div>
    </div>
  );
}
