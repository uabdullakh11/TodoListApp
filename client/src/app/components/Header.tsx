"use client";
import Image from "next/image";
import React,{ FC } from "react";
import {HeaderBlock, ProfileLogo} from "../css/header";
import { HeaderContainer } from "../css/containers";
import { LogoTitle, Username } from "../css/text";

const Header:FC = () => {
  return (
    <HeaderBlock>
      <HeaderContainer>
        <LogoTitle>To-Do</LogoTitle>
        <Username>UserName</Username>
        <ProfileLogo>
          <Image src="person-logo.svg" alt="" height={40} width={40}></Image>
        </ProfileLogo>
      </HeaderContainer>
    </HeaderBlock>
  );
};
export { Header };
