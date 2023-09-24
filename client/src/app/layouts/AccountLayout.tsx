import type { Metadata } from "next";
import type { ReactElement, ReactNode } from 'react'
import { Header } from "../components/Header";
import { LogoTitle, PageName } from "../styles/text";
import { ProfileLogo } from "../styles/header";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountLayout({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <>
      <Header>
        <>
          <LogoTitle $auth={true}>To-Do</LogoTitle>
          <PageName>Settings</PageName>
          <ProfileLogo href="account" $profile={true}>
            <Image src="../person-logo.svg" alt="" height={40} width={40}></Image>
          </ProfileLogo>
        </>
      </Header>
      <main>{children}</main>
    </>
  );
}
