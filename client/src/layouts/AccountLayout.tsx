import { useEffect, type ReactElement, useState } from 'react'
import { Header } from "@/components/Header";
import { LogoTitle, PageName } from "@/styles/text";
import { ProfileLogo } from "@/styles/header";
import Image from "next/image";
import Head from 'next/head';
import { api } from '@/utils/axios/axios';

export default function AccountLayout({
  children,
}: {
  children: ReactElement;
}) {

  const [linkToAvatar, setLinkToAvatar] = useState<string>("../person-logo.svg")
  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await api('/api/users/')
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
        <title>Profile</title>
      </Head>
      <Header>
        <>
          <LogoTitle $auth={true}>To-Do</LogoTitle>
          <PageName>Settings</PageName>
          <ProfileLogo href="account" $profile={true}>
            <Image src={linkToAvatar} alt="" height={40} width={40}></Image>
          </ProfileLogo>
        </>
      </Header>
      <main>{children}</main>
    </>
  );
}
