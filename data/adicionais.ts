export type Adicional = {
  id: string;
  nome: string;
  emoji: string;
  preco: number | null;
  ativo: boolean;
  grupo: "proteina" | "queijo_creme" | "complemento";
};

// preco=null significa que o adicional ainda não deve ser cobrado/liberado ao cliente.
// Assim podemos cadastrar todos os ingredientes agora sem inventar valores.
export const adicionais: Adicional[] = [
  { id: "bacon", nome: "Bacon extra", emoji: "🥓", preco: 3, ativo: true, grupo: "proteina" },
  { id: "carne", nome: "Carne extra", emoji: "🥩", preco: 4, ativo: true, grupo: "proteina" },
  { id: "queijo", nome: "Queijo extra", emoji: "🧀", preco: 2, ativo: true, grupo: "queijo_creme" },
  { id: "ovo", nome: "Ovo extra", emoji: "🍳", preco: 2, ativo: true, grupo: "proteina" },

  { id: "frango", nome: "Frango", emoji: "🍗", preco: null, ativo: false, grupo: "proteina" },
  { id: "presunto", nome: "Presunto", emoji: "🥓", preco: null, ativo: false, grupo: "proteina" },
  { id: "salsicha", nome: "Salsicha", emoji: "🌭", preco: null, ativo: false, grupo: "proteina" },
  { id: "cheddar", nome: "Cheddar", emoji: "🧀", preco: null, ativo: false, grupo: "queijo_creme" },
  { id: "catupiry", nome: "Catupiry", emoji: "🧀", preco: null, ativo: false, grupo: "queijo_creme" },

  { id: "alface", nome: "Alface", emoji: "🥬", preco: null, ativo: false, grupo: "complemento" },
  { id: "tomate", nome: "Tomate", emoji: "🍅", preco: null, ativo: false, grupo: "complemento" },
  { id: "milho", nome: "Milho", emoji: "🌽", preco: null, ativo: false, grupo: "complemento" },
  { id: "batata_palha", nome: "Batata palha", emoji: "🍟", preco: null, ativo: false, grupo: "complemento" },
  { id: "maionese", nome: "Maionese", emoji: "🥫", preco: null, ativo: false, grupo: "complemento" }
];

export const adicionaisAtivos = adicionais.filter(a => a.ativo && a.preco !== null);
export const adicionaisAguardandoPreco = adicionais.filter(a => a.preco === null);
