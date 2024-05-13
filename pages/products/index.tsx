"use client";
import React, { useEffect, useState } from "react";
import {
  Product,
  category,
  filterProducts,
  getProduct,
  searchProduct,
} from "../../api/products";
import Image from "next/image";
import styles from "./product.module.css";
import Svg from "../../components/Svg";
import { add, gridicon, listicon, search, trash } from "../../utils/Svgs";
export default function Products({ products }: { products: Product[] }) {
  const finalproducts = React.useRef(products);
  const [productsrendered, setProductsrendered] = useState(products);
  const [type, setType] = useState("grid" as "grid" | "list");
  const [searchinput, setsearchinput] = useState("");
  const [filter, setFilter] = useState("all" as "all" | category);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (searchinput.length < 3) {
      setProductsrendered(finalproducts.current);
      setLoading(false);

      return;
    }
    setLoading(true);
    const search = setTimeout(() => {
      // No ENDPOINT FOR SEARCHING PRODUCTS
      // searchProduct(searchinput).then((data) => setProductsrendered(data));

      searchproducts(searchinput);
    }, 1000);
    const searchproducts = (search: string) => {
      let temp = finalproducts.current.filter((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase());
      });
      setProductsrendered(temp);
      setLoading(false);
    };
    return () => clearTimeout(search);
  }, [searchinput]);
  useEffect(() => {
    setLoading(true);
    if (filter === "all") {
      setProductsrendered(finalproducts.current);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      return;
    }
    filterProducts(filter).then((data) => {
      setProductsrendered(data);
      setLoading(false);
    });
  }, [filter]);

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
      <div className="flex flex-col gap-4 p-4 relative">
        <div className="flex bg-gray-100 w-full justify-between items-center rounded-lg px-4 py-2">
          <div className="flex gap-2 items-center pr-4">
            <Svg
              path={gridicon.path}
              view={gridicon.viewBox}
              classlist={`cursor-pointer fill-current  w-10 h-10  p-2 rounded-lg  ${
                type !== "grid"
                  ? "bg-gray-300 text-gray-800 hover:bg-indigo-200 hover:text-gray-800"
                  : "bg-blue-500 text-white "
              }
                `}
              click={() => setType("grid")}
            />
            <Svg
              path={listicon.path}
              view={listicon.viewBox}
              classlist={`cursor-pointer fill-current  w-10 h-10  p-2 rounded-lg  ${
                type !== "list"
                  ? "bg-gray-300 text-gray-800 hover:bg-indigo-200 hover:text-gray-800"
                  : "bg-blue-500 text-white "
              }
                `}
              click={() => {
                setType("list");
                setLoading(true);
              }}
            />
          </div>{" "}
          <div className="flex">
            {" "}
            <div className="flex bg-gray-200 rounded-lg text-gray-500 p-2 items-center w-96">
              <input
                type="text"
                className="outline-none bg-transparent w-full text-xl"
                placeholder="search for products"
                value={searchinput}
                onChange={(e) => {
                  setsearchinput(e.target.value);
                }}
              />
              <Svg
                path={search.path}
                view={search.viewBox}
                classlist="cursor-pointer fill-current text-gray-800 w-6 h-6  hover:text-gray-700"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-xl font-bold text-gray-500 p-4">
              Filter by:
            </div>
            <select
              className="bg-gray-200 rounded-lg text-gray-500 p-2 min-w-96 text-xl"
              value={filter}
              onChange={(e) => setFilter(e.target.value as category)}
            >
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">{`men's clothing`}</option>
              <option value="women's clothing">{`women's clothing`}</option>
            </select>
          </div>
        </div>
        <div
          className={type === "grid" ? styles.products : styles.productslist}
        >
          {loading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => {
                return (
                  <div
                    key={index}
                    className={
                      "border-2 border-gray-200 p-4 rounded-lg shadow-lg relative" +
                      " " +
                      (type === "grid" ? styles.product : styles.productlist)
                    }
                  >
                    <div className="animate-pulse flex flex-col gap-2 h-full">
                      <div className="bg-gray-200 w-full h-96 rounded-lg"></div>
                      <div className="bg-gray-200 w-3/4 h-16 rounded-lg"></div>
                      <br />
                      <div className="flex w-full justify-between items-end pb-4">
                        <div className="bg-gray-200 w-4/6 h-8 rounded-lg"></div>
                        <div className="bg-gray-200 w-1/6 h-8 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {productsrendered.map((product) => {
                return (
                  <div
                    key={product.id}
                    className={
                      "border-2 border-gray-200 p-4 rounded-lg shadow-lg relative" +
                      " " +
                      (type === "grid" ? styles.product : styles.productlist)
                    }
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={250}
                      height={100}
                      className={
                        "rounded-lg object-cover " +
                        (type == "grid"
                          ? styles.productimage
                          : styles.productimagelist)
                      }
                    />
                    <div className="flex flex-col flex-grow gap-2 h-full">
                      {type == "grid" ? (
                        <>
                          <div className="font-bold text-2xl">
                            {product.title.slice(0, 60) +
                              (product.title.length > 60 ? "..." : "")}
                          </div>
                          <p
                            className={
                              categoryclass(product.category) +
                              " rounded-full px-4 py-1 self-baseline font-bold absolute top-4 right-4 text-lg"
                            }
                          >
                            {product.category}
                          </p>
                        </>
                      ) : (
                        <>
                          <p
                            className={
                              categoryclass(product.category) +
                              " rounded-full px-4 py-1 self-baseline font-bold"
                            }
                          >
                            {product.category}
                          </p>
                          <div className="font-bold text-4xl">
                            {product.title}
                          </div>
                        </>
                      )}

                      <p className="text-blue-600 font-bold text-xl">
                        {product.price} DA
                      </p>
                      {type == "list" && (
                        <p className="text-gray-600 font-bold text-xl">
                          {product.description}
                        </p>
                      )}

                      <div className="flex w-full flex-grow items-end pb-4">
                        <div
                          className="bg-blue-600 text-white p-2 rounded-lg w-32 text-xl flex-grow text-center cursor-pointer"
                          onClick={() => alert("add to cart")}
                        >
                          Modify product
                        </div>
                        <Svg
                          path={trash.path}
                          view={trash.viewBox}
                          classlist="cursor-pointer fill-current text-red-800 w-10 h-10 p-2 rounded-lg "
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <Svg
          path={add.path}
          view={add.viewBox}
          classlist="cursor-pointer fill-current text-white fixed bottom-4 right-4 w-16 h-16 bg-blue-600 p-4 rounded-full hover:bg-blue-800"
        />
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
