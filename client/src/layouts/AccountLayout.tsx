import type { ReactElement } from 'react'
import { Header } from "@/components/Header";
import { LogoTitle, PageName } from "@/styles/text";
import { ProfileLogo } from "@/styles/header";
import Image from "next/image";
import Head from 'next/head';

export default function AccountLayout({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <>
    <Head>
      <title>Profile</title>
    </Head>
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
