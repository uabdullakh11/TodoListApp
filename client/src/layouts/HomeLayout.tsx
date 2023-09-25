import { Header } from "@/components/Header";
import { LogoTitle, Username } from "@/styles/text";
import { ProfileLogo } from "@/styles/header";
import Image from "next/image";
import Head from "next/head";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Todo List</title>
      </Head>
      <Header>
        <>
          <LogoTitle>To-Do</LogoTitle>
          <Username>UserName</Username>
          <ProfileLogo href="account">
            <Image
              src="../person-logo.svg"
              alt=""
              height={40}
              width={40}
            ></Image>
          </ProfileLogo>
        </>
      </Header>
      <main>{children}</main>
    </>
  );
}
