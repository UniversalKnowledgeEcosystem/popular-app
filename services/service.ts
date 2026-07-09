import { products } from "../data/products";
import type { Product } from "../types/product";

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(categoria: string): Product[] {
  return products.filter(
    (product) => product.categoria === categoria
  );
}