import React from "react";
import { useRouter } from "next/router";
import {
  Product,
  category,
  getProduct,
  getProductById,
} from "../../../api/products";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Svg from "../../../components/Svg";
import { star } from "../../../utils/Svgs";
import ProductItem from "../../../components/products/Product";
export default function ProductPage({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const router = useRouter();
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
    <div className="flex flex-col p-4 ">
      <div className="flex flex-row items-center gap-x-2">
        <div className="text-2xl text-gray-400 font-bold">Home</div>
        <div className="text-2xl text-gray-400 font-bold">/</div>
        <div className="text-2xl text-gray-400 font-bold">
          Product {router.query.id}
        </div>
      </div>
      <div
        className="grid gap-12 mt-12"
        style={{
          gridTemplateColumns: "1fr 3fr",
        }}
      >
        <div>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 items-start">
          <div className="flex flex-row items-center gap-x-2">
            {" "}
            <h1
              className="text-5xl font-bold text-gray-700
          "
            >
              {product.title}
            </h1>
            <div className="relative">
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
          <p className="text-3xl font-bold bg-gray-200 p-2 rounded-md text-gray-700">
            {product.price}DA
          </p>
          <p className="text-lg">{product.description}</p>
        </div>
      </div>
      <div className="text-4xl font-bold text-gray-700 mt-12">
        Related Products
      </div>
      <div
        className="grid gap-4 mt-4"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
      >
        {related.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params) return { props: { product: {} } };
  console.log(context.params.id);
  const id = context.params.id as string;
  const product = await getProductById(id);
  const related = await getProduct({ limit: 5 });
  return {
    props: {
      product: product,
      related: related,
    },
  };
}
