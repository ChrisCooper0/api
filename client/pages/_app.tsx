import "../styles/globals.ts";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { GlobalStyle } from "../styles/globals";
import { wrapper } from "../store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default wrapper.withRedux(MyApp);
