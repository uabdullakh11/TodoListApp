import type { ReactElement } from 'react'
import Head from 'next/head';

export default function NotFoundPageLayout({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <>
    <Head>
      <title>Page Not Found</title>
    </Head>
      <main>{children}</main>
    </>
  );
}
