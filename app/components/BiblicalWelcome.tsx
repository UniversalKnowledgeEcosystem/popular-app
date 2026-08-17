"use client";
import {useEffect,useState} from "react";

const mensagens=[
 {texto:"Tudo posso naquele que me fortalece.",ref:"Filipenses 4:13"},
 {texto:"O Senhor é o meu pastor; nada me faltará.",ref:"Salmos 23:1"},
 {texto:"Entrega o teu caminho ao Senhor; confia nele.",ref:"Salmos 37:5"},
 {texto:"Este é o dia que fez o Senhor; alegremo-nos nele.",ref:"Salmos 118:24"},
 {texto:"O amor é paciente, o amor é bondoso.",ref:"1 Coríntios 13:4"},
 {texto:"Alegrai-vos na esperança, sede pacientes na tribulação.",ref:"Romanos 12:12"},
 {texto:"Se Deus é por nós, quem será contra nós?",ref:"Romanos 8:31"},
 {texto:"Confia no Senhor de todo o teu coração.",ref:"Provérbios 3:5"},
 {texto:"A minha graça te basta.",ref:"2 Coríntios 12:9"},
 {texto:"Sede fortes e corajosos; não temais.",ref:"Deuteronômio 31:6"},
 {texto:"Bem-aventurados os pacificadores.",ref:"Mateus 5:9"},
 {texto:"A fé, se não tiver obras, é morta em si mesma.",ref:"Tiago 2:17"}
];
export function palavraDoDia(){const d=new Date();const inicio=new Date(d.getFullYear(),0,0);const dia=Math.floor((d.getTime()-inicio.getTime())/86400000);return mensagens[dia%mensagens.length]}
export default function BiblicalWelcome(){const[aberto,setAberto]=useState(false);const[m,setM]=useState(mensagens[0]);useEffect(()=>{const anterior=Number(sessionStorage.getItem("popular_versiculo_indice")||"-1");let i=Math.floor(Math.random()*mensagens.length);if(mensagens.length>1&&i===anterior)i=(i+1)%mensagens.length;sessionStorage.setItem("popular_versiculo_indice",String(i));setM(mensagens[i]);setAberto(true);const t=window.setTimeout(()=>setAberto(false),2800);return()=>window.clearTimeout(t)},[]);if(!aberto)return null;return <div className="fixed inset-0 z-[9999] bg-zinc-950 flex items-center justify-center p-7 text-white" role="dialog" aria-label="Mensagem bíblica de boas-vindas"><div className="max-w-md text-center animate-[fadeIn_.35s_ease-out]"><div className="mx-auto w-20 h-20 rounded-3xl bg-yellow-400 text-black flex items-center justify-center text-4xl shadow-2xl">🍔</div><p className="mt-6 text-yellow-400 text-xs font-black tracking-[.2em]">POPULAR • SINCE 2017</p><h1 className="text-2xl font-black mt-5 leading-tight">“{m.texto}”</h1><p className="text-yellow-400 font-bold mt-3">📖 {m.ref}</p><p className="text-zinc-500 text-xs mt-7">Que Deus abençoe o seu dia. ❤️</p><button onClick={()=>setAberto(false)} className="mt-6 text-xs text-zinc-400 underline underline-offset-4">Entrar agora</button></div></div>}
