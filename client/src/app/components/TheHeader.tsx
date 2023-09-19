"use client";
import styled from "styled-components";
import Image from "next/image";
const Text = styled.div`
  font-family: Roboto, sans-serif;
  color: #9333ea;
`;
const Header = styled.header`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 5px 15px;
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
`;
const LogoTitle = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  text-align: left;
`;
const Username = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  text-align: left;
`;
const ProfileLogo = styled.div`cursor: pointer;`;
const TheHeader = () => {
  return (
    <Header>
      <HeaderContainer>
        <LogoTitle>To-Do</LogoTitle>
        <Username>UserName</Username>
        <ProfileLogo>
          <Image src="person-logo.svg" alt="" height={40} width={40}></Image>
        </ProfileLogo>
      </HeaderContainer>
    </Header>
  );
};
export { TheHeader };
