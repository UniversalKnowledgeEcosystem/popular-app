"use client";
import Link from "next/link";
import {useMemo,useState} from "react";

const palavras=[
 {texto:"Tudo posso naquele que me fortalece.",ref:"Filipenses 4:13",reflexao:"Coloque seus planos diante de Deus e siga o dia com fé e coragem."},
 {texto:"O Senhor é o meu pastor; nada me faltará.",ref:"Salmos 23:1",reflexao:"Mesmo sem enxergar todo o caminho, podemos confiar no cuidado de Deus."},
 {texto:"Entrega o teu caminho ao Senhor; confia nele.",ref:"Salmos 37:5",reflexao:"Faça a sua parte e entregue a Deus aquilo que você não controla."},
 {texto:"Este é o dia que fez o Senhor; alegremo-nos nele.",ref:"Salmos 118:24",reflexao:"Hoje é uma nova oportunidade para agradecer, recomeçar, amar e fazer o bem."},
 {texto:"Confia no Senhor de todo o teu coração.",ref:"Provérbios 3:5",reflexao:"Nem sempre precisamos compreender tudo para continuar confiando em Deus."}
];
const perguntas=[
 ["Quem construiu a arca?",["Noé","Abraão","Moisés","Davi"],0,"Gênesis 6–9 relata a construção da arca por Noé."],
 ["Quem derrotou Golias?",["Davi","Samuel","Salomão","Josué"],0,"Davi enfrentou e derrotou Golias em 1 Samuel 17."],
 ["Quem foi lançado na cova dos leões?",["Daniel","José","Paulo","Pedro"],0,"Daniel foi lançado na cova dos leões, conforme Daniel 6."],
 ["Quem recebeu os Dez Mandamentos no monte Sinai?",["Moisés","Arão","Josué","Elias"],0,"Moisés recebeu os mandamentos de Deus no Sinai."],
 ["Em qual cidade Jesus nasceu?",["Belém","Nazaré","Jerusalém","Jericó"],0,"Os Evangelhos de Mateus e Lucas situam o nascimento de Jesus em Belém."],
 ["Quem foi engolido por um grande peixe?",["Jonas","Amós","Isaías","Ezequiel"],0,"O livro de Jonas relata que Jonas foi engolido por um grande peixe."],
 ["Quem era a mãe de Jesus?",["Maria","Marta","Isabel","Rute"],0,"Maria é apresentada nos Evangelhos como a mãe de Jesus."],
 ["Qual discípulo andou sobre as águas em direção a Jesus?",["Pedro","João","Tiago","André"],0,"Mateus 14 relata Pedro andando sobre as águas em direção a Jesus."],
 ["Quem interpretou sonhos no Egito e se tornou governador?",["José","Isaque","Jacó","Benjamim"],0,"José interpretou os sonhos do faraó e recebeu autoridade no Egito em Gênesis 41."],
 ["Quem sucedeu Moisés na liderança de Israel?",["Josué","Calebe","Arão","Samuel"],0,"Josué foi designado para suceder Moisés."],
 ["Qual rei pediu sabedoria a Deus?",["Salomão","Saul","Davi","Ezequias"],0,"Salomão pediu sabedoria a Deus em 1 Reis 3."],
 ["Quem batizou Jesus?",["João Batista","Pedro","Paulo","André"],0,"Os Evangelhos registram que João Batista batizou Jesus."],
 ["Qual é o primeiro livro da Bíblia?",["Gênesis","Êxodo","Salmos","Mateus"],0,"Gênesis é o primeiro livro do cânon bíblico cristão."],
 ["Qual é o último livro do Novo Testamento?",["Apocalipse","Judas","Atos","Romanos"],0,"Apocalipse encerra o Novo Testamento."],
 ["Quem negou Jesus três vezes?",["Pedro","Tomé","João","Mateus"],0,"Os Evangelhos relatam as três negações de Pedro."],
 ["Quem era irmão de Moisés?",["Arão","Josué","Samuel","Elias"],0,"Arão é apresentado como irmão de Moisés."],
 ["Qual mulher se tornou rainha e intercedeu pelo seu povo?",["Ester","Rute","Débora","Sara"],0,"Ester tornou-se rainha e intercedeu pelo povo judeu."],
 ["Quem subiu ao céu num redemoinho?",["Elias","Eliseu","Isaías","Jeremias"],0,"2 Reis 2 relata a subida de Elias num redemoinho."],
 ["Quem escreveu muitas cartas do Novo Testamento?",["Paulo","Pilatos","Herodes","Zaqueu"],0,"Diversas epístolas do Novo Testamento são atribuídas a Paulo."],
 ["Quem foi o pai de João Batista?",["Zacarias","José","Simeão","Nicodemos"],0,"Lucas 1 apresenta Zacarias como pai de João Batista."]
] as const;
const cenas=[
 {nome:"Arca de Noé",icon:"🌧️",grad:"from-sky-500 via-blue-600 to-indigo-900",emoji:"🚢",legenda:"Noé e a arca • Gênesis 6–9"},
 {nome:"Davi e Golias",icon:"🛡️",grad:"from-orange-400 via-amber-600 to-stone-900",emoji:"🏹",legenda:"Davi e Golias • 1 Samuel 17"},
 {nome:"Daniel",icon:"🦁",grad:"from-yellow-300 via-amber-600 to-orange-950",emoji:"🦁",legenda:"Daniel na cova dos leões • Daniel 6"},
 {nome:"Moisés",icon:"🌊",grad:"from-cyan-400 via-blue-600 to-slate-950",emoji:"🌊",legenda:"A travessia do mar • Êxodo 14"},
 {nome:"Nascimento de Jesus",icon:"⭐",grad:"from-indigo-500 via-purple-800 to-zinc-950",emoji:"⭐",legenda:"O nascimento de Jesus • Lucas 2"},
 {nome:"Jonas",icon:"🐋",grad:"from-cyan-500 via-teal-700 to-blue-950",emoji:"🐋",legenda:"Jonas e o grande peixe • Jonas 1–2"}
];
const embaralhar=(n:number,seed:number)=>{const a=Array.from({length:n},(_,i)=>i);for(let i=n-1;i>0;i--){const j=(seed*(i+3)+i*7)%(i+1);[a[i],a[j]]=[a[j],a[i]]}if(a.every((v,i)=>v===i)&&n>1)[a[0],a[1]]=[a[1],a[0]];return a};

export default function MomentoDeFe(){
 const hoje=new Date();const p=palavras[Math.abs(hoje.getFullYear()*372+(hoje.getMonth()+1)*31+hoje.getDate())%palavras.length];
 const [q,setQ]=useState(0),[resposta,setResposta]=useState<number|null>(null),[acertos,setAcertos]=useState(0),[sequencia,setSequencia]=useState(0),[puzzle,setPuzzle]=useState(0),[nivel,setNivel]=useState(1),[pecas,setPecas]=useState(()=>embaralhar(9,17)),[selecionada,setSelecionada]=useState<number|null>(null),[movimentos,setMovimentos]=useState(0),[copiado,setCopiado]=useState(false);
 const pergunta=perguntas[q%perguntas.length],cena=cenas[puzzle%cenas.length],completo=useMemo(()=>pecas.every((v,i)=>v===i),[pecas]);
 async function compartilhar(){const texto=`🙏 Palavra do Dia — Popular\n\n“${p.texto}”\n📖 ${p.ref}\n\n${p.reflexao}\n\nDeus abençoe o seu dia!`;try{if(navigator.share)await navigator.share({title:"Palavra do Dia",text:texto});else{await navigator.clipboard.writeText(texto);setCopiado(true);setTimeout(()=>setCopiado(false),1500)}}catch{}}
 function responder(i:number){if(resposta!==null)return;setResposta(i);if(i===pergunta[2]){setAcertos(x=>x+1);setSequencia(x=>x+1)}else setSequencia(0)}
 function proxima(){setQ(x=>x+1);setResposta(null)}
 function tocarPeca(i:number){if(completo)return;if(selecionada===null){setSelecionada(i);return}const n=[...pecas];[n[selecionada],n[i]]=[n[i],n[selecionada]];setPecas(n);setSelecionada(null);setMovimentos(x=>x+1)}
 function proximoPuzzle(){const nv=nivel+1;setNivel(nv);setPuzzle(x=>x+1);setPecas(embaralhar(9,nv*31+11));setMovimentos(0);setSelecionada(null)}
 return <main className="min-h-screen bg-zinc-950 text-white px-5 pt-6 pb-28 max-w-2xl mx-auto">
 <header className="flex items-center gap-3"><Link href="/" className="w-11 h-11 bg-zinc-900 border border-zinc-800 rounded-xl grid place-items-center">←</Link><div><p className="text-yellow-400 text-[11px] font-black tracking-wider">POPULAR • MOMENTO DE FÉ</p><h1 className="text-3xl font-black">🙏 Momento de Fé</h1></div></header>
 <nav className="grid grid-cols-4 gap-2 mt-5 sticky top-2 z-20 bg-zinc-950/90 backdrop-blur p-2 rounded-2xl border border-zinc-800">{[['📖','Palavra','#palavra'],['↗','Compartilhar','#palavra'],['❓','Quiz','#quiz'],['🧩','Puzzle','#puzzle']].map(([ic,n,h],i)=><a key={n} href={h} onClick={i===1?(e)=>{e.preventDefault();compartilhar()}:undefined} className="bg-zinc-900 rounded-xl py-3 text-center text-[10px] font-black"><span className="block text-xl">{ic}</span>{n}</a>)}</nav>
 <section id="palavra" className="mt-5 rounded-[2rem] bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 text-black p-7 shadow-2xl"><p className="text-xs font-black tracking-widest opacity-60">✝ PALAVRA DE HOJE</p><div className="text-5xl mt-8">📖</div><blockquote className="text-3xl font-black leading-tight mt-4">“{p.texto}”</blockquote><p className="font-black mt-4">{p.ref}</p><p className="font-semibold mt-5 leading-relaxed">{p.reflexao}</p><button onClick={compartilhar} className="w-full mt-6 bg-black text-white rounded-2xl py-4 font-black">{copiado?'✓ Copiada':'↗ Compartilhar mensagem'}</button></section>
 <section id="quiz" className="mt-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-5"><div className="flex justify-between"><div><p className="text-yellow-400 text-xs font-black">❓ QUIZ BÍBLICO INFINITO</p><h2 className="text-xl font-black">Pergunta {q+1}</h2></div><div className="text-right text-xs"><b className="text-green-400">✓ {acertos} acertos</b><p className="text-zinc-500 mt-1">🔥 sequência {sequencia}</p></div></div><p className="mt-5 font-bold text-lg">{pergunta[0]}</p><div className="grid gap-2 mt-4">{pergunta[1].map((o,i)=><button key={o} onClick={()=>responder(i)} disabled={resposta!==null} className={`p-4 rounded-2xl text-left font-bold border ${resposta===null?'bg-zinc-950 border-zinc-800':i===pergunta[2]?'bg-green-500/20 border-green-500':resposta===i?'bg-red-500/20 border-red-500':'bg-zinc-950 border-zinc-800 opacity-50'}`}>{String.fromCharCode(65+i)}. {o}</button>)}</div>{resposta!==null&&<div className="mt-4"><div className="bg-zinc-950 rounded-2xl p-4 text-sm text-zinc-300">📖 {pergunta[3]}</div><button onClick={proxima} className="w-full mt-3 bg-yellow-400 text-black py-4 rounded-2xl font-black">Próxima pergunta →</button></div>}<p className="text-[11px] text-zinc-500 mt-4">Ao terminar o banco de perguntas, o quiz continua novamente para você melhorar sua pontuação.</p></section>
 <section id="puzzle" className="mt-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-5"><div className="flex justify-between items-start"><div><p className="text-yellow-400 text-xs font-black">🧩 QUEBRA-CABEÇA BÍBLICO INFINITO</p><h2 className="text-xl font-black">{cena.nome}</h2><p className="text-xs text-zinc-400">Nível {nivel} • {movimentos} movimentos</p></div><span className="text-4xl">{cena.icon}</span></div><div className="relative mt-5 grid grid-cols-3 gap-1 overflow-hidden rounded-2xl bg-black p-1">{pecas.map((v,i)=>{const row=Math.floor(v/3),col=v%3;return <button key={i} onClick={()=>tocarPeca(i)} className={`relative aspect-square overflow-hidden border ${selecionada===i?'border-yellow-300 ring-2 ring-yellow-300':'border-white/10'} bg-gradient-to-br ${cena.grad}`}><div className="absolute inset-0 grid place-items-center text-5xl" style={{transform:`translate(${(1-col)*18}px,${(1-row)*18}px)`}}>{cena.emoji}</div><span className="absolute bottom-1 right-1 bg-black/60 rounded px-1 text-[9px]">{v+1}</span></button>})}</div><p className="text-center text-xs text-zinc-400 mt-3">Selecione duas peças para trocar de posição. Monte a imagem na ordem correta.</p>{completo&&<div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center"><p className="font-black text-green-300">🎉 Imagem concluída!</p><p className="text-sm text-zinc-300 mt-1">{cena.legenda}</p><button onClick={proximoPuzzle} className="w-full mt-4 bg-yellow-400 text-black py-4 rounded-xl font-black">Próxima imagem →</button></div>}<button onClick={()=>{setPecas(embaralhar(9,(nivel+1)*43));setSelecionada(null);setMovimentos(0)}} className="w-full mt-3 border border-zinc-700 py-3 rounded-xl text-xs font-black text-zinc-300">↻ Embaralhar novamente</button></section>
 <section className="mt-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-5"><p className="text-yellow-400 text-xs font-black">🙏 ORAÇÃO DO DIA</p><p className="text-zinc-300 leading-relaxed mt-3">Senhor Deus, obrigado por este dia. Guia meus pensamentos, palavras e decisões. Dá-me sabedoria para fazer o bem, força para enfrentar as dificuldades e um coração agradecido. Guarda minha família. Em nome de Jesus, amém.</p></section>
 <p className="text-center text-zinc-600 text-xs mt-6">Atividades recreativas, sem premiação comercial.</p></main>
}
