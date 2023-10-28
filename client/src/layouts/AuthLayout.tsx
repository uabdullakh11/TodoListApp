import type { ReactElement } from 'react'
import { Header } from "@/components/Header/Header";
import { LogoTitle, PageName } from "@/styles/text";
import Head from 'next/head';
import { CardBlock } from '@/styles/containers';

export default function AuthLayout({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <>
    <Head>
      <title>Authentication</title>
    </Head>
      <Header>
        <>
          <LogoTitle $auth={true}>To-Do</LogoTitle>
          <PageName $auth={true}>Authentication</PageName>
        </>
      </Header>
      <main>
        <CardBlock>
          {children}
        </CardBlock>
      </main>
    </>
  );
}
