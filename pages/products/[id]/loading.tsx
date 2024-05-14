import React from "react";

export default function LoadingProduct() {
  return (
    <div className="flex flex-col p-4 ">
      <div className="flex flex-row items-center gap-x-2">
        <div className="bg-gray-200 animate-pulse h-8 w-24 rounded-md"></div>
        <div className="text-2xl text-gray-400 font-bold">/</div>
        <div className="bg-gray-200 animate-pulse h-8 w-24 rounded-md"></div>
      </div>
      <div
        className="grid gap-12 mt-12"
        style={{
          gridTemplateColumns: "1fr 3fr",
        }}
      >
        <div>
          <div className="bg-gray-200 animate-pulse h-96 w-full rounded-md"></div>
        </div>
        <div className="flex flex-col gap-4 items-start">
          <div className="flex flex-row items-center gap-x-2 w-full">
            {" "}
            <div className="bg-gray-200 animate-pulse h-20 w-full rounded-md"></div>
            <div className="relative">
              <div className="bg-gray-200 animate-pulse h-12 w-12 rounded-md"></div>
            </div>
            <div className="bg-gray-200 animate-pulse h-8 w-8 rounded-md"></div>
          </div>
          <div className="bg-gray-200 animate-pulse h-16 w-40 rounded-md"></div>
          <div className="bg-gray-200 animate-pulse h-12 w-32 rounded-md"></div>

          <div className="bg-gray-200 animate-pulse h-80 w-full rounded-md"></div>
        </div>
      </div>
      <div className="text-4xl font-bold text-gray-700 mt-12">
        Related Products
      </div>
      {/* <div
        className="grid gap-4 mt-4"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
      >
        {related.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div> */}
    </div>
  );
}
