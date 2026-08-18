"use client";
import Link from "next/link";
import {useState} from "react";
import BiblicalPuzzle from "../components/BiblicalPuzzle";

const palavras=[
 {texto:"Tudo posso naquele que me fortalece.",ref:"Filipenses 4:13",reflexao:"Coloque seus planos diante de Deus e siga o dia com fé e coragem."},
 {texto:"O Senhor é o meu pastor; nada me faltará.",ref:"Salmos 23:1",reflexao:"Mesmo sem enxergar todo o caminho, podemos confiar no cuidado de Deus."},
 {texto:"Entrega o teu caminho ao Senhor; confia nele.",ref:"Salmos 37:5",reflexao:"Faça a sua parte e entregue a Deus aquilo que você não controla."},
 {texto:"Confia no Senhor de todo o teu coração.",ref:"Provérbios 3:5",reflexao:"Nem sempre precisamos compreender tudo para continuar confiando em Deus."},
 {texto:"Este é o dia que fez o Senhor; alegremo-nos nele.",ref:"Salmos 118:24",reflexao:"Hoje é uma nova oportunidade para agradecer, recomeçar, amar e fazer o bem."},
 {texto:"Deixo-vos a paz, a minha paz vos dou.",ref:"João 14:27",reflexao:"A paz de Cristo pode permanecer conosco mesmo quando nem tudo está resolvido."}
];

const imagensDiarias=[
 {titulo:"Jonas e o grande peixe",src:"/puzzle/jonas-premium.webp"},
 {titulo:"Arca de Noé",src:"https://cdn.pixabay.com/photo/2024/05/18/01/45/noahs-ark-8769320_1280.png"},
 {titulo:"Davi e Golias",src:"https://cdn.pixabay.com/photo/2024/04/04/02/09/david-and-goliath-8674177_1280.jpg"},
 {titulo:"Daniel na cova dos leões",src:"https://cdn.pixabay.com/photo/2024/04/12/04/50/daniel-8691083_1280.png"},
 {titulo:"Moisés abre o mar",src:"https://cdn.pixabay.com/photo/2023/03/30/01/39/moses-7886649_1280.jpg"},
 {titulo:"Jesus e a oração",src:"https://cdn.pixabay.com/photo/2024/04/28/04/53/jesus-praying-in-the-crowd-8724802_1280.png"}
];

type Pergunta=readonly [string,string,readonly string[],string];
const perguntas:readonly Pergunta[]=[
 ["Quem construiu a arca?","Noé",["Abraão","Moisés","Davi"],"Gênesis 6–9 relata a construção da arca por Noé."],
 ["Quem derrotou Golias?","Davi",["Samuel","Salomão","Josué"],"Davi derrotou Golias em 1 Samuel 17."],
 ["Quem foi lançado na cova dos leões?","Daniel",["José","Paulo","Pedro"],"Daniel 6 relata Daniel na cova dos leões."],
 ["Quem recebeu os Dez Mandamentos no Sinai?","Moisés",["Arão","Josué","Elias"],"Moisés recebeu os mandamentos no Sinai."],
 ["Em qual cidade Jesus nasceu?","Belém",["Nazaré","Jerusalém","Jericó"],"Mateus e Lucas situam o nascimento de Jesus em Belém."],
 ["Quem foi engolido por um grande peixe?","Jonas",["Amós","Isaías","Ezequiel"],"O livro de Jonas relata esse acontecimento."],
 ["Quem era a mãe de Jesus?","Maria",["Marta","Isabel","Rute"],"Os Evangelhos apresentam Maria como mãe de Jesus."],
 ["Qual discípulo andou sobre as águas em direção a Jesus?","Pedro",["João","Tiago","André"],"Mateus 14 relata Pedro andando sobre as águas."],
 ["Quem interpretou os sonhos do faraó?","José",["Isaque","Jacó","Benjamim"],"José interpretou os sonhos do faraó em Gênesis 41."],
 ["Quem sucedeu Moisés?","Josué",["Calebe","Arão","Samuel"],"Josué foi designado sucessor de Moisés."],
 ["Qual rei pediu sabedoria a Deus?","Salomão",["Saul","Davi","Ezequias"],"Salomão pediu sabedoria em 1 Reis 3."],
 ["Quem batizou Jesus?","João Batista",["Pedro","Paulo","André"],"João Batista batizou Jesus."],
 ["Qual é o primeiro livro da Bíblia?","Gênesis",["Êxodo","Salmos","Mateus"],"Gênesis é o primeiro livro da Bíblia."],
 ["Qual é o último livro do Novo Testamento?","Apocalipse",["Judas","Atos","Romanos"],"Apocalipse encerra o Novo Testamento."],
 ["Quem negou Jesus três vezes?","Pedro",["Tomé","João","Mateus"],"Os Evangelhos relatam as três negações de Pedro."],
 ["Quem era irmão de Moisés?","Arão",["Josué","Samuel","Elias"],"Arão era irmão de Moisés."],
 ["Qual mulher tornou-se rainha e intercedeu pelo seu povo?","Ester",["Rute","Débora","Sara"],"Ester tornou-se rainha e intercedeu pelo povo judeu."],
 ["Quem subiu ao céu num redemoinho?","Elias",["Eliseu","Isaías","Jeremias"],"2 Reis 2 relata a subida de Elias."],
 ["Quem escreveu muitas cartas do Novo Testamento?","Paulo",["Pilatos","Herodes","Zaqueu"],"Diversas epístolas são atribuídas a Paulo."],
 ["Quem foi o pai de João Batista?","Zacarias",["José","Simeão","Nicodemos"],"Lucas 1 apresenta Zacarias como pai de João Batista."]
];

function shuffle<T>(a:readonly T[]):T[]{const n=[...a];for(let i=n.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[n[i],n[j]]=[n[j],n[i]]}return n}
function opts(p:Pergunta){return shuffle<string>([p[1],...p[2]])}
function wrap(ctx:CanvasRenderingContext2D,text:string,x:number,y:number,max:number,line:number,maxLines:number){const words=text.split(" ");let current="",lines=0;for(const word of words){const test=current?`${current} ${word}`:word;if(ctx.measureText(test).width>max&&current){ctx.fillText(current,x,y+lines*line);lines++;current=word;if(lines>=maxLines)return y+lines*line}else current=test}if(current&&lines<maxLines){ctx.fillText(current,x,y+lines*line);lines++}return y+lines*line}

export default function MomentoDeFe(){
 const hoje=new Date();const seed=hoje.getFullYear()*372+(hoje.getMonth()+1)*31+hoje.getDate();const p=palavras[Math.abs(seed)%palavras.length],imagem=imagensDiarias[Math.abs(seed)%imagensDiarias.length];
 const [q,setQ]=useState(0),[opcoes,setOpcoes]=useState<string[]>(()=>opts(perguntas[0])),[resp,setResp]=useState<string|null>(null),[acertos,setAcertos]=useState(0),[seq,setSeq]=useState(0),[compartilhando,setCompartilhando]=useState(false),[status,setStatus]=useState("");
 const pergunta=perguntas[q%perguntas.length];
 const textoCompartilhar=`🙏 Palavra do Dia — Popular\n\n“${p.texto}”\n📖 ${p.ref}\n\n${p.reflexao}\n\nQue Deus abençoe o seu dia!`;
 async function compartilhar(){setCompartilhando(true);setStatus("");try{const img=new Image();img.crossOrigin="anonymous";await new Promise<void>((resolve,reject)=>{img.onload=()=>resolve();img.onerror=()=>reject(new Error("imagem"));img.src=imagem.src});const canvas=document.createElement("canvas");canvas.width=1080;canvas.height=1350;const ctx=canvas.getContext("2d");if(!ctx)throw new Error("canvas");const scale=Math.max(canvas.width/img.width,canvas.height/img.height),w=img.width*scale,h=img.height*scale;ctx.drawImage(img,(canvas.width-w)/2,(canvas.height-h)/2,w,h);const grad=ctx.createLinearGradient(0,250,0,1350);grad.addColorStop(0,"rgba(0,0,0,.05)");grad.addColorStop(.48,"rgba(0,0,0,.28)");grad.addColorStop(1,"rgba(0,0,0,.92)");ctx.fillStyle=grad;ctx.fillRect(0,0,1080,1350);ctx.fillStyle="#fbbf24";ctx.font="700 28px Arial";ctx.fillText("POPULAR • MOMENTO DE FÉ",72,760);ctx.fillStyle="#fff";ctx.font="700 54px Arial";const fim=wrap(ctx,`“${p.texto}”`,72,830,930,66,5);ctx.fillStyle="#fbbf24";ctx.font="700 34px Arial";ctx.fillText(p.ref,72,fim+34);ctx.fillStyle="#f4f4f5";ctx.font="400 30px Arial";wrap(ctx,p.reflexao,72,fim+92,920,42,4);ctx.fillStyle="rgba(255,255,255,.72)";ctx.font="600 24px Arial";ctx.fillText("Compartilhe fé, esperança e uma boa palavra.",72,1280);const blob=await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,"image/jpeg",.93));if(!blob)throw new Error("blob");const file=new File([blob],"palavra-do-dia-popular.jpg",{type:"image/jpeg"});if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){await navigator.share({title:"Palavra do Dia — Popular",text:textoCompartilhar,files:[file]});setStatus("Compartilhada com sucesso") }else if(navigator.share){await navigator.share({title:"Palavra do Dia — Popular",text:textoCompartilhar});setStatus("Mensagem compartilhada") }else{await navigator.clipboard.writeText(textoCompartilhar);setStatus("Mensagem copiada")}}catch{try{if(navigator.share)await navigator.share({title:"Palavra do Dia — Popular",text:textoCompartilhar});else await navigator.clipboard.writeText(textoCompartilhar);setStatus("Mensagem pronta para compartilhar")}catch{setStatus("Não foi possível abrir o compartilhamento")}}finally{setCompartilhando(false);setTimeout(()=>setStatus(""),2500)}}
 function responder(o:string){if(resp)return;setResp(o);if(o===pergunta[1]){setAcertos(x=>x+1);setSeq(x=>x+1)}else setSeq(0)}
 function proxima(){const nq=q+1,np=perguntas[nq%perguntas.length];setQ(nq);setResp(null);setOpcoes(opts(np))}
 return <main className="min-h-screen bg-zinc-950 text-white px-5 pt-6 pb-28 max-w-2xl mx-auto">
  <header className="flex items-center gap-3"><Link href="/" className="w-11 h-11 bg-zinc-900 border border-zinc-800 rounded-xl grid place-items-center">←</Link><div><p className="text-yellow-400 text-[11px] font-black">POPULAR • MOMENTO DE FÉ</p><h1 className="text-3xl font-black">🙏 Momento de Fé</h1></div></header>
  <nav className="grid grid-cols-4 gap-2 mt-5 sticky top-2 z-20 bg-zinc-950/90 p-2 rounded-2xl border border-zinc-800">{[['📖','Palavra','#palavra'],['🖼️','Imagem','#imagem-do-dia'],['❓','Quiz','#quiz'],['🧩','Puzzle','#puzzle']].map(([ic,n,h])=><a key={n} href={h} className="bg-zinc-900 rounded-xl py-3 text-center text-[10px] font-black"><span className="block text-xl">{ic}</span>{n}</a>)}</nav>
  <section id="imagem-do-dia" className="mt-5 overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-zinc-900 shadow-2xl"><div className="relative min-h-[510px]"><img src={imagem.src} alt={imagem.titulo} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/25 to-black/95"/><div className="absolute inset-x-0 bottom-0 p-6"><p className="text-yellow-400 text-[11px] font-black tracking-[.18em]">✝ MENSAGEM DE HOJE</p><blockquote className="mt-3 text-3xl font-black leading-tight text-white">“{p.texto}”</blockquote><p className="mt-3 font-black text-yellow-400">{p.ref}</p><p className="mt-4 text-sm leading-relaxed text-zinc-200">{p.reflexao}</p><button onClick={compartilhar} disabled={compartilhando} className="mt-5 w-full rounded-2xl bg-yellow-400 py-4 font-black text-black disabled:opacity-60">{compartilhando?'Preparando imagem…':'↗ Compartilhar imagem de hoje'}</button>{status&&<p className="mt-2 text-center text-xs font-bold text-green-300">{status}</p>}</div></div><p className="px-5 py-3 text-center text-[10px] text-zinc-500">A imagem e a mensagem mudam automaticamente todos os dias.</p></section>
  <section id="palavra" className="mt-6 rounded-[2rem] bg-gradient-to-br from-yellow-300 to-amber-500 text-black p-7"><p className="text-xs font-black">✝ PALAVRA DE HOJE</p><blockquote className="text-3xl font-black mt-8">“{p.texto}”</blockquote><p className="font-black mt-4">{p.ref}</p><p className="font-semibold mt-5">{p.reflexao}</p><button onClick={compartilhar} className="w-full mt-6 bg-black text-white rounded-2xl py-4 font-black">↗ Compartilhar</button></section>
  <section id="quiz" className="mt-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-5"><div className="flex justify-between"><div><p className="text-yellow-400 text-xs font-black">❓ QUIZ BÍBLICO INFINITO</p><h2 className="text-xl font-black">Pergunta {q+1}</h2></div><div className="text-right text-xs"><b className="text-green-400">✓ {acertos} acertos</b><p className="text-zinc-400">🔥 sequência {seq}</p></div></div><div className="mt-4 h-1.5 bg-zinc-800 rounded-full"><div className="h-full bg-yellow-400 rounded-full" style={{width:`${((q%10)+1)*10}%`}}/></div><p className="mt-5 font-bold text-lg">{pergunta[0]}</p><div className="grid gap-2 mt-4">{opcoes.map((o,i)=><button key={o} onClick={()=>responder(o)} disabled={!!resp} className={`p-4 rounded-2xl text-left font-bold border transition ${!resp?'bg-zinc-950 border-zinc-800 active:scale-[.98]':o===pergunta[1]?'bg-green-500/20 border-green-500':resp===o?'bg-red-500/20 border-red-500':'bg-zinc-950 border-zinc-800 opacity-45'}`}><span className="inline-grid place-items-center w-7 h-7 mr-2 rounded-full bg-white/10 text-xs">{String.fromCharCode(65+i)}</span>{o}</button>)}</div>{resp&&<div className="mt-4"><div className={`rounded-2xl p-4 font-black ${resp===pergunta[1]?'bg-green-500/10 text-green-300':'bg-red-500/10 text-red-300'}`}>{resp===pergunta[1]?'🎉 Acertou! +1 ponto':'📖 Não foi dessa vez.'}<p className="font-normal text-zinc-300 text-sm mt-2">{pergunta[3]}</p></div><button onClick={proxima} className="w-full mt-3 bg-yellow-400 text-black py-4 rounded-2xl font-black">Próxima pergunta →</button></div>}</section>
  <BiblicalPuzzle/>
  <p className="text-center text-zinc-600 text-xs mt-6">Atividades recreativas, sem premiação comercial.</p>
 </main>
}
