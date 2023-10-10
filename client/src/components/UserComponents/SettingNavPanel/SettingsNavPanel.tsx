import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { ButtonsContainer, LogOutBtn, UserProfileButtons } from "./settingNavPanelStyles";
import { NavBlock, NavContainer } from "@/styles/containers";

interface SettingPanelProps {
  handleClick: (value: boolean) => void;
  isBurger?: {isBurger: boolean, handleSideBarClose: ()=> void};
}
const SettingsNavPanel: FC<SettingPanelProps> = ({handleClick,isBurger }) => {
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

    handleClick(true)
  }
  const handleSecurityClick = () => {
    setSecurityClick(true)
    setProfileClick(false)

    handleClick(false)
  }
  return (
    <NavBlock>
      <NavContainer $isBurger={isBurger?.isBurger}>
        <ButtonsContainer>
          <UserProfileButtons $button="profile" $active={profileClick} onClick={handleProfileClick}>Profile</UserProfileButtons>
          <UserProfileButtons $button="security" $active={securityClick} onClick={handleSecurityClick}>Security</UserProfileButtons>
        </ButtonsContainer>
        <LogOutBtn onClick={handleLogout}>Log out</LogOutBtn>
      </NavContainer>
    </NavBlock>
  );
};
export { SettingsNavPanel };
