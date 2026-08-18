"use client";

import { useEffect, useMemo, useState } from "react";

type Difficulty = { label: string; size: number; desc: string; tone: string; iconTone: string };
type Story = { title: string; ref: string; image: string; message: string; source?: string };
type SaveData = { story: number; difficulty: number; board: number[]; moves: number; hints: number; wins: Record<string, boolean>; bestMoves: Record<string, number> };

const levels: Difficulty[] = [
  { label: "Fácil", size: 3, desc: "Ideal para iniciantes", tone: "border-lime-400 bg-lime-500/10", iconTone: "from-lime-300 to-lime-500" },
  { label: "Médio", size: 4, desc: "Um desafio equilibrado", tone: "border-amber-400 bg-amber-500/10", iconTone: "from-yellow-300 to-amber-500" },
  { label: "Difícil", size: 5, desc: "Para quem gosta de desafios", tone: "border-red-500 bg-red-500/10", iconTone: "from-orange-400 to-red-500" },
];

const stories: Story[] = [
  { title: "Jonas e o grande peixe", ref: "Jonas 2:1–11", image: "/puzzle/jonas-premium.webp", message: "Clame ao Senhor também nos momentos difíceis. Ele ouve a nossa oração." },
  { title: "Arca de Noé", ref: "Gênesis 6–9", image: "https://cdn.pixabay.com/photo/2024/05/18/01/45/noahs-ark-8769320_1280.png", message: "Noé confiou em Deus e permaneceu obediente mesmo quando tudo parecia impossível.", source: "Pixabay" },
  { title: "Davi e Golias", ref: "1 Samuel 17", image: "https://cdn.pixabay.com/photo/2024/04/04/02/09/david-and-goliath-8674177_1280.jpg", message: "A coragem de Davi nasceu de uma fé maior que o gigante que estava diante dele.", source: "Pixabay" },
  { title: "Daniel na cova dos leões", ref: "Daniel 6", image: "https://cdn.pixabay.com/photo/2024/04/12/04/50/daniel-8691083_1280.png", message: "Daniel permaneceu fiel. Deus continua sendo digno da nossa confiança nos dias difíceis.", source: "Pixabay" },
  { title: "Moisés abre o mar", ref: "Êxodo 14", image: "https://cdn.pixabay.com/photo/2023/03/30/01/39/moses-7886649_1280.jpg", message: "Quando não parecia haver saída, Deus abriu um caminho para o seu povo.", source: "Pixabay" },
  { title: "Sermão da montanha", ref: "Mateus 5", image: "https://cdn.pixabay.com/photo/2024/04/28/04/53/jesus-praying-in-the-crowd-8724802_1280.png", message: "As palavras de Jesus nos chamam para uma vida de fé, misericórdia e amor.", source: "Pixabay" },
];

function shuffled(n: number) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (a.every((v, i) => v === i) && n > 1) [a[0], a[1]] = [a[1], a[0]];
  return a;
}

const storageKey = "popular-biblical-puzzle-premium-v1";

export default function BiblicalPuzzle() {
  const [difficulty, setDifficulty] = useState(0);
  const [story, setStory] = useState(0);
  const [board, setBoard] = useState<number[]>(() => shuffled(9));
  const [moves, setMoves] = useState(0);
  const [hints, setHints] = useState(3);
  const [wins, setWins] = useState<Record<string, boolean>>({});
  const [bestMoves, setBestMoves] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [highlight, setHighlight] = useState<number | null>(null);
  const [showReference, setShowReference] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const d = levels[difficulty];
  const s = stories[story];
  const total = d.size * d.size;
  const correct = board.filter((v, i) => v === i).length;
  const progress = Math.round((correct / total) * 100);
  const done = useMemo(() => board.length === total && board.every((v, i) => v === i), [board, total]);
  const winKey = `${story}-${difficulty}`;
  const storyLevels = (si: number) => levels.filter((_, di) => wins[`${si}-${di}`]).length;
  const completedStories = stories.filter((_, si) => storyLevels(si) === levels.length).length;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<SaveData>;
        const si = Number.isInteger(saved.story) && Number(saved.story) >= 0 && Number(saved.story) < stories.length ? Number(saved.story) : 0;
        const di = Number.isInteger(saved.difficulty) && Number(saved.difficulty) >= 0 && Number(saved.difficulty) < levels.length ? Number(saved.difficulty) : 0;
        const expected = levels[di].size ** 2;
        setStory(si);
        setDifficulty(di);
        setBoard(Array.isArray(saved.board) && saved.board.length === expected ? saved.board : shuffled(expected));
        setMoves(Number.isFinite(saved.moves) ? Number(saved.moves) : 0);
        setHints(Number.isFinite(saved.hints) ? Math.max(0, Math.min(3, Number(saved.hints))) : 3);
        if (saved.wins && typeof saved.wins === "object") setWins(saved.wins);
        if (saved.bestMoves && typeof saved.bestMoves === "object") setBestMoves(saved.bestMoves);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: SaveData = { story, difficulty, board, moves, hints, wins, bestMoves };
    try { localStorage.setItem(storageKey, JSON.stringify(payload)); } catch {}
  }, [hydrated, story, difficulty, board, moves, hints, wins, bestMoves]);

  useEffect(() => {
    if (!hydrated || !done) return;
    setWins(prev => prev[winKey] ? prev : { ...prev, [winKey]: true });
    setBestMoves(prev => {
      const old = prev[winKey];
      return old && old <= moves ? prev : { ...prev, [winKey]: moves };
    });
  }, [done, hydrated, winKey, moves]);

  function startGame(diff = difficulty, nextStory = story) {
    const nd = levels[diff];
    setDifficulty(diff);
    setStory(nextStory);
    setBoard(shuffled(nd.size ** 2));
    setMoves(0);
    setHints(3);
    setSelected(null);
    setOver(null);
    setHighlight(null);
    setPaused(false);
    setShowReference(false);
  }

  function swap(a: number, b: number) {
    if (paused || a === b || a < 0 || b < 0 || a >= board.length || b >= board.length) {
      setSelected(null); setOver(null); return;
    }
    const n = [...board];
    [n[a], n[b]] = [n[b], n[a]];
    setBoard(n);
    setMoves(v => v + 1);
    setSelected(null);
    setOver(null);
  }

  function useHint() {
    if (paused || done || hints <= 0) return;
    const wrongPos = board.findIndex((piece, pos) => piece !== pos);
    if (wrongPos < 0) return;
    const piece = board[wrongPos];
    const targetPos = piece;
    const n = [...board];
    [n[wrongPos], n[targetPos]] = [n[targetPos], n[wrongPos]];
    setBoard(n);
    setHints(v => v - 1);
    setHighlight(targetPos);
    window.setTimeout(() => setHighlight(null), 1400);
  }

  function nextStory() { startGame(difficulty, (story + 1) % stories.length); }
  function previousStory() { startGame(difficulty, (story - 1 + stories.length) % stories.length); }

  const loosePieces = board.map((piece, pos) => ({ piece, pos })).filter(x => x.piece !== x.pos).slice(0, 5);

  return (
    <section id="puzzle" className="mt-7 mx-auto max-w-[1080px] overflow-hidden rounded-[28px] border border-[#23313a] bg-[#071116] shadow-[0_24px_80px_rgba(0,0,0,.55)]">
      <div className="px-3 py-5 sm:px-5 sm:py-7">
        <header className="text-center">
          <h2 className="text-[27px] font-black leading-none tracking-[.03em] text-white sm:text-4xl">QUEBRA-CABEÇA BÍBLICO</h2>
          <p className="mt-2 text-[11px] font-black tracking-[.15em] text-amber-400 sm:text-sm">HISTÓRIAS QUE EDIFICAM E DIVERTEM</p>
        </header>

        <div className="mt-5 grid gap-4 min-[620px]:grid-cols-[minmax(0,1.72fr)_minmax(220px,.88fr)]">
          <div className="rounded-[22px] border border-[#25333b] bg-[#091319] p-3 shadow-inner sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <button onClick={previousStory} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-zinc-700 bg-[#0e171c] text-xl font-black">‹</button>
                <img src={s.image} alt="" className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-cyan-400/40 sm:h-12 sm:w-12" />
                <div className="min-w-0">
                  <h3 className="truncate text-[13px] font-black text-white sm:text-base">{s.title}</h3>
                  <p className="text-[11px] font-black text-amber-400 sm:text-sm">{s.ref}</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => setShowReference(true)} className="grid h-10 w-10 place-items-center rounded-full border border-zinc-700 bg-[#0e171c] text-base" aria-label="Referência">▣</button>
                <button onClick={() => startGame()} className="grid h-10 w-10 place-items-center rounded-full border border-zinc-700 bg-[#0e171c] text-lg" aria-label="Embaralhar">↝</button>
              </div>
            </div>

            <div className="relative mt-4 touch-none select-none overflow-hidden rounded-xl border border-[#43515a] bg-black shadow-[0_12px_28px_rgba(0,0,0,.45)]" style={{ display: "grid", gridTemplateColumns: `repeat(${d.size},1fr)`, gap: "1px", aspectRatio: "1 / 1" }}>
              {board.map((piece, pos) => {
                const row = Math.floor(piece / d.size), col = piece % d.size;
                const isCorrect = piece === pos, isHighlight = highlight === pos;
                return <button
                  key={piece}
                  data-puzzle-pos={pos}
                  disabled={paused}
                  draggable
                  onDragStart={() => setSelected(pos)}
                  onDragOver={e => { e.preventDefault(); setOver(pos); }}
                  onDrop={e => { e.preventDefault(); if (selected !== null) swap(selected, pos); }}
                  onDragEnd={() => { setSelected(null); setOver(null); }}
                  onPointerDown={e => { if (paused) return; setSelected(pos); e.currentTarget.setPointerCapture?.(e.pointerId); }}
                  onPointerMove={e => {
                    if (selected === null || paused) return;
                    const el = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-puzzle-pos]") as HTMLElement | null;
                    if (el) setOver(Number(el.dataset.puzzlePos));
                  }}
                  onPointerUp={e => {
                    if (paused) return;
                    const el = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-puzzle-pos]") as HTMLElement | null;
                    if (selected !== null) swap(selected, el ? Number(el.dataset.puzzlePos) : pos);
                  }}
                  onPointerCancel={() => { setSelected(null); setOver(null); }}
                  className={`relative overflow-hidden transition-all duration-150 ${selected === pos ? "z-20 scale-[.94] opacity-70 shadow-2xl" : over === pos ? "z-10 ring-2 ring-amber-300" : isHighlight ? "z-10 ring-4 ring-cyan-300 animate-pulse" : isCorrect ? "ring-1 ring-green-400/90" : "ring-1 ring-black/40"}`}
                  style={{ backgroundImage: `url("${s.image}")`, backgroundSize: `${d.size * 100}% ${d.size * 100}%`, backgroundPosition: `${(col / (d.size - 1)) * 100}% ${(row / (d.size - 1)) * 100}%`, backgroundRepeat: "no-repeat" }}
                >
                  <span className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,.08),inset_0_-8px_18px_rgba(0,0,0,.12)]" />
                  {isCorrect && <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,.95)]" />}
                </button>;
              })}
              {paused && <div className="absolute inset-0 z-30 grid place-items-center bg-black/85 backdrop-blur-sm"><div className="text-center"><div className="text-4xl">Ⅱ</div><b className="mt-2 block text-xl">Jogo pausado</b><button onClick={() => setPaused(false)} className="mt-4 rounded-xl bg-amber-400 px-6 py-3 font-black text-black">CONTINUAR</button></div></div>}
            </div>

            <div className="mt-3 flex min-h-[72px] items-center justify-center gap-2 rounded-2xl bg-black/20 px-2 py-3 sm:gap-4">
              {(loosePieces.length ? loosePieces : board.slice(0, 5).map((piece, pos) => ({ piece, pos }))).map(({ piece, pos }, i) => {
                const row = Math.floor(piece / d.size), col = piece % d.size;
                return <button key={`${piece}-${i}`} onClick={() => { setHighlight(pos); window.setTimeout(() => setHighlight(null), 1000); }} className="relative h-12 w-12 shrink-0 drop-shadow-xl sm:h-14 sm:w-14" style={{ transform: `rotate(${[-8, 5, -4, 7, -6][i % 5]}deg)`, clipPath: "polygon(10% 0,38% 0,38% 13%,62% 13%,62% 0,90% 0,100% 10%,100% 38%,87% 38%,87% 62%,100% 62%,100% 90%,90% 100%,62% 100%,62% 87%,38% 87%,38% 100%,10% 100%,0 90%,0 62%,13% 62%,13% 38%,0 38%,0 10%)", backgroundImage: `url("${s.image}")`, backgroundSize: `${d.size * 100}% ${d.size * 100}%`, backgroundPosition: `${(col / (d.size - 1)) * 100}% ${(row / (d.size - 1)) * 100}%`, backgroundRepeat: "no-repeat" }} aria-label={`Localizar peça ${piece + 1}`} />;
              })}
            </div>

            <div className="mt-3 grid grid-cols-5 gap-2">
              <Stat icon="🧩" value={`${total}`} label={`NÍVEL ${total} PEÇAS`} />
              <Stat icon="👣" value={`${moves}`} label="MOVIMENTOS" />
              <div className="rounded-xl border border-zinc-800 bg-[#111a1f] p-2 text-center"><div className="mx-auto grid h-11 w-11 place-items-center rounded-full text-[11px] font-black text-white" style={{ background: `conic-gradient(#fbbf24 ${progress}%,#233038 0)` }}><span className="grid h-8 w-8 place-items-center rounded-full bg-[#111a1f]">{progress}%</span></div><span className="mt-1 block text-[8px] font-bold text-zinc-500">PROGRESSO</span></div>
              <button onClick={useHint} className="rounded-xl border border-zinc-800 bg-[#111a1f] p-2 text-center"><span className="text-lg">💡</span><b className="ml-1 text-sm text-amber-300">{hints}</b><span className="mt-1 block text-[8px] font-bold text-zinc-500">DICA</span></button>
              <button onClick={() => setPaused(v => !v)} className="rounded-xl border border-zinc-800 bg-[#111a1f] p-2 text-center"><b className="text-xl">Ⅱ</b><span className="mt-1 block text-[8px] font-bold text-zinc-500">PAUSAR</span></button>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[22px] border border-[#25333b] bg-[#091319] p-4 shadow-inner">
              <h3 className="text-center text-[13px] font-black">ESCOLHA O NÍVEL</h3>
              <div className="mt-3 grid gap-2.5">
                {levels.map((level, i) => <button key={level.label} onClick={() => setDifficulty(i)} className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${difficulty === i ? level.tone : "border-zinc-700 bg-[#111a1f]"}`}>
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${level.iconTone} text-lg font-black text-black shadow-lg`}>🧩</span>
                  <span><b className="block text-sm">{level.label}</b><span className="block text-[11px] text-zinc-300">{level.size ** 2} peças</span><small className="block text-[9px] text-zinc-500">{level.desc}</small></span>
                </button>)}
              </div>
              <button onClick={() => startGame(difficulty, story)} className="mt-3 w-full rounded-xl bg-gradient-to-b from-yellow-300 to-amber-500 py-3 text-sm font-black text-black shadow-[0_8px_22px_rgba(245,158,11,.25)]">COMEÇAR</button>
            </div>

            {done ? <CompletionCard story={s} moves={moves} completed={completedStories} onNext={nextStory} /> : <div className="rounded-[22px] border border-[#25333b] bg-[#091319] p-4 text-center shadow-inner">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full" style={{ background: `conic-gradient(#fbbf24 ${progress}%,#25333b 0)` }}><div className="grid h-[58px] w-[58px] place-items-center rounded-full bg-[#091319] text-lg font-black text-amber-300">{progress}%</div></div>
              <h3 className="mt-3 font-black">Seu progresso</h3>
              <p className="mt-1 text-[11px] text-zinc-400"><b className="text-lime-400">{correct}</b> de {total} peças encaixadas</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800"><div className="h-full rounded-full bg-amber-400" style={{ width: `${progress}%` }} /></div>
              <img src={s.image} alt="" className="mx-auto mt-4 h-24 w-full rounded-xl object-cover opacity-80" />
              <p className="mt-3 text-[10px] text-zinc-500">Melhor resultado neste nível: <b className="text-zinc-300">{bestMoves[winKey] ? `${bestMoves[winKey]} movimentos` : "—"}</b></p>
            </div>}
          </aside>
        </div>

        <div className="mt-4 rounded-[22px] border border-[#25333b] bg-[#091319] p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3"><h3 className="text-sm font-black sm:text-base">📖 PRÓXIMAS HISTÓRIAS</h3><span className="text-[9px] text-zinc-500">{completedStories}/{stories.length} concluídas</span></div>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2 snap-x">
            {stories.filter((_, i) => i !== story).map((x) => {
              const si = stories.indexOf(x), levelsDone = storyLevels(si);
              return <button key={x.title} onClick={() => startGame(difficulty, si)} className="min-w-[145px] snap-start overflow-hidden rounded-xl border border-zinc-700 bg-[#10191e] text-left sm:min-w-[168px]">
                <img src={x.image} alt={x.title} className="h-28 w-full object-cover" />
                <div className="p-3 text-center"><b className="block text-[12px] leading-tight">{x.title}</b><span className="mt-1 block text-[10px] font-black text-amber-400">{x.ref}</span><span className="mt-2 block text-[9px] text-zinc-500">{levelsDone}/3 níveis</span></div>
              </button>;
            })}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 min-[620px]:grid-cols-5">
          <Feature icon="🧩" title="PEÇAS ENCAIXAM" sub="AO SOLTAR" />
          <Feature icon="🎯" title="SINAL VERDE" sub="PARA ENCAIXE" />
          <Feature icon="🖼️" title="IMAGEM" sub="DE REFERÊNCIA" />
          <Feature icon="🏆" title="PROGRESSO" sub="SALVO" />
          <Feature icon="📊" title="ACOMPANHE" sub="CONQUISTAS" />
        </div>
      </div>

      {showReference && <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/90 p-4 backdrop-blur-sm" onClick={() => setShowReference(false)}><div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-amber-400/30 bg-[#071116]" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between p-3"><div><b className="block">Imagem de referência</b><span className="text-xs text-amber-400">{s.title} • {s.ref}</span></div><button onClick={() => setShowReference(false)} className="grid h-9 w-9 place-items-center rounded-full bg-zinc-800">×</button></div><img src={s.image} alt={`Referência de ${s.title}`} className="max-h-[72vh] w-full object-contain bg-black" />{s.source && <p className="p-2 text-center text-[9px] text-zinc-500">Imagem licenciada via {s.source}</p>}</div></div>}
    </section>
  );
}

function Stat({ icon, value, label }: { icon: string; value: string; label: string }) {
  return <div className="rounded-xl border border-zinc-800 bg-[#111a1f] p-2 text-center"><span className="text-base">{icon}</span><b className="ml-1 text-sm">{value}</b><span className="mt-1 block text-[8px] font-bold text-zinc-500">{label}</span></div>;
}

function Feature({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return <div className="rounded-xl border border-[#25333b] bg-[#0d171c] p-3 text-center"><span className="text-xl">{icon}</span><b className="mt-1 block text-[10px]">{title}</b><small className="text-[9px] text-zinc-500">{sub}</small></div>;
}

function CompletionCard({ story, moves, completed, onNext }: { story: Story; moves: number; completed: number; onNext: () => void }) {
  return <div className="rounded-[22px] border border-amber-400/30 bg-[#091319] p-4 text-center shadow-inner"><div className="mx-auto inline-block rounded-[50%] bg-gradient-to-b from-amber-300 to-amber-600 px-6 py-2 text-xl font-black text-[#2b1600] shadow-[0_8px_22px_rgba(245,158,11,.25)]">PARABÉNS!</div><p className="mt-3 text-xs text-zinc-300">Você completou</p><h3 className="mt-1 text-base font-black">{story.title}</h3><div className="relative mx-auto mt-3 w-28"><img src={story.image} alt={story.title} className="h-28 w-28 rounded-xl object-cover ring-1 ring-white/20"/><span className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-lime-500 text-xl font-black">✓</span></div><div className="mt-4 rounded-xl border border-zinc-700 bg-black/30 p-3 text-[11px]">“{story.message}”<span className="mt-2 block font-black text-amber-400">{story.ref}</span></div><div className="mt-4 text-left"><div className="flex justify-between text-[9px] text-zinc-500"><span>Histórias concluídas</span><span>{completed} de {stories.length}</span></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-zinc-800"><div className="h-full rounded-full bg-amber-400" style={{width:`${Math.round((completed/stories.length)*100)}%`}}/></div></div><p className="mt-2 text-[9px] text-zinc-500">Concluído em {moves} movimentos</p><button onClick={onNext} className="mt-4 w-full rounded-xl bg-gradient-to-b from-yellow-300 to-amber-500 py-3 text-sm font-black text-black">PRÓXIMA HISTÓRIA</button></div>;
}
