"use client";

import { useEffect, useState } from "react";

const DISMISSED_KEY = "popular_ios_install_hint_dismissed_v1";

function isIOS() {
  if (typeof window === "undefined") return false;
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true;
}

export default function IOSInstallHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isIOS() || isStandalone()) return;

    try {
      if (window.localStorage.getItem(DISMISSED_KEY) === "1") return;
    } catch {}

    const timer = window.setTimeout(() => setVisible(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-[9998] mx-auto max-w-md rounded-2xl border border-yellow-400/30 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <img
          src="/mascote%20oficial%20novo.png?v=20260830-pwa"
          alt="Popular"
          className="h-12 w-12 shrink-0 rounded-xl object-contain bg-zinc-900"
        />
        <div className="min-w-0 flex-1">
          <p className="font-black text-white">Instale o app da Popular</p>
          <p className="mt-1 text-sm leading-5 text-zinc-300">
            No Safari, toque em <strong className="text-white">Compartilhar</strong> e depois em <strong className="text-white">Adicionar à Tela de Início</strong>.
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Fechar aviso de instalação"
          className="rounded-lg px-2 py-1 text-lg leading-none text-zinc-400 hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
}
