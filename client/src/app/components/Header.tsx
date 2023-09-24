"use client";
import Image from "next/image";
import React, { FC } from "react";
import { HeaderBlock, ProfileLogo } from "../styles/header";
import { HeaderContainer } from "../styles/containers";
import { LogoTitle, PageName, Username } from "../styles/text";

interface HeaderProps {
  type: string;
}

const Header: FC<HeaderProps> = (props) => {
  return (
    <HeaderBlock>
      <HeaderContainer>
        {props.type === "main" && <>
          <LogoTitle $auth={false}>To-Do</LogoTitle>
          <Username>UserName</Username>
          <ProfileLogo href="account" $profile={false}>
            <Image src="../person-logo.svg" alt="" height={40} width={40}></Image>
          </ProfileLogo>
        </>}
        {props.type === "auth" && <>
          <LogoTitle $auth={true}>To-Do</LogoTitle>
          <PageName>Authentication</PageName>
        </>}
        {props.type === "profile" && <>
          <LogoTitle $auth={true}>To-Do</LogoTitle>
          <PageName>Settings</PageName>
          <ProfileLogo href="account" $profile={true}>
            <Image src="../person-logo.svg" alt="" height={40} width={40}></Image>
          </ProfileLogo>
        </>}
      </HeaderContainer>
    </HeaderBlock>
  );
};
export { Header };
