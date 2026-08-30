"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {useCart} from "../context/CartContext";
import MascotMoment from "../components/MascotMoment";
import {formatPrice} from "../../utils/format";
import {MINIMO_SELO,valorElegivelSelo} from "../../utils/fidelidade";
import {products} from "../../data/products";

const K="popular_dados_cliente";
type D={nome:string;telefone:string;endereco:string;tipo:"entrega"|"retirada";pagamento:string};
type Erros={nome?:string;telefone?:string;endereco?:string};
function soNumeros(v:string){return v.replace(/\D/g,"").slice(0,13)}
function telBR(v:string){let t=soNumeros(v);if(t.startsWith("55")&&t.length>=12)t=t.slice(2);if(t.startsWith("0")&&t.length>=11)t=t.slice(1);if(!/^\d{10,11}$/.test(t))return null;const ddd=Number(t.slice(0,2)),n=t.slice(2);if(ddd<11||ddd>99||/^(\d)\1+$/.test(t)||/^(\d)\1+$/.test(n))return null;if(n.length===9&&!/^9\d{8}$/.test(n))return null;if(n.length===8&&!/^[2-5]\d{7}$/.test(n))return null;return t}
function mascara(v:string){const t=soNumeros(v).replace(/^55(?=\d{10,11}$)/,"").slice(0,11);if(t.length<=2)return t;if(t.length<=6)return`(${t.slice(0,2)}) ${t.slice(2)}`;if(t.length<=10)return`(${t.slice(0,2)}) ${t.slice(2,6)}-${t.slice(6)}`;return`(${t.slice(0,2)}) ${t.slice(2,7)}-${t.slice(7)}`}
function imagemItem(id:number,nome:string){const baseId=id>=100000?Math.floor(id/100000):id;const p=products.find(x=>x.id===baseId)||products.find(x=>nome.toLowerCase().startsWith(x.nome.toLowerCase()));if(p?.imagem)return p.imagem;const n=nome.toLowerCase();if(n.includes("fritas premium")&&n.includes("grande"))return"/fritas grande premium.png";if(n.includes("fritas premium"))return"/fritas media premium.png";if(n.includes("fritas")&&n.includes("grande"))return"/fritas grande simples.png";if(n.includes("fritas"))return"/fritas media simples.png";return null}
function emojiItem(nome:string){const n=nome.toLowerCase();if(n.includes("açaí")||n.includes("acai"))return"🫐";if(n.includes("milk"))return"🥛";if(n.includes("suco")||n.includes("vitamina"))return"🍹";if(n.includes("coca")||n.includes("kuat")||n.includes("refrigerante")||n.includes("monster"))return"🥤";if(n.includes("sorvete")||n.includes("picolé")||n.includes("picole"))return"🍦";if(n.includes("frit"))return"🍟";return"🍔"}

export default function Carrinho(){
  const{items,total,adicionar,diminuir,remover,limpar}=useCart();
  const[nome,setNome]=useState(""),[telefone,setTelefone]=useState(""),[endereco,setEndereco]=useState(""),[pagamento,setPagamento]=useState("Pix"),[obs,setObs]=useState("");
  const[tipo,setTipo]=useState<"entrega"|"retirada">("entrega");
  const[enviando,setEnviando]=useState(false),[revisao,setRevisao]=useState(false),[sucesso,setSucesso]=useState(false);
  const[erros,setErros]=useState<Erros>({});
  const[shakeKey,setShakeKey]=useState(0);
  const[erroGeral,setErroGeral]=useState("");
  const totalElegivel=valorElegivelSelo(items);

  useEffect(()=>{try{const d=JSON.parse(localStorage.getItem(K)||"null")as Partial<D>|null;if(d){setNome(String(d.nome||""));setTelefone(mascara(String(d.telefone||"")));setEndereco(String(d.endereco||""));setTipo(d.tipo==="retirada"?"retirada":"entrega");setPagamento(String(d.pagamento||"Pix"))}}catch{}},[]);

  function validar(){
    const novos:Erros={};
    if(!nome.trim())novos.nome="Este campo é obrigatório.";
    if(!telefone.trim())novos.telefone="Este campo é obrigatório.";
    else if(!telBR(telefone))novos.telefone="Digite um WhatsApp válido com DDD.";
    if(tipo==="entrega"&&!endereco.trim())novos.endereco="Este campo é obrigatório para entrega.";
    setErros(novos);
    setErroGeral("");
    if(Object.keys(novos).length){
      setShakeKey(k=>k+1);
      requestAnimationFrame(()=>document.querySelector(".popular-field-error")?.scrollIntoView({behavior:"smooth",block:"center"}));
      return false;
    }
    return true;
  }

  async function finalizar(){
    if(enviando||!validar())return;
    const tel=telBR(telefone);if(!tel)return;
    setEnviando(true);setErroGeral("");
    try{
      const itens=items.map(i=>({produto_id:String(i.id),nome:i.nome,preco:Number(i.preco),quantidade:Number(i.quantidade)}));
      const r=await fetch("/api/pedidos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({whatsapp:tel,nome_cliente:nome.trim(),total,itens,tipo,endereco:endereco.trim()})});
      const d=await r.json();
      if(!r.ok){
        const msg=String(d.error||"Não foi possível registrar o pedido.");
        if(msg.toLowerCase().includes("telefone")){setErros(e=>({...e,telefone:msg}));setShakeKey(k=>k+1);setRevisao(false)}
        else setErroGeral(msg);
        return;
      }
      localStorage.setItem(K,JSON.stringify({nome:nome.trim(),telefone:tel,endereco:endereco.trim(),tipo,pagamento}));
      const id=String(d.pedido?.pedido_id||"");
      if(d.perfil_token&&id)localStorage.setItem("popular_perfil_acesso",JSON.stringify({telefone:tel,pedido_id:id,token:String(d.perfil_token)}));
      const oficiais=Array.isArray(d.pedido?.itens)?d.pedido.itens:itens,totalOficial=Number(d.total_oficial??d.pedido?.total??total),linhas=oficiais.map((i:any)=>`• ${i.quantidade}x ${i.nome} — ${formatPrice(Number(i.preco)*Number(i.quantidade))}`).join("\n"),fid=d.elegivel_selo?"⭐ *Elegível para 1 selo após validação.*":"ℹ️ *Este pedido não gera selo.*",mensagem=`🍔 *NOVO PEDIDO - POPULAR*\n\n🆔 ${id}\n👤 ${nome}\n📱 ${tel}\n${tipo==="entrega"?`🛵 ${endereco}`:"🏪 Retirada no local"}\n💳 ${pagamento}\n\n🧾 *PEDIDO*\n${linhas}\n\n💰 *TOTAL: ${formatPrice(totalOficial)}*\n${fid}${obs.trim()?`\n📝 ${obs}`:""}`;
      limpar();setRevisao(false);setSucesso(true);window.open(`https://wa.me/5538991429166?text=${encodeURIComponent(mensagem)}`,"_blank");
    }catch{setErroGeral("Não foi possível registrar o pedido agora. Tente novamente.")}finally{setEnviando(false)}
  }

  const campo="w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none rounded-xl p-3";
  if(sucesso)return <main className="min-h-screen bg-zinc-950 text-white p-6 flex items-center justify-center"><div className="max-w-md w-full bg-zinc-900 border border-green-500/30 rounded-3xl p-7 text-center"><div className="text-6xl">✅</div><h1 className="text-3xl font-black mt-3">Pedido preparado!</h1><p className="text-zinc-400 mt-2">Confira o WhatsApp e envie a mensagem para a Popular.</p><Link href="/cardapio" className="block bg-yellow-400 text-black py-4 rounded-xl font-black mt-5">🍔 Fazer novo pedido</Link></div></main>;
  if(!items.length)return <main className="min-h-screen bg-zinc-950 text-white p-6"><div className="max-w-md mx-auto"><h1 className="text-3xl font-black">🛒 Seu carrinho</h1><div className="mt-8"><MascotMoment titulo="Ei, não me deixe sozinho por aqui! 😄" texto="Seu carrinho ainda está vazio. Que tal escolher um lanche caprichado, uma porção de fritas e sua bebida favorita?"/></div><div className="mt-4 bg-yellow-400/10 border border-yellow-400/25 rounded-2xl p-4 text-center"><p className="text-sm text-yellow-200 font-bold">🍔 Monte seu pedido do seu jeito e aproveite as delícias da Popular!</p></div><Link href="/cardapio" className="block text-center mt-5 bg-yellow-400 text-black px-6 py-4 rounded-2xl font-black text-lg">😋 Quero escolher meu pedido →</Link></div></main>;

  return <main className="min-h-screen bg-zinc-950 text-white p-4 pb-32 max-w-3xl mx-auto">
    <div className="flex justify-between items-center"><div><p className="text-yellow-400 text-xs font-black">POPULAR</p><h1 className="text-3xl font-black">🛒 Seu carrinho</h1></div><Link href="/cardapio" className="text-sm text-yellow-400 font-bold">+ Adicionar</Link></div>
    <div className="space-y-3 mt-5">{items.map(i=>{const img=imagemItem(i.id,i.nome);return <div key={i.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3"><div className="flex gap-3"><div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-black rounded-2xl overflow-hidden flex items-center justify-center">{img?<img src={img} alt={i.nome} className="w-full h-full object-contain p-1"/>:<span className="text-5xl" aria-label={i.nome}>{emojiItem(i.nome)}</span>}</div><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><div className="min-w-0"><b className="block leading-tight">{i.nome}</b><p className="text-yellow-400 text-sm mt-1">{formatPrice(i.preco)} cada</p></div><button onClick={()=>remover(i.id)} aria-label={`Remover ${i.nome}`} className="w-9 h-9 shrink-0 bg-zinc-800 rounded-xl">×</button></div><div className="flex justify-between items-center gap-2 mt-3"><div className="bg-zinc-800 rounded-xl whitespace-nowrap"><button onClick={()=>diminuir(i.id)} className="px-3 py-2">−</button><span className="px-1 font-black">{i.quantidade}</span><button onClick={()=>adicionar({id:i.id,nome:i.nome,preco:i.preco})} className="px-3 py-2">+</button></div><b className="text-right">{formatPrice(i.preco*i.quantidade)}</b></div></div></div></div>})}</div>
    <section className="mt-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4"><div className="flex justify-between text-zinc-400"><span>Subtotal</span><span>{formatPrice(total)}</span></div><div className="flex justify-between text-xl font-black mt-3 pt-3 border-t border-zinc-800"><span>Total</span><span className="text-yellow-400">{formatPrice(total)}</span></div></section>
    <div className={`mt-4 p-4 rounded-2xl border ${totalElegivel>=MINIMO_SELO?"bg-green-500/10 border-green-500/30 text-green-300":"bg-yellow-400/10 border-yellow-400/30 text-yellow-300"}`}><b>{totalElegivel>=MINIMO_SELO?"⭐ Este pedido pode valer 1 selo!":`⭐ Faltam ${formatPrice(Math.max(0,MINIMO_SELO-totalElegivel))} em itens elegíveis para 1 selo`}</b><p className="text-xs mt-1 opacity-80">Contam: lanches, fritas, refrigerantes, sucos e vitaminas.</p></div>
    <section className="mt-4 bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-3">
      <h2 className="text-xl font-black">Dados do pedido</h2>
      <div key={`nome-${shakeKey}`}>
        <input value={nome} onChange={e=>{setNome(e.target.value);if(erros.nome)setErros(x=>({...x,nome:undefined}))}} placeholder="Seu nome" aria-invalid={!!erros.nome} className={`${campo} ${erros.nome?"popular-field-error":""}`}/>
        {erros.nome&&<p className="text-red-400 text-sm mt-1.5 font-bold">⚠️ {erros.nome}</p>}
      </div>
      <div key={`telefone-${shakeKey}`}>
        <input value={telefone} onChange={e=>{setTelefone(mascara(e.target.value));if(erros.telefone)setErros(x=>({...x,telefone:undefined}))}} placeholder="WhatsApp com DDD" inputMode="numeric" maxLength={15} aria-invalid={!!erros.telefone} className={`${campo} ${erros.telefone?"popular-field-error":""}`}/>
        {erros.telefone&&<p className="text-red-400 text-sm mt-1.5 font-bold">⚠️ {erros.telefone}</p>}
      </div>
      <div className="grid grid-cols-2 gap-2"><button onClick={()=>{setTipo("entrega")}} className={`p-3 rounded-xl font-bold ${tipo==="entrega"?"bg-yellow-400 text-black":"bg-zinc-800"}`}>🛵 Entrega</button><button onClick={()=>{setTipo("retirada");setErros(x=>({...x,endereco:undefined}))}} className={`p-3 rounded-xl font-bold ${tipo==="retirada"?"bg-yellow-400 text-black":"bg-zinc-800"}`}>🏪 Retirada</button></div>
      {tipo==="entrega"&&<div key={`endereco-${shakeKey}`}><input value={endereco} onChange={e=>{setEndereco(e.target.value);if(erros.endereco)setErros(x=>({...x,endereco:undefined}))}} placeholder="Rua, nº, bairro e referência" aria-invalid={!!erros.endereco} className={`${campo} ${erros.endereco?"popular-field-error":""}`}/>{erros.endereco&&<p className="text-red-400 text-sm mt-1.5 font-bold">⚠️ {erros.endereco}</p>}</div>}
      <select value={pagamento} onChange={e=>setPagamento(e.target.value)} className={campo}><option>Pix</option><option>Dinheiro</option><option>Cartão</option></select>
      <textarea value={obs} onChange={e=>setObs(e.target.value)} placeholder="Observações (opcional)" className={campo}/>
      {erroGeral&&<div className="bg-red-500/10 border border-red-500/40 text-red-300 rounded-xl p-3 text-sm font-bold">⚠️ {erroGeral}</div>}
      <button onClick={()=>{if(validar())setRevisao(true)}} className="w-full bg-green-500 text-black py-4 rounded-xl font-black text-lg">Revisar pedido →</button>
    </section>
    {revisao&&<div className="fixed inset-0 z-[80] bg-black/80 p-4 flex items-center justify-center"><div className="bg-zinc-900 rounded-3xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto"><h2 className="text-2xl font-black">Está tudo certo?</h2><p className="text-zinc-400 text-sm mt-1">Confira os itens e seus dados antes de finalizar.</p><div className="mt-4 space-y-2">{items.map(i=>{const img=imagemItem(i.id,i.nome);return <div key={i.id} className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-2xl p-3"><div className="w-14 h-14 shrink-0 rounded-xl bg-zinc-900 overflow-hidden flex items-center justify-center">{img?<img src={img} alt={i.nome} className="w-full h-full object-contain p-1"/>:<span className="text-3xl">{emojiItem(i.nome)}</span>}</div><div className="min-w-0 flex-1"><p className="font-black leading-tight">{i.quantidade}x {i.nome}</p><p className="text-xs text-zinc-400 mt-1">{formatPrice(i.preco)} cada</p></div><p className="font-black text-yellow-400 whitespace-nowrap">{formatPrice(i.preco*i.quantidade)}</p></div>})}</div><div className="mt-3 bg-zinc-950 p-4 rounded-2xl text-sm"><p>👤 {nome}</p><p>📱 {telefone}</p><p>{tipo==="entrega"?`🛵 ${endereco}`:"🏪 Retirada no local"}</p><p>💳 {pagamento}</p>{obs.trim()&&<p className="mt-2 text-zinc-300">📝 {obs}</p>}<div className="flex justify-between items-center border-t border-zinc-800 mt-3 pt-3"><span className="font-bold">Total do pedido</span><span className="font-black text-xl text-yellow-400">{formatPrice(total)}</span></div></div>{erroGeral&&<div className="mt-3 bg-red-500/10 border border-red-500/40 text-red-300 rounded-xl p-3 text-sm font-bold">⚠️ {erroGeral}</div>}<button disabled={enviando} onClick={finalizar} className="w-full bg-green-500 text-black py-4 rounded-xl font-black mt-4">{enviando?"Preparando pedido...":"✓ Finalizar no WhatsApp"}</button><button onClick={()=>setRevisao(false)} className="w-full bg-zinc-800 py-3 rounded-xl mt-2">← Quero corrigir</button></div></div>}
  </main>
}
