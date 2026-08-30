export type ProdutoFarmacia={id:number;nome:string;categoria:string;preco:number;normal:number;clube:number;emoji:string;tag:string;receita?:boolean;controlado?:boolean;estoque:number;marca?:string};

export const categoriasFarmacia=["Todos","Medicamentos","Dor e Febre","Gripe e Resfriado","Digestão","Vitaminas","Dermocosméticos","Higiene","Mamãe e Bebê","Primeiros Socorros","Cuidados Diários"];

export const produtosFarmacia:ProdutoFarmacia[]=[
{id:4101,nome:"Paracetamol 750mg 20 comprimidos",categoria:"Dor e Febre",preco:12.9,normal:15.9,clube:10.9,emoji:"💊",tag:"MAIS VENDIDO",estoque:36,marca:"Genérico"},
{id:4102,nome:"Dipirona 500mg 20 comprimidos",categoria:"Dor e Febre",preco:9.9,normal:12.9,clube:8.49,emoji:"💊",tag:"OFERTA",estoque:42,marca:"Genérico"},
{id:4103,nome:"Ibuprofeno 400mg 10 cápsulas",categoria:"Dor e Febre",preco:18.9,normal:21.9,clube:16.9,emoji:"💊",tag:"CLUBE",estoque:18,marca:"Referência"},
{id:4201,nome:"Antigripal 20 comprimidos",categoria:"Gripe e Resfriado",preco:24.9,normal:29.9,clube:22.9,emoji:"🤧",tag:"SAZONAL",estoque:25},
{id:4202,nome:"Soro fisiológico 0,9% 500ml",categoria:"Gripe e Resfriado",preco:8.9,normal:10.9,clube:7.9,emoji:"💧",tag:"ESSENCIAL",estoque:50},
{id:4301,nome:"Antiácido 10 comprimidos",categoria:"Digestão",preco:11.9,normal:14.9,clube:10.9,emoji:"🟢",tag:"OFERTA",estoque:22},
{id:4302,nome:"Probiótico 10 cápsulas",categoria:"Digestão",preco:32.9,normal:36.9,clube:29.9,emoji:"🧫",tag:"BEM-ESTAR",estoque:14},
{id:4401,nome:"Vitamina C 1g 30 comprimidos",categoria:"Vitaminas",preco:27.9,normal:31.9,clube:24.9,emoji:"🍊",tag:"IMUNIDADE",estoque:31},
{id:4402,nome:"Multivitamínico A-Z 60 cápsulas",categoria:"Vitaminas",preco:44.9,normal:49.9,clube:39.9,emoji:"🌈",tag:"CLUBE",estoque:16},
{id:4501,nome:"Protetor solar facial FPS 60 50g",categoria:"Dermocosméticos",preco:54.9,normal:64.9,clube:49.9,emoji:"☀️",tag:"DERMO",estoque:12},
{id:4502,nome:"Hidratante facial 50g",categoria:"Dermocosméticos",preco:42.9,normal:48.9,clube:39.9,emoji:"🧴",tag:"CUIDADO",estoque:19},
{id:4601,nome:"Sabonete líquido 250ml",categoria:"Higiene",preco:16.9,normal:19.9,clube:14.9,emoji:"🧼",tag:"HIGIENE",estoque:28},
{id:4602,nome:"Desodorante aerosol 150ml",categoria:"Higiene",preco:14.9,normal:17.9,clube:13.49,emoji:"🧴",tag:"OFERTA",estoque:34},
{id:4701,nome:"Fralda descartável M 40 unidades",categoria:"Mamãe e Bebê",preco:49.9,normal:56.9,clube:45.9,emoji:"👶",tag:"BEBÊ",estoque:10},
{id:4702,nome:"Lenço umedecido 100 unidades",categoria:"Mamãe e Bebê",preco:17.9,normal:20.9,clube:15.9,emoji:"🧻",tag:"BEBÊ",estoque:20},
{id:4801,nome:"Curativo adesivo 40 unidades",categoria:"Primeiros Socorros",preco:12.9,normal:15.9,clube:11.49,emoji:"🩹",tag:"ESSENCIAL",estoque:40},
{id:4802,nome:"Álcool 70% 500ml",categoria:"Primeiros Socorros",preco:9.9,normal:11.9,clube:8.9,emoji:"🧴",tag:"CUIDADO",estoque:26},
{id:4901,nome:"Aparelho medidor de pressão digital",categoria:"Cuidados Diários",preco:139.9,normal:159.9,clube:129.9,emoji:"🩺",tag:"SAÚDE",estoque:7},
{id:4902,nome:"Termômetro digital",categoria:"Cuidados Diários",preco:29.9,normal:34.9,clube:26.9,emoji:"🌡️",tag:"SAÚDE",estoque:15},
{id:5001,nome:"Antibiótico demonstrativo 500mg",categoria:"Medicamentos",preco:39.9,normal:44.9,clube:36.9,emoji:"📄",tag:"RECEITA",receita:true,estoque:8},
{id:5002,nome:"Medicamento controlado demonstrativo",categoria:"Medicamentos",preco:59.9,normal:64.9,clube:55.9,emoji:"🔒",tag:"RECEITA OBRIGATÓRIA",receita:true,controlado:true,estoque:5}
];