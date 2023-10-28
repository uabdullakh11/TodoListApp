import { AppProps } from "next/app";
import Layout from "@/layouts/layout";
import '@/styles/global.css';
import { useRouter } from "next/router";
import React from "react";
import Loader from "@/components/Loading/loading";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/utils/store/store";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    router.events.on("routeChangeStart", start)
    router.events.on("routeChangeComplete", end)
    router.events.on("routeChangeError", end)
    return () => {
      router.events.off("routeChangeStart", start)
      router.events.off("routeChangeComplete", end)
      router.events.off("routeChangeError", end)
    }
  }, [router.events])

  return (
    <Layout>
      <Head>
        <title>Todo List</title>
      </Head>
      <Provider store={store}>
        {loading ? <Loader /> : <Component {...pageProps} />}
      </Provider>
    </Layout>
  );
};

export default MyApp;