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
  let endpoint = process.env.api || "https://fakestoreapi.com";
  return fetch(endpoint + "/products")
    .then((res) => res.json())
    .then((data) => data as Product[]);
}
export function searchProduct(search: string) {
  return fetch(
    process.env.api || "https://fakestoreapi.com" + "/products?title=" + search
  )
    .then((res) => res.json())
    .then((data) => data as Product[]);
}
export function filterProducts(category: category) {
  console.log(process.env.api);
  return fetch(
    process.env.api ||
      "https://fakestoreapi.com" + "/products/category/" + category
  )
    .then((res) => res.json())
    .then((data) => data as Product[]);
}
export function addproduct(product: Partial<Product>) {
  console.log("first");
  return fetch(process.env.api || "https://fakestoreapi.com" + "/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}
