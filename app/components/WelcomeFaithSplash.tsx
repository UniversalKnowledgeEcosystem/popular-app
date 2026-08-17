"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "popular_abertura_fe_v1";

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
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
      const hoje = new Date();
      const indice = (hoje.getFullYear() * 372 + (hoje.getMonth() + 1) * 31 + hoje.getDate()) % mensagens.length;
      setMensagem(mensagens[indice]);
      setAberto(true);
      const timer = window.setTimeout(() => setAberto(false), 2800);
      return () => window.clearTimeout(timer);
    } catch {
      setAberto(true);
      const timer = window.setTimeout(() => setAberto(false), 2800);
      return () => window.clearTimeout(timer);
    }
  }, []);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-zinc-950 flex items-center justify-center p-6" role="dialog" aria-label="Mensagem de fé de boas-vindas">
      <div className="w-full max-w-sm text-center animate-in fade-in duration-500">
        <img src="/mascote.png" alt="Mascote da Popular" className="mx-auto h-40 w-auto object-contain" />
        <p className="mt-4 text-yellow-400 text-xs font-black tracking-[0.22em]">MOMENTO DE FÉ</p>
        <p className="mt-4 text-xl leading-relaxed font-bold text-white">“{mensagem.texto}”</p>
        <p className="mt-3 text-yellow-400 font-black">{mensagem.ref}</p>
        <p className="mt-5 text-sm text-zinc-400">Que Deus abençoe o seu dia. 🙏</p>
        <button onClick={() => setAberto(false)} className="mt-6 text-xs text-zinc-500 underline underline-offset-4">Entrar agora</button>
      </div>
    </div>
  );
}
