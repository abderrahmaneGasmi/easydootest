export type category =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";
export interface Product {
  id: number;
  title: string;
  price: number;
  category: category;
  description: string;
  image: string;
}

export function getProduct() {
  return fetch(process.env.api + "/products")
    .then((res) => res.json())
    .then((data) => data as Product[]);
}
export function searchProduct(search: string) {
  return fetch(process.env.api + "/products?title=" + search)
    .then((res) => res.json())
    .then((data) => data as Product[]);
}
