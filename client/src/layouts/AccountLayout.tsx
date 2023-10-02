import { useEffect, type ReactElement, useState } from 'react'
import { Header } from "@/components/Header";
import { AvatarImage, LogoTitle, PageName } from "@/styles/text";
import { ProfileLogo } from "@/styles/header";
import Head from 'next/head';
import { api } from '@/utils/axios/axios';

export default function AccountLayout({
  children,
}: {
  children: ReactElement;
}) {

  const [linkToAvatar, setLinkToAvatar] = useState<string>("http://localhost:5000/static/avatars/person-logo.svg")

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await api('/api/users/')
        setLinkToAvatar("http://localhost:5000" + res.data[0].avatar)
      }
      catch (err) {
        console.log(err);
      }
    }
    getUserData()
    // return () => { }
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
          <ProfileLogo href="/" $profile={true}>
            <AvatarImage src={linkToAvatar} alt="" height={40} width={40}></AvatarImage>
          </ProfileLogo>
        </>
      </Header>
      <main>{children}</main>
    </>
  );
}
