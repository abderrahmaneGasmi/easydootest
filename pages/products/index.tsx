import React from "react";
import { Product, category, getProduct } from "../../api/products";
import Image from "next/image";
import styles from "./product.module.css";
export default function Products({ products }: { products: Product[] }) {
  const categoryclass = (category: category) => {
    switch (category) {
      case "electronics":
        return "bg-blue-300 text-blue-500";
      case "jewelery":
        return "bg-yellow-300 text-yellow-500";
      case "men's clothing":
        return "bg-green-300 text-green-500";
      case "women's clothing":
        return "bg-pink-300 text-pink-500";
      default:
        return "bg-gray-500 text-white";
    }
  };
  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className={
              "border-2 border-gray-200 p-4 rounded-lg shadow-lg" +
              " " +
              styles.product
            }
            style={{ width: "250px" }}
          >
            <Image
              src={product.image}
              alt={product.title}
              width={250}
              height={100}
              className={"rounded-lg object-cover " + styles.productimage}
            />
            <div className="font-bold text-2xl">{product.title}</div>
            <p className="text-blue-500 font-bold">{product.price} DA</p>
            <p
              className={
                categoryclass(product.category) +
                " rounded-full px-4 py-1 self-baseline font-bold"
              }
            >
              {product.category}
            </p>
            <p>{product.description.slice(0, 80) + "...."}</p>
          </div>
        );
      })}
    </div>
  );
}
export async function getStaticProps() {
  const products = await getProduct();
  return {
    props: {
      products,
    },
  };
}
