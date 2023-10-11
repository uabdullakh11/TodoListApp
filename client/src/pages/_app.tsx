import { AppProps } from "next/app";
import Layout from "@/layouts/layout";
import '@/styles/global.css';
import { useRouter } from "next/router";
import React from "react";
import Loader from "@/components/Loading/loading";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url: string) => (url === router.asPath) && setTimeout(() => { setLoading(false) }, 1500)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router.asPath, router.events])
  return (
    <Layout>
      <Head>
        <title>Todo List</title>
      </Head>
      {loading ? <Loader /> : <Component {...pageProps} />}
    </Layout>
  );
};

export default MyApp;