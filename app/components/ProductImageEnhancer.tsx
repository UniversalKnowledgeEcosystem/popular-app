"use client";

import { useEffect } from "react";

const imagens: Record<string, string> = {
  "Misto Quente": "/hamburguer 1.png",
  "Misto Especial": "/hamburguer 2.png",
  "X-Burguer": "/hamburguer 3.png",
  "X-Salada": "/hamburguer 4.png",
  "X-Frango": "/hamburguer 5.png",
  "X-Delícia": "/hamburguer 6.png",
  "Big Salada": "/hamburguer 7.png",
  "X-Bacon": "/hamburguer 8.png",
  "Big Frango": "/hamburguer 9.png",
  "X Tudo": "/hamburguer 10.png",
  "Big Popular": "/hamburguer 11.png",
  "Big Fome": "/hamburguer 12.png",
  "Big Duplo": "/hamburguer 13.png",
};

export default function ProductImageEnhancer() {
  useEffect(() => {
    const aplicar = () => {
      document.querySelectorAll("article").forEach((card) => {
        const titulo = card.querySelector("h3")?.textContent?.trim();
        if (!titulo || !imagens[titulo]) return;
        const area = card.querySelector("h3")?.parentElement?.previousElementSibling as HTMLElement | null;
        if (!area || area.dataset.lancheImagem === titulo) return;
        area.dataset.lancheImagem = titulo;
        area.innerHTML = "";
        const img = document.createElement("img");
        img.src = imagens[titulo];
        img.alt = titulo;
        img.loading = "lazy";
        img.decoding = "async";
        img.className = "w-full h-32 object-contain scale-110 drop-shadow-[0_8px_10px_rgba(0,0,0,.55)]";
        img.onerror = () => { area.dataset.lancheImagem = ""; };
        area.appendChild(img);
      });
    };
    aplicar();
    const observer = new MutationObserver(aplicar);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}
