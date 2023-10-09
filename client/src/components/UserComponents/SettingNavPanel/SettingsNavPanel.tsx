import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { ButtonsContainer, LogOutBtn, ProfileBtn, SecurtyBtn } from "./settingNavPanelStyles";
import { NavBlock, NavContainer } from "@/styles/containers";

interface SettingPanelProps {
  handleClick: (value: boolean) => void;
  isBurger?: boolean;
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
    setProfileClick(true)
    setSecurityClick(false)
    props.handleClick(true)
  }
  const handleSecurityClick = () => {
    setSecurityClick(true)
    setProfileClick(false)
    props.handleClick(false)
  }
  return (
    <NavBlock>
      <NavContainer $isBurger={props.isBurger}>
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
