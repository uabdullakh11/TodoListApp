import { useEffect, type ReactElement, useState } from 'react'
import { Header } from "@/components/Header/Header";
import { LogoTitle, PageName } from "@/styles/text";
import Head from 'next/head';
import Error from "../pages/_error";
import { AvatarImage } from '@/components/UserComponents/UserAvatar/userAvatarStyles';
import { BurgerMenu } from '@/components/BurgerMenu/BurgerMenu';
import Link from 'next/link';
import AccountProvider from '@/context/AccountContext';
import { isToken } from '@/helpers/token';
import { useGetUserQuery } from '@/utils/services/user.service';


export default function AccountLayout({
  children,
}: {
  children: ReactElement;
}) {

  const [linkToAvatar, setLinkToAvatar] = useState<string>("")
  const [errorCode, setErrorCode] = useState<number>()

  const {data} = useGetUserQuery("")

  useEffect(() => {
    !isToken() && setErrorCode(403)
  }, [])

  useEffect(() => {
      data && setLinkToAvatar("http://localhost:5000" + data[0].avatar)
  }, [data])

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <AccountProvider>
      <Head>
        <title>Profile</title>
      </Head>
      <Header>
        <>
          <BurgerMenu type="account"/>
          <LogoTitle $auth={true}>To-Do</LogoTitle>
          <PageName>Settings</PageName>
          <Link href="/tasks">
            <AvatarImage src={linkToAvatar} alt="" height={40} width={40}></AvatarImage>
          </Link>
        </>
      </Header>
      <main>{children}</main>
    </AccountProvider>
  );
}
