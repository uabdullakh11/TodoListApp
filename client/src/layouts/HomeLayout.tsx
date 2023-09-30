import { Header } from "@/components/Header";
import { LogoTitle, Username } from "@/styles/text";
import { ProfileLogo } from "@/styles/header";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import { api } from "@/utils/axios/axios";
import { useRouter } from "next/router";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userName, setUserName] = useState<string>()
  const [linkToAvatar, setLinkToAvatar] = useState<string>("../person-logo.svg")
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      router.push("/login");
    }
  }, [])

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await api('/api/users/')
        setUserName(res.data[0].login)
        setLinkToAvatar(res.data[0].avatarUrl)
      }
      catch (err) {
        console.log(err);
      }
    }
    getUserData()
    return () => { }
  }, [])
  return (
    <>
      <Head>
        <title>Todo List</title>
      </Head>
      <Header>
        <>
          <LogoTitle>To-Do</LogoTitle>
          <Username>{userName}</Username>
          <ProfileLogo href="account">
            <Image
              src={linkToAvatar}
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
