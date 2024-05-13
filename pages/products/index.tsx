"use client";
import React, { useEffect, useState } from "react";
import {
  Product,
  addproduct,
  category,
  deleteproduct,
  editproduct,
  filterProducts,
  getProduct,
  searchProduct,
} from "../../api/products";
import Image from "next/image";
import styles from "./product.module.css";
import Svg from "../../components/Svg";
import {
  add,
  close,
  gridicon,
  image,
  listicon,
  refresh,
  search,
  trash,
} from "../../utils/Svgs";
export default function Products({ products }: { products: Product[] }) {
  const finalproducts = React.useRef(products);
  const [productsrendered, setProductsrendered] = useState(products);
  const [type, setType] = useState("grid" as "grid" | "list");
  const [searchinput, setsearchinput] = useState("");
  const [filter, setFilter] = useState("all" as "all" | category);
  const [loading, setLoading] = useState(true);
  const [requestloading, setRequestloading] = useState(false);
  const [newproject, setNewproject] = useState({
    show: false,
    type: "add" as "add" | "edit",
    title: "",
    price: 0,
    category: "electronics" as category,
    description: "",
    image: "",
    id: 0,
  } as Partial<Product> & { show: boolean; type: "add" | "edit" });
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
  const addproductHandler = () => {
    if (requestloading) return;
    if (
      newproject.title === "" ||
      newproject.description === "" ||
      newproject.price === 0
    ) {
      alert("please fill all fields");
      return;
    }
    setRequestloading(true);
    if (newproject.type === "edit") return editproductHandler();
    addproduct({
      category: newproject.category,
      description: newproject.description,
      image: newproject.image,
      price: newproject.price,
      title: newproject.title,
    }).then(() => {
      setTimeout(() => {
        setNewproject({
          show: false,
          type: "add",
          title: "",
          price: 0,
          category: "electronics",
          description: "",
          image: "",
        });
        setRequestloading(false);
      }, 500);
    });
  };
  const editproductHandler = () => {
    editproduct({
      category: newproject.category,
      description: newproject.description,
      image: newproject.image,
      price: newproject.price,
      title: newproject.title,
      id: newproject.id,
    }).then(() => {
      setTimeout(() => {
        setNewproject({
          show: false,
          type: "add",
          title: "",
          price: 0,
          category: "electronics",
          description: "",
          image: "",
        });
        setRequestloading(false);
      }, 500);
    });
  };
  const deleteproductHandler = (id: number) => {
    if (requestloading) return;
    setRequestloading(true);
    deleteproduct(id).then(() => {
      setProductsrendered((prev) =>
        prev.filter((product) => product.id !== id)
      );
      finalproducts.current = finalproducts.current.filter(
        (product) => product.id !== id
      );
    });
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
              click={() => {
                setType("grid");
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 500);
              }}
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
                setTimeout(() => {
                  setLoading(false);
                }, 500);
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
                    <div
                      // className=""
                      className={
                        "bg-gray-200 animate-pulse " +
                        (type == "grid"
                          ? styles.productimageskeleton
                          : styles.productimagelist)
                      }
                    ></div>
                    <div className="animate-pulse flex flex-col gap-2 h-full w-full">
                      {type == "grid" ? (
                        <>
                          <div className="bg-gray-200 w-3/4 h-16 rounded-lg"></div>
                          <p
                            className={"bg-gray-200 w-3/4 h-16 rounded-lg"}
                          ></p>
                        </>
                      ) : (
                        <>
                          <div className="bg-gray-200 w-40 h-8 rounded-lg"></div>
                          <p
                            className={"bg-gray-200 w-3/4 h-16 rounded-lg"}
                          ></p>
                          <p
                            className={"bg-gray-200 w-full h-32 rounded-lg"}
                          ></p>
                        </>
                      )}

                      <div className="bg-gray-200 w-60 h-8 rounded-lg"></div>
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
                          onClick={() => {
                            setNewproject({
                              category: product.category,
                              description: product.description,
                              image: product.image,
                              price: product.price,
                              title: product.title,
                              type: "edit",
                              id: product.id,
                              show: true,
                            });
                          }}
                        >
                          Modify product
                        </div>
                        <Svg
                          path={trash.path}
                          view={trash.viewBox}
                          classlist="cursor-pointer fill-current text-red-800 w-10 h-10 p-2 rounded-lg "
                          click={() => deleteproductHandler(product.id)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        {productsrendered.length === 0 && (
          <div className="flex flex-col gap-12 justify-center items-center h-full w-full">
            <Image
              src="/404.png"
              alt="no products found"
              width={500}
              height={500}
            />
            <div className="text-6xl font-bold text-gray-500">
              No products found
            </div>
          </div>
        )}
        <Svg
          path={add.path}
          view={add.viewBox}
          classlist="cursor-pointer fill-current text-white fixed bottom-4 right-4 w-16 h-16 bg-blue-600 p-4 rounded-full hover:bg-blue-800"
          click={() =>
            setNewproject({
              category: "electronics",
              description: "",
              image: "",
              price: 0,
              title: "",
              type: "add",

              show: true,
            })
          }
        />
      </div>
      {newproject.show && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute bg-white w-2/6 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-auto"
            style={{
              height: "90%",
            }}
          >
            <div className="flex w-full justify-between items-center h-20 border-b-2 border-gray-200">
              <div className="text-2xl font-bold text-gray-800 p-4">
                {newproject.type === "add" ? "Add " : "Edit "} Product
              </div>
              <Svg
                path={close.path}
                view={close.viewBox}
                classlist="cursor-pointer fill-current text-red-800 w-12 h-12 p-2 pr-6 rounded-lg "
                click={() => setNewproject({ ...newproject, show: false })}
              />
            </div>
            <div className="flex flex-col p-4 w-full h-full flex-grow">
              <div className="w-full h-full bg-gray-200 border-4 border-indigo-200 rounded-lg border-dashed flex flex-col items-center justify-center">
                <Svg
                  path={image.path}
                  view={image.viewBox}
                  classlist="w-16 h-16 fill-current text-indigo-500"
                />
                <p className="text-indigo-500 text-2xl font-bold">
                  Drag & drop image or click to upload
                </p>
              </div>
            </div>
            <div className="flex h-full flex-col mx-4 mr-6 gap-2">
              <div className="text-2xl font-bold text-gray-800 p-2">Title</div>
              <input
                type="text"
                className="bg-gray-100 rounded-lg m-2 text-xl w-full p-2 border-2 border-gray-200"
                value={newproject.title}
                onChange={(e) =>
                  setNewproject({ ...newproject, title: e.target.value })
                }
              />
              <div className="text-2xl font-bold text-gray-800 p-2">
                Description
              </div>
              <textarea
                className="bg-gray-100 rounded-lg m-2 text-xl w-full p-2 border-2 border-gray-200 resize-none"
                value={newproject.description}
                onChange={(e) =>
                  setNewproject({ ...newproject, description: e.target.value })
                }
              ></textarea>
              <div className="text-2xl font-bold text-gray-800 p-2">Price</div>
              <input
                type="number"
                className="bg-gray-100 rounded-lg m-2 text-xl w-full p-2 border-2 border-gray-200"
                value={newproject.price}
                onChange={(e) =>
                  setNewproject({ ...newproject, price: +e.target.value })
                }
              />
              <div className="text-2xl font-bold text-gray-800 p-2">
                Category
              </div>
              <select
                className="bg-gray-100 rounded-lg m-2 text-xl w-full p-2 border-2 border-gray-200"
                value={newproject.category}
                onChange={(e) =>
                  setNewproject({
                    ...newproject,
                    category: e.target.value as category,
                  })
                }
              >
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">{`men's clothing`}</option>
                <option value="women's clothing">{`women's clothing`}</option>
              </select>
              <div
                className="bg-indigo-600 text-white px-8 mb-8 mt-2  h-11 flex self-end items-center rounded-lg text-xl text-center cursor-pointer"
                onClick={addproductHandler}
              >
                {requestloading ? (
                  <Svg
                    path={refresh.path}
                    view={refresh.viewBox}
                    classlist="w-8 h-8 animate-spin text-white fill-current"
                  />
                ) : newproject.type === "add" ? (
                  "Add product"
                ) : (
                  "Edit product"
                )}
              </div>
            </div>
          </div>
          <div
            className="bg-gray-900 bg-opacity-80 w-full h-full z-50"
            onClick={() => setNewproject({ ...newproject, show: false })}
          ></div>
        </div>
      )}
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
