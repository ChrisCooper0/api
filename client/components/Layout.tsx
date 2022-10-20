import Head from "next/head";
import Header from "./Header";

const Layout = ({ children }: any): any => {
  return (
    <>
      <Head>
        <title>API</title>
        <link rel="icon" href="./favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Monoton&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header text="API" />
      {children}
    </>
  );
};

export default Layout;
