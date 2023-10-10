import type { ReactElement } from 'react'
import styled from "styled-components";
import { Header } from "@/components/Header/Header";
import { LogoTitle, PageName } from "@/styles/text";
import Head from 'next/head';

const CardBlock = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  width: 466px;
  
`;

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
