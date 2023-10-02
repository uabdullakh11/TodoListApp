import { Header } from "@/components/Header";
import { AvatarImage, LogoTitle, Username } from "@/styles/text";
import { ProfileLogo } from "@/styles/header";
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
  const [linkToAvatar, setLinkToAvatar] = useState<string>("http://localhost:5000/static/avatars/person-logo.svg")
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      router.push("/login");
    }
    return () => { }
  }, [router])

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await api('/api/users/')
        setUserName(res.data[0].login)
        setLinkToAvatar("http://localhost:5000"+res.data[0].avatar)
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
            <AvatarImage
              src={linkToAvatar}
              alt=""
              height={40}
              width={40}
            ></AvatarImage>
          </ProfileLogo>
        </>
      </Header>
      <main>{children}</main>
    </>
  );
}
