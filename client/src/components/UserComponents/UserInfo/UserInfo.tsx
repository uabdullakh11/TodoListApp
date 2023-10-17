import { FC, useRef, useState, useContext } from "react";
import { ErrorCaption } from "@/styles/text";
import { EditButton } from "@/styles/buttons";
import { useClickOutside } from '../../../utils/hooks/useClickOutside';
import { changeUserData } from "@/utils/services/user.service";
import { CancelBtn, ChangeBtn, InfoContainer, UserInnerContainer, UserNameInput, EmailInput, ButtonsContainer, UserContainer } from "./userInfoStyles";
import { AccountContext } from "@/context/AccountContext";
import { AccountContextType } from "@/types/types";
import { toast } from "react-toastify";

export const UserInfo: FC = () => {
    const { userName, userEmail, handleChangeUserEmail, handleChangeUserName, error } = useContext(AccountContext) as AccountContextType;

    const userNameRef = useRef<HTMLTextAreaElement>(null);
    const emailRef = useRef<HTMLTextAreaElement>(null);

    const [isUserNameClicked, setUserNameClick] = useState<boolean>(false)
    const [isEmailClicked, setEmailClicked] = useState<boolean>(false)


    const sideEffects = (elem: HTMLTextAreaElement, type: string, elemType: string) => {
        if (type === 'open') {
            elem.disabled = false;
            elem.focus();
            elemType === 'name' ? setUserNameClick(!isUserNameClicked) : setEmailClicked(!isEmailClicked);
        }
        if (type === 'clear') {
            elem.disabled = true;
            elem.value = ""
            elemType === 'name' ? setUserNameClick(false) : setEmailClicked(false);

        }
    }

    const userNameOutside = useClickOutside(() => {
        if (userNameRef.current) {
            sideEffects(userNameRef.current, 'clear', 'name')
        }
    });

    const emailOutside = useClickOutside(() => {
        if (emailRef.current) {
            sideEffects(emailRef.current, 'clear', 'email')
        }
    });

    const handleOpenToChangeUsername = () => {
        if (userNameRef.current) {
            sideEffects(userNameRef.current, 'open', 'name')
        }
    }

    const handleOpenToChangeEmail = () => {
        if (emailRef.current) {
            sideEffects(emailRef.current, 'open', 'email')
        }
    }

    const handleUserNameChange = async () => {
        if (userNameRef.current) {
            try {
                const userData = {
                    newLogin: userNameRef.current.value,
                    newEmail: userEmail
                }
                handleChangeUserName(userData)
                toast.info(`Login was changed!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                sideEffects(userNameRef.current, 'clear', 'name')
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    const handleEmailChange = async () => {
        if (emailRef.current) {
            try {
                const userData = {
                    newLogin: userName,
                    newEmail: emailRef.current.value
                }
                handleChangeUserEmail(userData)
                toast.info(`Email was changed!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                sideEffects(emailRef.current, 'clear', 'email')
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <InfoContainer>
            <UserContainer ref={userNameOutside}>
                <UserInnerContainer>
                    <UserNameInput
                        placeholder={userName}
                        ref={userNameRef}
                        disabled
                    />
                    <EditButton src="../edit-icon.svg"
                        alt=""
                        width={20}
                        height={20}
                        onClick={handleOpenToChangeUsername}
                    />
                </UserInnerContainer>
                <ErrorCaption>{error.userNameError}</ErrorCaption>
                {isUserNameClicked &&
                    <ButtonsContainer>
                        <ChangeBtn onClick={handleUserNameChange}>Change name</ChangeBtn>
                        <CancelBtn onClick={() => sideEffects(userNameRef.current as HTMLTextAreaElement, 'clear', 'name')}>Cancel change</CancelBtn>
                    </ButtonsContainer>}
            </UserContainer>
            <UserContainer ref={emailOutside}>
                <UserInnerContainer>
                    <EmailInput
                        placeholder={userEmail}
                        ref={emailRef}
                        disabled
                    />
                    <EditButton src="../edit-icon.svg"
                        alt=""
                        width={20}
                        height={20}
                        onClick={handleOpenToChangeEmail}
                    />
                </ UserInnerContainer>
                <ErrorCaption>{error.userEmailError}</ErrorCaption>
                {isEmailClicked &&
                    <ButtonsContainer>
                        <ChangeBtn onClick={handleEmailChange}>Change email</ChangeBtn>
                        <CancelBtn onClick={() => sideEffects(emailRef.current as HTMLTextAreaElement, 'clear', 'email')}>Cancel change</CancelBtn>
                    </ButtonsContainer>}
            </UserContainer>
        </InfoContainer>
    );
}