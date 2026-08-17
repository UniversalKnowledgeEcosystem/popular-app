"use client";
import {useEffect,useState} from "react";

const mensagens=[
 {texto:"Tudo posso naquele que me fortalece.",ref:"Filipenses 4:13",reflexao:"Com Deus, encontramos força para enfrentar cada desafio do dia."},
 {texto:"O Senhor é o meu pastor; nada me faltará.",ref:"Salmos 23:1",reflexao:"Confie no cuidado de Deus, inclusive nos dias em que o caminho parece incerto."},
 {texto:"Entrega o teu caminho ao Senhor; confia nele.",ref:"Salmos 37:5",reflexao:"Coloque seus planos nas mãos de Deus e siga fazendo a sua parte com fé."},
 {texto:"Este é o dia que fez o Senhor; alegremo-nos nele.",ref:"Salmos 118:24",reflexao:"Cada novo dia é uma oportunidade para agradecer, amar e fazer o bem."},
 {texto:"O amor é paciente, o amor é bondoso.",ref:"1 Coríntios 13:4",reflexao:"Que nossas palavras e atitudes levem paciência, bondade e amor às pessoas."},
 {texto:"Alegrai-vos na esperança, sede pacientes na tribulação.",ref:"Romanos 12:12",reflexao:"Mesmo nas dificuldades, mantenha a esperança e persevere em oração."},
 {texto:"Se Deus é por nós, quem será contra nós?",ref:"Romanos 8:31",reflexao:"A fé nos lembra que não precisamos enfrentar os desafios apenas com nossas próprias forças."},
 {texto:"Confia no Senhor de todo o teu coração.",ref:"Provérbios 3:5",reflexao:"Nem sempre entenderemos tudo agora; ainda assim, podemos caminhar confiando em Deus."},
 {texto:"A minha graça te basta.",ref:"2 Coríntios 12:9",reflexao:"A graça de Deus nos sustenta especialmente quando reconhecemos nossas limitações."},
 {texto:"Sede fortes e corajosos; não temais.",ref:"Deuteronômio 31:6",reflexao:"Coragem não é ausência de medo: é continuar caminhando com fé."},
 {texto:"Bem-aventurados os pacificadores.",ref:"Mateus 5:9",reflexao:"Hoje, escolha ser instrumento de paz em casa, no trabalho e por onde passar."},
 {texto:"A fé, se não tiver obras, é morta em si mesma.",ref:"Tiago 2:17",reflexao:"Transforme sua fé em atitudes: ajude, acolha, perdoe e faça o bem."}
];

export default function WordOfDay(){
 const[m,setM]=useState(mensagens[0]);
 useEffect(()=>{const d=new Date(),inicio=new Date(d.getFullYear(),0,0),dia=Math.floor((d.getTime()-inicio.getTime())/86400000);setM(mensagens[dia%mensagens.length])},[]);
 const compartilhar=async()=>{const texto=`Momento de Fé 🙏\n\n“${m.texto}”\n${m.ref}\n\n${m.reflexao}\n\nPopular Hambúrgueria e Sorveteria`;
  try{if(navigator.share){await navigator.share({title:"Momento de Fé",text:texto})}else{await navigator.clipboard.writeText(texto);alert("Mensagem copiada para compartilhar.")}}catch{}
 };
 return <section className="px-6 mt-5 max-w-5xl mx-auto">
  <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border border-yellow-400/25 rounded-3xl p-5 shadow-xl">
   <div className="absolute -right-4 -top-5 text-7xl opacity-[.06]">🙏</div>
   <div className="flex items-start justify-between gap-3"><div><p className="text-yellow-400 text-[11px] font-black tracking-[.16em]">🙏 MOMENTO DE FÉ</p><p className="text-[11px] text-zinc-500 mt-1">Uma palavra para o seu dia</p></div><span className="text-xl" aria-hidden>📖</span></div>
   <blockquote className="text-lg font-bold mt-3 leading-snug">“{m.texto}”</blockquote>
   <p className="text-sm text-yellow-400 font-bold mt-2">{m.ref}</p>
   <div className="mt-4 pt-4 border-t border-zinc-800"><p className="text-[11px] font-black uppercase tracking-wider text-zinc-500">Reflexão do dia</p><p className="text-sm text-zinc-300 mt-1 leading-relaxed">{m.reflexao}</p></div>
   <button onClick={compartilhar} className="mt-4 w-full rounded-2xl border border-yellow-400/25 bg-yellow-400/5 py-3 text-sm font-black text-yellow-400 active:scale-[.99] transition">📲 Compartilhar Momento de Fé</button>
   <p className="text-center text-[11px] text-zinc-600 mt-3">Que Deus abençoe você e sua família. 🕊️</p>
  </div>
 </section>
}
