import { useEffect, type ReactElement, useState } from 'react'
import { Header } from "@/components/Header/Header";
import { LogoTitle, PageName } from "@/styles/text";
import { ProfileLogo } from "@/styles/header";
import Head from 'next/head';
// import Error from 'next/error'
import Error from "../pages/_error";
import { getUser } from '@/utils/services/user.service';
import { AvatarImage } from '@/components/UserComponents/UserAvatar/userAvatarStyles';
import { BurgerMenu } from '@/components/BurgerMenu/BurgerMenu';


export default function AccountLayout({
  children,
}: {
  children: ReactElement;
}) {

  const [linkToAvatar, setLinkToAvatar] = useState<string>("http://localhost:5000/static/avatars/person-logo.svg")
  const [errorCode, setErrorCode] = useState<number>()

  useEffect(() => {
    if (!sessionStorage.getItem('ACCESS_TOKEN')) {
      setErrorCode(403)
    }
  }, [])

  useEffect(() => {
    const getUserData = async () => {
      try {
        // const res = await api('/api/users/')
        // setLinkToAvatar("http://localhost:5000" + res.data[0].avatar)
        const res = await getUser()
        setLinkToAvatar("http://localhost:5000" + res.avatar)
      }
      catch (err) {
        console.log(err);
      }
    }
    getUserData()
    // return () => { }
  }, [])

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Header>
        <>
          <BurgerMenu type="account"/>
          <LogoTitle $auth={true}>To-Do</LogoTitle>
          <PageName>Settings</PageName>
          <ProfileLogo href="/tasks" $profile={true}>
            <AvatarImage src={linkToAvatar} alt="" height={40} width={40}></AvatarImage>
          </ProfileLogo>
        </>
      </Header>
      <main>{children}</main>
    </>
  );
}
