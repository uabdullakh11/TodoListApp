import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { ButtonsContainer, LogOutBtn, UserProfileButtons } from "./settingNavPanelStyles";
import { NavBlock, NavContainer } from "@/styles/containers";
import { AccountContextType } from "@/types/types";
import { useContext} from "react";
import { AccountContext } from "@/context/AccountContext";
import { removeToken } from "@/helpers/token";

interface SettingPanelProps {
  isBurger?: {isBurger: boolean, handleSideBarClose: ()=> void};
}
const SettingsNavPanel: FC<SettingPanelProps> = ({isBurger }) => {
  const router = useRouter()

  const { isProfile, handleProfileClick } = useContext(AccountContext) as AccountContextType;

  const [securityClick, setSecurityClick] = useState<boolean>(false)

  const handleLogout = async () => {
    removeToken()
    router.push('/login')
  }

  const handleProfileClicked = () => {
    setSecurityClick(false)
    handleProfileClick(true)

    isBurger && isBurger.handleSideBarClose();
  }
  const handleSecurityClick = () => {
    setSecurityClick(true)
    handleProfileClick(false)

    isBurger && isBurger.handleSideBarClose();
  }
  return (
    <NavBlock>
      <NavContainer $isBurger={isBurger?.isBurger}>
        <ButtonsContainer>
          <UserProfileButtons $button="profile" $active={isProfile} onClick={handleProfileClicked}>Profile</UserProfileButtons>
          <UserProfileButtons $button="security" $active={securityClick} onClick={handleSecurityClick}>Security</UserProfileButtons>
        </ButtonsContainer>
        <LogOutBtn onClick={handleLogout}>Log out</LogOutBtn>
      </NavContainer>
    </NavBlock>
  );
};
export { SettingsNavPanel };
