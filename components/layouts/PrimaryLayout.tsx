import Head from "next/head";
import Header from "./Header";

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<"div"> {
  title?: string;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({
  children,
  title = "Easydoo -Test Project",

  ...divProps
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div {...divProps} className={`min-h-screen flex flex-col`}>
        <Header />
        <main className="p-5">{children}</main>
        <div className="m-auto" />
      </div>
    </>
  );
};

export default PrimaryLayout;
