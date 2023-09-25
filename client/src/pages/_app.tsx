import { AppProps } from "next/app";
import Layout from "@/layouts/layout";
import '@/styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
      <Component {...pageProps} />
  </Layout>
);

export default MyApp;