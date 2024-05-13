import React from "react";
import { Product, category, getProduct } from "../../api/products";
import Image from "next/image";
import styles from "./product.module.css";
import Svg from "../../components/Svg";
import { gridicon, listicon, search } from "../../utils/Svgs";
export default function Products({ products }: { products: Product[] }) {
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
    <main className={styles.grid}>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex bg-gray-100 w-full justify-between items-center rounded-lg">
          <div className="flex gap-2 items-center pr-4">
            <Svg
              path={gridicon.path}
              view={gridicon.viewBox}
              classlist="cursor-pointer fill-current text-gray-800 w-10 h-10 bg-gray-300 p-2 rounded-lg hover:bg-indigo-200 hover:text-gray-800"
            />
            <Svg
              path={listicon.path}
              view={listicon.viewBox}
              classlist="cursor-pointer fill-current text-gray-800 w-10 h-10 bg-gray-300 p-2 rounded-lg hover:bg-indigo-200 hover:text-gray-800"
            />
          </div>{" "}
          <div className="flex">
            {" "}
            <div className="flex bg-gray-200 rounded-lg text-gray-500 p-2 items-center w-96">
              <input
                type="text"
                className="outline-none bg-transparent w-full text-xl"
                placeholder="search for products"
              />
              <Svg
                path={search.path}
                view={search.viewBox}
                classlist="cursor-pointer fill-current text-gray-800 w-6 h-6  hover:text-gray-700"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-xl font-bold text-gray-500 p-4">sort by:</div>
            <select className="bg-gray-200 rounded-lg text-gray-500 p-2 min-w-96 text-xl">
              <option>price</option>
              <option>category</option>
              <option>rating</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className={
                  "border-2 border-gray-200 p-4 rounded-lg shadow-lg relative" +
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
                <div className="font-bold text-2xl">
                  {product.title.slice(0, 60) +
                    (product.title.length > 60 ? "..." : "")}
                </div>
                <p className="text-blue-600 font-bold text-xl">
                  {product.price} DA
                </p>
                <p
                  className={
                    categoryclass(product.category) +
                    " rounded-full px-4 py-1 self-baseline font-bold absolute top-4 right-4 text-lg"
                  }
                >
                  {product.category}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
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
