export const MINIMO_SELO = 20;
export const META_SELOS = 12;

export function semAcento(v: unknown) {
  return String(v || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function itemElegivelSelo(item: any) {
  const n = semAcento(`${item?.categoria || ""} ${item?.tipo || ""} ${item?.nome || item?.produto_nome || item?.produto || ""}`);
  if (/sorvete|milk\s*shake|milkshake|acai/.test(n)) return false;
  return /misto|x-|big|lanche|hamburguer|burger|frita|batata|refrigerante|refri|coca|kuat|guarana|monster|sprite|fanta|suco|vitamina/.test(n);
}

export function valorElegivelSelo(itens: any) {
  if (!Array.isArray(itens)) return 0;
  return Number(itens.filter(itemElegivelSelo).reduce((s: number, i: any) => s + Number(i?.preco || 0) * Number(i?.quantidade || 1), 0).toFixed(2));
}

export function pedidoElegivelSelo(itens: any) {
  return valorElegivelSelo(itens) >= MINIMO_SELO;
}
