import React, { JSXElementConstructor, ReactElement, useState } from "react";
import { useRouter } from "next/router";
import {
  Product,
  category,
  filterProducts,
  getProduct,
  getProductById,
} from "../../../api/products";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Svg from "../../../components/Svg";
import { star } from "../../../utils/Svgs";
import ProductItem from "../../../components/products/Product";
import Link from "next/link";
import PrimaryLayout from "../../../components/layouts/PrimaryLayout";
import LoadingProduct from "./loading";
import styles from "./productitem.module.css";

function ProductPage() {
  // { product }: { product: Product }
  const router = useRouter();
  const [related, setRelated] = useState([] as Product[]);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({} as Product);
  const checkobjempty = (obj: any) => {
    if (!obj) return true;
    return Object.keys(obj).length === 0;
  };
  React.useEffect(() => {
    // if (!product.id) return;
    if (!router.query.id) return;

    setIsLoading(true);
    let res = getProductById(router.query.id as string);
    res.then((data) => {
      setProduct(data as Product);
      setIsLoading(false);
    });
  }, [router.query.id]);
  React.useEffect(() => {
    if (checkobjempty(product)) return;
    filterProducts(product.category).then((data) => {
      setRelated(data);
    });
  }, [product]);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

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
  if (isLoading) return <LoadingProduct />;
  if (checkobjempty(product) && !isLoading)
    return (
      <div className="flex flex-col gap-12 justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/404.png"
          alt="no products found"
          width={500}
          height={500}
        />
        <div className="text-6xl font-bold text-gray-500">
          No products found
        </div>
        <div className="bg-blue-500 text-white py-2 px-4 rounded-md text-2xl font-bold">
          <Link href="/products">Go back to home</Link>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col p-4 ">
      <div className="flex flex-row items-center gap-x-2">
        <div className="text-2xl text-gray-400 font-bold">
          <Link href="/products">Home</Link>
        </div>
        <div className="text-2xl text-gray-400 font-bold">/</div>
        <div className="text-2xl text-gray-400 font-bold">
          Product {router.query.id}
        </div>
      </div>
      <div className={"grid gap-12 mt-12 " + styles.grid}>
        <div className={styles.flex}>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className={" object-cover " + styles.image}
          />
          <div
            className={
              "flex flex-row items-center gap-x-2" + " " + styles.title
            }
          >
            {" "}
            <h1 className={"text-5xl font-bold text-gray-700"}>
              {product.title}
            </h1>
            <div className="relative w-fit">
              <Svg
                path={star.path}
                view={star.viewBox}
                classlist="w-14 h-14 text-yellow-500 fill-current"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md font-bold z-50 text-white">
                {product.rating.rate}
              </div>
            </div>
            <div className="text-md font-bold text-gray-500">
              ({product.rating.count})
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-start">
          <div
            className={
              "flex flex-row items-center gap-x-2" + " " + styles.secondtitle
            }
          >
            {" "}
            <h1 className={"text-5xl font-bold text-gray-700"}>
              {product.title}
            </h1>
            <div className="relative w-fit">
              <Svg
                path={star.path}
                view={star.viewBox}
                classlist="w-14 h-14 text-yellow-500 fill-current"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md font-bold z-50 text-white">
                {product.rating.rate}
              </div>
            </div>
            <div className="text-md font-bold text-gray-500">
              ({product.rating.count})
            </div>
          </div>

          <div
            className={`p-2 rounded-full text-xl font-bold px-6 ${categoryclass(
              product.category
            )} text-center`}
          >
            {product.category}
          </div>

          <div className={"gap-4 " + styles.group}>
            <p className="text-xl">{product.description}</p>{" "}
            <p className="text-4xl font-bold bg-gray-200 py-2 px-8 rounded-md text-gray-700">
              {product.price}DA
            </p>{" "}
          </div>
        </div>
      </div>
      <div className="text-4xl font-bold text-gray-700 mt-12">
        Related Products
      </div>
      <div className={"mt-4 " + styles.products}>
        {related.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
export default ProductPage;
ProductPage.getLayout = (
  page: ReactElement<any, string | JSXElementConstructor<any>>
) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   if (!context.params) return { props: { product: {} } };
//   console.log(context.params.id);
//   const id = context.params.id as string;
//   try {
//     const product = await getProductById(id);
//     return {
//       props: {
//         product: product,
//       },
//     };
//   } catch (e) {
//     console.log(e);
//     return {
//       props: {
//         product: {},
//       },
//     };
//   }
// }
