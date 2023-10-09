import { Header } from "@/components/Header/Header";
import { LogoTitle, Username } from "@/styles/text";
import { ProfileLogo } from "@/styles/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import TasksProvider from "@/context/TasksContext";
import Error from "../pages/_error";
import { AvatarImage } from "@/components/UserComponents/UserAvatar/userAvatarStyles";
import { BurgerMenu } from "@/components/BurgerMenu/BurgerMenu";
import { getUser } from "@/utils/services/user.service";

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userName, setUserName] = useState<string>()
  const [linkToAvatar, setLinkToAvatar] = useState<string>("http://localhost:5000/static/avatars/person-logo.svg")
  const [errorCode, setErrorCode] = useState<number>()

  useEffect(() => {
    if (!sessionStorage.getItem('ACCESS_TOKEN')) {
      setErrorCode(401)
    }
  }, [])

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await getUser()
        setUserName(res.login)
        setLinkToAvatar("http://localhost:5000" + res.avatar)
      }
      catch (err) {
        console.log(err);
      }
    }
    getUserData()
  }, [])


  if (errorCode) {
    return <Error statusCode={errorCode} />
  }


  return (
    <TasksProvider>
      <Head>
        <title>Todo List</title>
      </Head>
      <Header>
        <>
          <BurgerMenu type="tasks" />
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
    </TasksProvider>
  );
}
