import { FC, useRef, useState, useContext, useEffect } from "react";
import { ErrorCaption } from "@/styles/text";
import { EditButton } from "@/styles/buttons";
import { useClickOutside } from '../../../utils/hooks/useClickOutside';
import { CancelBtn, ChangeBtn, InfoContainer, UserInnerContainer, UserNameInput, EmailInput, ButtonsContainer, UserContainer } from "./userInfoStyles";
import { AccountContext } from "@/context/AccountContext";
import { AccountContextType } from "@/types/types";
import { toast } from "react-toastify";
import { useChangeUserDataMutation, useGetUserQuery } from "@/utils/services/user.service";

export const UserInfo: FC = () => {
    // const { userName, userEmail, handleChangeUserEmail, handleChangeUserName, error } = useContext(AccountContext) as AccountContextType;

    const userNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const [isUserNameClicked, setUserNameClick] = useState<boolean>(false)
    const [isEmailClicked, setEmailClicked] = useState<boolean>(false)
    const [error, setError] = useState<{ userNameError: string, userEmailError: string }>({ userNameError: "", userEmailError: "" })

    const { data } = useGetUserQuery("")
    const [changeUserData] = useChangeUserDataMutation()

    const sideEffects = (elem: HTMLInputElement, type: string, elemType: string) => {
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
            
                const userData = {
                    login: userNameRef.current.value,
                    email: data[0].email
                }
                changeUserData(userData)
                    .unwrap()
                    .then(() => {
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
                    })
                    .catch((error) => setError({ userNameError: error.data.message, userEmailError: "" }))
                sideEffects(userNameRef.current, 'clear', 'name')
                // // handleChangeUserName(userData)

            
        }
    }

    const handleEmailChange = async () => {
        if (emailRef.current) {
           
                const userData = {
                    login: data[0].login,
                    email: emailRef.current.value
                }
                // handleChangeUserEmail(userData)
                changeUserData(userData)
                    .unwrap()
                    .then(() => {
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
                    })
                    .catch((error) => setError({ userNameError: "", userEmailError: error.data.message }))

                sideEffects(emailRef.current, 'clear', 'email')
           
        }
    }

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const target = e.target as HTMLInputElement
            target.id === "change-user-name" && handleUserNameChange();
            target.id === "change-email" && handleEmailChange();
        }
    }

    return (
        <InfoContainer>
            <UserContainer ref={userNameOutside}>
                <UserInnerContainer>
                    <UserNameInput
                        placeholder={data && data[0].login}
                        ref={userNameRef}
                        onKeyDown={handleEnterPress}
                        id="change-user-name"
                        disabled
                    />
                    <EditButton src="../edit-icon.svg"
                        alt=""
                        width={20}
                        height={20}
                        onClick={handleOpenToChangeUsername}
                    />
                </UserInnerContainer>
                {/* <ErrorCaption>{error.userNameError}</ErrorCaption> */}
                {isUserNameClicked &&
                    <ButtonsContainer>
                        <ChangeBtn onClick={handleUserNameChange}>Change name</ChangeBtn>
                        <CancelBtn onClick={() => sideEffects(userNameRef.current as HTMLInputElement, 'clear', 'name')}>Cancel change</CancelBtn>
                    </ButtonsContainer>}
            </UserContainer>
            <UserContainer ref={emailOutside}>
                <UserInnerContainer>
                    <EmailInput
                        placeholder={data && data[0].email}
                        ref={emailRef}
                        onKeyDown={handleEnterPress}
                        id="change-email"
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
                        <CancelBtn onClick={() => sideEffects(emailRef.current as HTMLInputElement, 'clear', 'email')}>Cancel change</CancelBtn>
                    </ButtonsContainer>}
            </UserContainer>
        </InfoContainer>
    );
}