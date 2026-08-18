"use client";
import Link from "next/link";
import {useMemo,useState} from "react";

const dias=[
 {texto:"Tudo posso naquele que me fortalece.",ref:"Filipenses 4:13",reflexao:"Coloque seus planos diante de Deus e siga o dia com fé e coragem.",pergunta:"Quem escreveu a carta aos Filipenses?",opcoes:["Paulo","Moisés","Davi"],certa:0},
 {texto:"O Senhor é o meu pastor; nada me faltará.",ref:"Salmos 23:1",reflexao:"Mesmo sem enxergar todo o caminho, podemos confiar no cuidado de Deus.",pergunta:"Qual personagem bíblico foi pastor antes de ser rei?",opcoes:["Davi","Pedro","Noé"],certa:0},
 {texto:"Entrega o teu caminho ao Senhor; confia nele.",ref:"Salmos 37:5",reflexao:"Faça a sua parte e entregue a Deus aquilo que você não controla.",pergunta:"Em qual livro está este versículo?",opcoes:["Salmos","Gênesis","Mateus"],certa:0},
 {texto:"Este é o dia que fez o Senhor; alegremo-nos nele.",ref:"Salmos 118:24",reflexao:"Hoje é uma nova oportunidade para agradecer, recomeçar, amar e fazer o bem.",pergunta:"Quantos dias Deus levou para criar os céus e a terra antes do descanso?",opcoes:["6","7","10"],certa:0},
 {texto:"Confia no Senhor de todo o teu coração.",ref:"Provérbios 3:5",reflexao:"Nem sempre precisamos compreender tudo para continuar confiando em Deus.",pergunta:"Quem é tradicionalmente associado a muitos dos Provérbios?",opcoes:["Salomão","Jonas","Tomé"],certa:0},
 {texto:"Alegrai-vos na esperança, sede pacientes na tribulação.",ref:"Romanos 12:12",reflexao:"A esperança nos ajuda a atravessar as dificuldades sem abandonar a fé.",pergunta:"Romanos faz parte de qual parte da Bíblia?",opcoes:["Novo Testamento","Antigo Testamento","Salmos"],certa:0},
 {texto:"Deixo-vos a paz, a minha paz vos dou.",ref:"João 14:27",reflexao:"A paz de Cristo pode permanecer conosco mesmo quando nem tudo está resolvido.",pergunta:"Quem disse estas palavras?",opcoes:["Jesus","Abraão","José"],certa:0}
];

export default function MomentoDeFe(){
 const hoje=new Date(); const indice=Math.abs(hoje.getFullYear()*372+(hoje.getMonth()+1)*31+hoje.getDate())%dias.length; const d=dias[indice];
 const [quiz,setQuiz]=useState<number|null>(null); const [mistura,setMistura]=useState<number[]>([2,0,5,1,4,3]); const [movimentos,setMovimentos]=useState(0); const [copiado,setCopiado]=useState(false);
 const correto=quiz===d.certa; const completo=useMemo(()=>mistura.every((v,i)=>v===i),[mistura]);
 async function compartilhar(){const texto=`🙏 Palavra do Dia — Popular\n\n“${d.texto}”\n📖 ${d.ref}\n\n${d.reflexao}\n\nDeus abençoe o seu dia!`;try{if(navigator.share)await navigator.share({title:"Palavra do Dia",text:texto});else{await navigator.clipboard.writeText(texto);setCopiado(true);setTimeout(()=>setCopiado(false),1500)}}catch{}}
 function mover(i:number){if(completo)return;const n=[...mistura];const alvo=(i+1)%6;[n[i],n[alvo]]=[n[alvo],n[i]];setMistura(n);setMovimentos(x=>x+1)}
 return <main className="min-h-screen bg-zinc-950 text-white px-5 pt-6 pb-28 max-w-2xl mx-auto">
  <header className="flex items-center gap-3"><Link href="/" className="w-11 h-11 bg-zinc-900 border border-zinc-800 rounded-xl grid place-items-center">←</Link><div><p className="text-yellow-400 text-[11px] font-black tracking-wider">POPULAR • MOMENTO DE FÉ</p><h1 className="text-3xl font-black">🙏 Momento de Fé</h1></div></header>
  <p className="text-zinc-400 mt-3">Palavra, oração e atividades bíblicas em um só lugar. O conteúdo muda todos os dias.</p>

  <nav className="grid grid-cols-4 gap-2 mt-5 sticky top-2 z-20 bg-zinc-950/90 backdrop-blur p-2 rounded-2xl border border-zinc-800">
   {[['📖','Palavra','#palavra'],['↗','Compartilhar','#palavra'],['❓','Quiz','#quiz'],['🧩','Quebra-cabeça','#puzzle']].map(([ic,n,h],i)=><a key={n} href={h} onClick={i===1?(e)=>{e.preventDefault();compartilhar()}:undefined} className="bg-zinc-900 rounded-xl py-3 text-center text-[10px] font-black"><span className="block text-xl mb-1">{ic}</span>{n}</a>)}
  </nav>

  <section id="palavra" className="mt-5 overflow-hidden rounded-[2rem] bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 text-black shadow-2xl">
   <div className="relative min-h-[390px] p-7 flex flex-col justify-between bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.55),transparent_40%)]">
    <div><p className="text-[11px] font-black tracking-[.2em] opacity-60">✝ PALAVRA DE HOJE</p><p className="text-sm font-bold opacity-70 mt-1">{hoje.toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'})}</p></div>
    <div><div className="text-5xl mb-4">📖</div><blockquote className="text-3xl font-black leading-tight">“{d.texto}”</blockquote><p className="font-black mt-4">{d.ref}</p><div className="h-px bg-black/15 my-5"/><p className="font-semibold leading-relaxed">{d.reflexao}</p></div>
    <button onClick={compartilhar} className="mt-6 bg-black text-white rounded-2xl py-4 font-black">{copiado?'✓ Mensagem copiada':'↗ Compartilhar mensagem de hoje'}</button>
   </div>
  </section>

  <section id="quiz" className="mt-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-5"><p className="text-yellow-400 text-xs font-black">❓ QUIZ BÍBLICO DO DIA</p><h2 className="text-xl font-black mt-1">Teste seus conhecimentos</h2><p className="mt-4 font-bold">{d.pergunta}</p><div className="grid gap-2 mt-4">{d.opcoes.map((o,i)=><button key={o} disabled={quiz!==null} onClick={()=>setQuiz(i)} className={`p-4 rounded-2xl text-left font-bold border ${quiz===null?'bg-zinc-950 border-zinc-800':i===d.certa?'bg-green-500/20 border-green-500':quiz===i?'bg-red-500/20 border-red-500':'bg-zinc-950 border-zinc-800 opacity-60'}`}>{String.fromCharCode(65+i)}. {o}</button>)}</div>{quiz!==null&&<div className={`mt-4 rounded-2xl p-4 font-bold ${correto?'bg-green-500/10 text-green-300':'bg-yellow-400/10 text-yellow-300'}`}>{correto?'🎉 Muito bem! Resposta correta.':'📖 Quase! A resposta correta está destacada acima.'}<p className="text-xs font-normal mt-2 opacity-80">Amanhã haverá uma nova pergunta.</p></div>}</section>

  <section id="puzzle" className="mt-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-5"><p className="text-yellow-400 text-xs font-black">🧩 QUEBRA-CABEÇA BÍBLICO</p><h2 className="text-xl font-black mt-1">Monte a Palavra</h2><p className="text-sm text-zinc-400 mt-1">Toque nas peças para trocar de posição e colocar os números de 1 a 6 na ordem.</p><div className="grid grid-cols-3 gap-2 mt-5">{mistura.map((v,i)=><button key={i} onClick={()=>mover(i)} className="aspect-square rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-500 text-black grid place-items-center shadow-lg"><span className="text-3xl font-black">{v+1}</span><span className="sr-only">Peça {v+1}</span></button>)}</div><div className="flex justify-between items-center mt-4"><p className="text-xs text-zinc-400">Movimentos: <b className="text-white">{movimentos}</b></p><button onClick={()=>{setMistura([2,0,5,1,4,3]);setMovimentos(0)}} className="text-xs font-black text-yellow-400">Recomeçar</button></div>{completo&&<div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center"><p className="font-black text-green-300">🎉 Parabéns! Você completou!</p><p className="text-sm text-zinc-300 mt-2">“{d.texto}” — {d.ref}</p></div>}</section>

  <section className="mt-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-5"><p className="text-yellow-400 text-xs font-black">🙏 ORAÇÃO DO DIA</p><p className="text-zinc-300 leading-relaxed mt-3">Senhor Deus, obrigado por este dia. Guia meus pensamentos, minhas palavras e decisões. Dá-me sabedoria para fazer o bem, força para enfrentar as dificuldades e um coração agradecido. Guarda minha família e abençoa o trabalho das minhas mãos. Em nome de Jesus, amém.</p></section>
  <section className="mt-5 text-center rounded-3xl border border-yellow-400/15 p-5"><p className="font-black">✝️ Deus abençoe você e sua família.</p><p className="text-zinc-500 text-xs mt-2">Atividades recreativas, sem premiação comercial.</p></section>
 </main>
}
