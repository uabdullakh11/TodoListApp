import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { ButtonsContainer, DeleteAccountBtn, LogOutBtn, UserProfileButtons } from "./settingNavPanelStyles";
import { NavBlock, NavContainer } from "@/styles/containers";
import { AccountContextType } from "@/types/types";
import { useContext } from "react";
import { AccountContext } from "@/context/AccountContext";
import { removeToken } from "@/helpers/token";
import useModal from "@/utils/hooks/useModal";
import { Modal } from "../../Modal/Modal";
import { ModalBody, ModalButtons, ModalCloseButton, ModalDeleteButton, ModalHeader, ModalSaveButton, ModalText } from "../../Modal/modalStyles";
import { deleteUser } from "@/utils/services/user.service";
import { logout } from "@/utils/services/auth.service";


interface SettingPanelProps {
  isBurger?: { isBurger: boolean, handleSideBarClose: () => void };
}

const SettingsNavPanel: FC<SettingPanelProps> = ({ isBurger }) => {
  const router = useRouter()

  const { isProfile, handleProfileClick } = useContext(AccountContext) as AccountContextType;
  const [isShowingModal, toggleModal] = useModal();

  const [securityClick, setSecurityClick] = useState<boolean>(false)
  const [typeModal, setTypeModal] = useState<string>("");


  const handleLogout = () => {
    setTypeModal("logout")
    toggleModal(true);
  }

  const handleDelete = () => {
    setTypeModal("delete")
    toggleModal(true);
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

  const handleCloseButton = () => {
    toggleModal(false)
  }

  const handleDeleteClick = () => {
    deleteUser()
    router.push('/registration')
  };

  const handleLogoutClick = () => {
    logout()
    router.push('/login')
    removeToken()
  }

  return (
    <NavBlock>
      <NavContainer $isBurger={isBurger?.isBurger}>
        <ButtonsContainer>
          <UserProfileButtons $button="profile" $active={isProfile} onClick={handleProfileClicked}>Profile</UserProfileButtons>
          <UserProfileButtons $button="security" $active={securityClick} onClick={handleSecurityClick}>Security</UserProfileButtons>
        </ButtonsContainer>
        <ButtonsContainer>
          <DeleteAccountBtn onClick={handleDelete}>Delete</DeleteAccountBtn>
          <LogOutBtn onClick={handleLogout}>Log out</LogOutBtn>
        </ButtonsContainer>
      </NavContainer>
      <Modal
        show={isShowingModal}
        onCloseButtonClick={toggleModal}
      >
        {typeModal === "logout" ? (
          <>
            <ModalHeader>Logout</ModalHeader>
            <ModalBody>
              <ModalText>Are you sure you want logout?</ModalText>
              <ModalButtons>
                <ModalSaveButton onClick={handleLogoutClick}>
                  Logout
                </ModalSaveButton>
                <ModalCloseButton onClick={handleCloseButton}>
                  Cancel
                </ModalCloseButton>
              </ModalButtons>
            </ModalBody>
          </>)
          :
          (
            <>
              <ModalHeader>Delete Account</ModalHeader>
              <ModalBody>
                <ModalText>Are you sure about deleting your account? <br></br>
                  All your data will be removed...</ModalText>
                <ModalButtons>
                  <ModalDeleteButton onClick={handleDeleteClick}>
                    Delete
                  </ModalDeleteButton>
                  <ModalCloseButton onClick={handleCloseButton}>
                    Cancel
                  </ModalCloseButton>
                </ModalButtons>
              </ModalBody>
            </>
          )
        }
      </Modal>
    </NavBlock>
  );
};
export { SettingsNavPanel };
