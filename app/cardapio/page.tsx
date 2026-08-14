import { products } from "../../data/products";
import { formatPrice } from "../../utils/format";

const bebidas = [
  ["Coca-Cola 1 litro", "Zero e normal", 8],
  ["Coca-Cola 2 litros", "Normal", 12],
  ["Kuat Guaraná 2 litros", "", 8.5],
  ["Dell Vale", "Pêssego e uva", 4],
  ["Fanta", "Laranja, uva e guaraná", 5],
  ["Água sem gás", "", 2.5],
  ["Água com gás", "", 3],
  ["Monster", "Consultar sabores disponíveis", 12],
  ["Lemon Sprite", "", 5],
  ["Coca-Cola lata 350ml", "", 5],
  ["Coca-Cola mini lata", "", 3.5],
] as const;

const sucos = [
  ["Suco médio", "Maracujá, morango, coco branco, goiaba, coquinho azedo, caju ou abacaxi com hortelã", 6],
  ["Suco grande", "Maracujá, morango, coco branco, goiaba, coquinho azedo, caju ou abacaxi com hortelã", 7],
  ["Vitamina média", "Sabores disponíveis", 7],
  ["Vitamina grande", "Sabores disponíveis", 8],
] as const;

const acai = [
  ["Açaí 200ml", "Escolha 1 opção de acréscimos grátis", 8],
  ["Açaí 300ml", "Escolha 1 opção de acréscimos grátis", 10],
  ["Açaí 400ml", "Escolha 1 opção de acréscimos grátis", 12],
  ["Açaí 500ml", "Escolha 1 opção de acréscimos grátis", 14],
] as const;

const acrescimos = [
  ["Leite condensado", 1.5], ["Leite em pó", 1.5], ["Banana", 1.5],
  ["Granola", 1.5], ["Look (0,50 unidade)", 0.5], ["Marshmallow (0,50 unid.)", 0.5],
  ["Paçoquinha", 1.5], ["Creme de chocolate", 2], ["Creme de avelã (tipo Nutella)", 4],
  ["Amendoim granulado", 1.5], ["Chocobol", 2], ["Gotinhas de chocolate", 2],
  ["Chococandy tipo M&M's / Disquete", 2], ["Granulado colorido", 1.5], ["Queijo mussarela", 2],
] as const;

const sorvetes = [
  ["1 bola de sorvete", 2.5], ["Picolé comum", 2], ["Picolé de casquinha", 3.5], ["Cascão de sorvete", 1.5],
] as const;

const milkshakes = [["Milk shake 300ml", 9], ["Milk shake 400ml", 11], ["Milk shake 500ml", 13]] as const;

function Section({ title, emoji, items }: { title: string; emoji: string; items: readonly (readonly [string, string, number])[] }) {
  return <section className="mt-10"><h2 className="text-2xl font-black text-yellow-400 mb-4">{emoji} {title}</h2><div className="space-y-3">{items.map(([nome, descricao, preco]) => <div key={nome} className="bg-zinc-900 rounded-2xl p-5 flex justify-between gap-4"><div><h3 className="text-lg font-bold">{nome}</h3>{descricao && <p className="text-zinc-400 text-sm mt-1">{descricao}</p>}<p className="text-yellow-400 font-bold mt-2">{formatPrice(preco)}</p></div><button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold self-center">Pedir</button></div>)}</div></section>;
}

export default function Cardapio() {
  const extras = acrescimos.map(([n,p]) => [n,"Acréscimo para o açaí",p] as const);
  const sorveteItems = sorvetes.map(([n,p]) => [n,"",p] as const);
  const milkItems = milkshakes.map(([n,p]) => [n,"Verificar sabores disponíveis",p] as const);
  return <main className="min-h-screen bg-black text-white p-6 pb-28 max-w-5xl mx-auto"><h1 className="text-4xl font-black text-yellow-400">Cardápio Popular</h1><p className="text-zinc-400 mt-2">Hamburgueria e Sorveteria</p>
    <section className="mt-8"><h2 className="text-2xl font-black text-yellow-400 mb-4">🍔 Lanches e Batatas</h2><div className="space-y-3">{products.map(produto => <div key={produto.id} className="bg-zinc-900 rounded-2xl p-5 flex justify-between gap-4"><div><h3 className="text-lg font-bold">{produto.nome}</h3><p className="text-zinc-400 text-sm mt-1">{produto.descricao}</p><p className="text-yellow-400 font-bold mt-2">{formatPrice(produto.preco)}</p></div><button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold self-center">Pedir</button></div>)}</div></section>
    <Section title="Bebidas" emoji="🥤" items={bebidas}/><Section title="Sucos e Vitaminas" emoji="🍹" items={sucos}/><Section title="Açaí" emoji="🫐" items={acai}/><Section title="Acréscimos do Açaí" emoji="➕" items={extras}/><Section title="Sorvetes" emoji="🍦" items={sorveteItems}/><Section title="Milk Shakes" emoji="🥛" items={milkItems}/>
  </main>;
}
