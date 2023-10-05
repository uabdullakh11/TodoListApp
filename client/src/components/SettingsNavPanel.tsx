import React, { FC, useState } from "react";
import styled from "styled-components";
import { NavContainer, SortingContainer } from "@/styles/containers";
import { LogOutBtn, ProfileBtn, SecurtyBtn } from "@/styles/buttons";
import { useRouter } from "next/router";
const NavBlock = styled.div`
  font-size: 16px;
  font-weight: 400;
`;
interface SettingPanelProps {
  handleClick: (value: boolean) => void;
}
const SettingsNavPanel: FC<SettingPanelProps> = (props: SettingPanelProps) => {
  const router = useRouter()

  const [profileClick, setProfileClick] = useState<boolean>(true)
  const [securityClick, setSecurityClick] = useState<boolean>(false)

  const handleLogout = async () => {
    sessionStorage.removeItem('ACCESS_TOKEN')
    sessionStorage.removeItem('REFRESH_TOKEN')
    sessionStorage.removeItem('expires_in')
    router.push('/login')
  }

  const handleProfileClick = () => {
    setProfileClick(!profileClick)
    props.handleClick(!profileClick)
    setSecurityClick(false)
  }
  const handleSecurityClick = () => {
    setSecurityClick(!securityClick)
    setProfileClick(false)
    props.handleClick(!profileClick)
  }
  return (
    <NavBlock>
      <NavContainer>
        <SortingContainer>
          <ProfileBtn $active={profileClick} onClick={handleProfileClick}>Profile</ProfileBtn>
          <SecurtyBtn $active={securityClick} onClick={handleSecurityClick}>Security</SecurtyBtn>
        </SortingContainer>
        <LogOutBtn onClick={handleLogout}> Log out</LogOutBtn>
      </NavContainer>
    </NavBlock>
  );
};
export { SettingsNavPanel };
