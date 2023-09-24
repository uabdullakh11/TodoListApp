import type { Metadata } from "next";
import type { ReactElement } from 'react'
import styled from "styled-components";
import { Header } from "../components/Header";
import { LogoTitle, PageName } from "../styles/text";

export const metadata: Metadata = {
  title: "Login",
};

const CardBlock = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  width: 466px;
  @media (max-width: 689px) {
    width: 100%;
  }
`;

export default function AuthLayout({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <>
      <Header>
        <>
          <LogoTitle $auth={true}>To-Do</LogoTitle>
          <PageName>Authentication</PageName>
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
