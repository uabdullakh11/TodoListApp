import type { ReactElement } from 'react'
import Head from 'next/head';

export default function ErrorLayout({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <>
    <Head>
      <title>Error Page</title>
    </Head>
      <main>{children}</main>
    </>
  );
}
