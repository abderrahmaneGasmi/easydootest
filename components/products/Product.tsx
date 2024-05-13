import React from "react";
import { Product, category } from "../../api/products";
import styles from "./product.module.css";
import Image from "next/image";
import Link from "next/link";
export default function ProductItem({ product }: { product: Product }) {
  const categoryclass = (category: category) => {
    switch (category) {
      case "electronics":
        return "bg-blue-300 text-blue-600";
      case "jewelery":
        return "bg-yellow-300 text-yellow-600";
      case "men's clothing":
        return "bg-green-300 text-green-600";
      case "women's clothing":
        return "bg-pink-300 text-pink-600";
      default:
        return "bg-gray-500 text-white";
    }
  };
  return (
    <div
      key={product.id}
      className={
        "border-2 border-gray-200 p-4 rounded-lg shadow-lg relative" +
        " " +
        styles.product
      }
      style={{
        height: "fit-content",
      }}
    >
      <Link href={"/products/" + product.id}>
        <Image
          src={product.image}
          alt={product.title}
          width={250}
          height={100}
          className={"rounded-lg object-cover " + styles.productimage}
        />
      </Link>
      <div className="flex flex-col flex-grow gap-2 h-full">
        <div className="font-bold text-2xl">
          <Link href={"/products/" + product.id}>
            {product.title.slice(0, 60) +
              (product.title.length > 60 ? "..." : "")}
          </Link>
        </div>
        <p
          className={
            categoryclass(product.category) +
            " rounded-full px-4 py-1 self-baseline font-bold absolute top-4 right-4 text-lg"
          }
        >
          {product.category}
        </p>

        <p className="text-blue-600 font-bold text-xl">{product.price} DA</p>
      </div>
    </div>
  );
}
