import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { ButtonsContainer, LogOutBtn, ProfileBtn, SecurtyBtn } from "./settingNavPanelStyles";
import { NavBlock, NavContainer } from "@/styles/containers";

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
        <ButtonsContainer>
          <ProfileBtn $active={profileClick} onClick={handleProfileClick}>Profile</ProfileBtn>
          <SecurtyBtn $active={securityClick} onClick={handleSecurityClick}>Security</SecurtyBtn>
        </ButtonsContainer>
        <LogOutBtn onClick={handleLogout}> Log out</LogOutBtn>
      </NavContainer>
    </NavBlock>
  );
};
export { SettingsNavPanel };
