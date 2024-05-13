// import type { AppProps } from "next/app";
import "./globals.css";
import { NextPageWithLayout } from "./page";
// import ContextProviders from "../context";

// interface AppPropsWithLayout extends AppProps {
//   Component: NextPageWithLayout;
// }

// function MyApp({ Component, pageProps }: AppPropsWithLayout) {
//   const getLayout = Component.getLayout || ((page) => page);

//   return getLayout(
//     <ContextProviders>
//       <Component {...pageProps} />
//     </ContextProviders>
//   );
// }

// export default MyApp;
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import ContextProviders from "../context";
import Header from "../components/layouts/Header";

type AppOwnProps = { example: string };

export default function MyApp({
  Component,
  pageProps,
  example,
}: AppProps & AppOwnProps) {
  return (
    <>
      {" "}
      <ContextProviders>
        <Header />
        <Component {...pageProps} />{" "}
      </ContextProviders>
    </>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  return { ...ctx, example: "data" };
};
