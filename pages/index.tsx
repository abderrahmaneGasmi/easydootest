"use client";
import Image from "next/image";
import Link from "next/link";
import PrimaryLayout from "../components/layouts/PrimaryLayout";
import { NextPageWithLayout } from "./page";
import { redirect } from "next/navigation";
const Home: NextPageWithLayout = () => {
  //   if (typeof window === "undefined") return null;
  //   const local = localStorage.getItem("token");
  //   if (!local) {
  //     return redirect("/auth");
  //   }

  return (
    <section className="flex flex-col items-center gap-y-5 mt-12 sm:mt-36">
      das
    </section>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
