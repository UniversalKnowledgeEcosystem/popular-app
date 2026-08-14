"use client";

import { useMemo, useState } from "react";
import { products } from "../../data/products";
import { formatPrice } from "../../utils/format";

type Item = { nome: string; descricao: string; preco: number; categoria: string; emoji: string };

const bebidas = [["Coca-Cola 1 litro","Zero e normal",8],["Coca-Cola 2 litros","Normal",12],["Kuat Guaraná 2 litros","",8.5],["Dell Vale","Pêssego e uva",4],["Fanta","Laranja, uva e guaraná",5],["Água sem gás","",2.5],["Água com gás","",3],["Monster","Consultar sabores disponíveis",12],["Lemon Sprite","",5],["Coca-Cola lata 350ml","",5],["Coca-Cola mini lata","",3.5]] as const;
const sucos = [["Suco médio","Maracujá, morango, coco branco, goiaba, coquinho azedo, caju ou abacaxi com hortelã",6],["Suco grande","Maracujá, morango, coco branco, goiaba, coquinho azedo, caju ou abacaxi com hortelã",7],["Vitamina média","Sabores disponíveis",7],["Vitamina grande","Sabores disponíveis",8]] as const;
const acai = [["Açaí 200ml","Escolha 1 opção de acréscimos grátis",8],["Açaí 300ml","Escolha 1 opção de acréscimos grátis",10],["Açaí 400ml","Escolha 1 opção de acréscimos grátis",12],["Açaí 500ml","Escolha 1 opção de acréscimos grátis",14]] as const;
const acrescimos = [["Leite condensado",1.5],["Leite em pó",1.5],["Banana",1.5],["Granola",1.5],["Look (0,50 unidade)",0.5],["Marshmallow (0,50 unid.)",0.5],["Paçoquinha",1.5],["Creme de chocolate",2],["Creme de avelã (tipo Nutella)",4],["Amendoim granulado",1.5],["Chocobol",2],["Gotinhas de chocolate",2],["Chococandy tipo M&M's / Disquete",2],["Granulado colorido",1.5],["Queijo mussarela",2]] as const;
const sorvetes = [["1 bola de sorvete",2.5],["Picolé comum",2],["Picolé de casquinha",3.5],["Cascão de sorvete",1.5]] as const;
const milkshakes = [["Milk shake 300ml",9],["Milk shake 400ml",11],["Milk shake 500ml",13]] as const;

const categorias = ["Todos","Lanches","Bebidas","Sucos","Açaí","Acréscimos","Sorvetes","Milk Shakes"];

export default function Cardapio() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  const itens: Item[] = useMemo(() => [
    ...products.map(p => ({ nome:p.nome, descricao:p.descricao || "", preco:p.preco, categoria:"Lanches", emoji:p.categoria === "Batatas" ? "🍟" : "🍔" })),
    ...bebidas.map(([nome,descricao,preco]) => ({nome,descricao,preco,categoria:"Bebidas",emoji:"🥤"})),
    ...sucos.map(([nome,descricao,preco]) => ({nome,descricao,preco,categoria:"Sucos",emoji:"🍹"})),
    ...acai.map(([nome,descricao,preco]) => ({nome,descricao,preco,categoria:"Açaí",emoji:"🫐"})),
    ...acrescimos.map(([nome,preco]) => ({nome,descricao:"Acréscimo para o açaí",preco,categoria:"Acréscimos",emoji:"➕"})),
    ...sorvetes.map(([nome,preco]) => ({nome,descricao:"",preco,categoria:"Sorvetes",emoji:"🍦"})),
    ...milkshakes.map(([nome,preco]) => ({nome,descricao:"Verificar sabores disponíveis",preco,categoria:"Milk Shakes",emoji:"🥛"})),
  ], []);

  const filtrados = itens.filter(item => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    const correspondeBusca = !termo || `${item.nome} ${item.descricao} ${item.categoria}`.toLocaleLowerCase("pt-BR").includes(termo);
    return correspondeBusca && (categoria === "Todos" || item.categoria === categoria);
  });

  return (
    <main className="min-h-screen bg-black text-white pb-28">
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur border-b border-zinc-800 px-4 pt-4 pb-3">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between gap-3 mb-3">
            <div><h1 className="text-2xl sm:text-3xl font-black text-yellow-400">Cardápio Popular</h1><p className="text-zinc-400 text-sm">Encontre seu pedido rapidinho</p></div>
            <span className="text-xs text-zinc-400 shrink-0">{filtrados.length} itens</span>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2">🔎</span>
            <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar Coca-Cola, açaí, X-Burger..." className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-yellow-400" />
          </div>
          <div className="flex gap-2 overflow-x-auto pt-3 pb-1 [scrollbar-width:none]">
            {categorias.map(cat => <button key={cat} onClick={()=>setCategoria(cat)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${categoria===cat ? "bg-yellow-400 text-black" : "bg-zinc-900 text-white border border-zinc-700"}`}>{cat}</button>)}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4">
        {filtrados.length === 0 ? <div className="text-center py-20"><div className="text-5xl">🔎</div><h2 className="font-bold text-xl mt-4">Nenhum item encontrado</h2><button onClick={()=>{setBusca("");setCategoria("Todos")}} className="mt-4 text-yellow-400 font-bold">Limpar busca</button></div> :
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{filtrados.map((item,i)=><article key={`${item.categoria}-${item.nome}-${i}`} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-3 items-center"><div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-2xl shrink-0">{item.emoji}</div><div className="min-w-0 flex-1"><span className="text-[11px] uppercase tracking-wide text-zinc-500">{item.categoria}</span><h2 className="font-bold leading-tight">{item.nome}</h2>{item.descricao && <p className="text-zinc-400 text-xs mt-1 line-clamp-2">{item.descricao}</p>}<p className="text-yellow-400 font-black mt-2">{formatPrice(item.preco)}</p></div><button className="bg-yellow-400 text-black w-10 h-10 rounded-xl text-xl font-black shrink-0" aria-label={`Adicionar ${item.nome}`}>+</button></article>)}</div>}
      </div>
    </main>
  );
}
