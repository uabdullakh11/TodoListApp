import { Header } from "@/components/Header/Header";
import { LogoTitle, PageName } from "@/styles/text";
import Head from "next/head";
import { useEffect, useState } from "react";
import TasksProvider from "@/context/TasksContext";
import Error from "../pages/_error";
import { AvatarImage } from "@/components/UserComponents/UserAvatar/userAvatarStyles";
import { BurgerMenu } from "@/components/BurgerMenu/BurgerMenu";
import Link from "next/link";
import { isToken } from "@/helpers/token";
import { useGetUserQuery } from "@/utils/services/user.service";



export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userName, setUserName] = useState<string>()
  const [linkToAvatar, setLinkToAvatar] = useState<string>("")
  const [errorCode, setErrorCode] = useState<number>()

  const { data } = useGetUserQuery("")

  useEffect(() => {
    !isToken() && setErrorCode(401)
  }, [])

  useEffect(() => {
    data && setLinkToAvatar("http://localhost:5000" + data[0].avatar)
    data && setUserName(data[0].login)

  }, [data])


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
          <PageName>{userName}</PageName>
          <Link href="account">
            <AvatarImage
              src={linkToAvatar}
              alt=""
              height={40}
              width={40}
            ></AvatarImage>
          </Link>
        </>
      </Header>
      <main>{children}</main>
    </TasksProvider>
  );
}
