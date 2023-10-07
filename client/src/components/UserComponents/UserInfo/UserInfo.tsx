import { FC, useEffect, useRef, useState } from "react";
import { ErrorCaption } from "@/styles/text";
import { EditButton } from "@/styles/buttons";
import { useClickOutside } from '../../../utils/hooks/useClickOutside';
import { changeUserData, getUser } from "@/utils/services/user.service";
import { CancelBtn, ChangeBtn, InfoContainer, UserLogin, UserLoginContainer, UserNameInput, UserEmail, EmailInput, UserEmailContainer, ButtonsContainer } from "./userInfoStyles";

export const UserInfo: FC = () => {

    const userNameRef = useRef<HTMLTextAreaElement>(null);
    const emailRef = useRef<HTMLTextAreaElement>(null);

    const [userName, setUserName] = useState<string>("username")
    const [userEmail, setEmail] = useState<string>("userEmail")
    const [errorNameCaption, setErrorNameCaption] = useState("");
    const [errorEmailCaption, setErrorEmailCaption] = useState("");

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
            setErrorEmailCaption("")
            setErrorNameCaption("")
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
                const res = await changeUserData(userData, 'username')
                // const res = await changeUserData(userNameRef.current.value, 'username')
                setUserName(res)
                // userNameRef.current.value = res.data
                sideEffects(userNameRef.current, 'clear', 'name')
            }
            catch (err) {
                setErrorNameCaption((err as Error).message)
                // if (axios.isAxiosError(err) && err.response) {
                //     setErrorNameCaption(err.response.data)
                // }
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
                const res = await changeUserData(userData, 'email')
                // const res = await changeUserData(emailRef.current.value, 'email')
                setEmail(res)
                // emailRef.current.value = res.data;
                sideEffects(emailRef.current, 'clear', 'email')
            }
            catch (err) {
                setErrorEmailCaption((err as Error).message)
                // if (axios.isAxiosError(err) && err.response) {
                //     setErrorEmailCaption(err.response.data)
                // }
            }
        }
    }

    useEffect(() => {
        const getUserData = async () => {
            try {

                const res = await getUser()
                setUserName(res.login)
                setEmail(res.email)
                // userNameRef.current.value = res.data[0].login
                // emailRef.current.value= res.data[0].email
            }
            catch (error) {
                console.log(error)
            }
        }
        getUserData()
    }, []);

    return (
        <InfoContainer>
            <UserLogin ref={userNameOutside}>
                <UserLoginContainer>
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
                </UserLoginContainer>
                <ErrorCaption>{errorNameCaption}</ErrorCaption>
                {isUserNameClicked &&
                    <ButtonsContainer>
                        <ChangeBtn onClick={handleUserNameChange}>Change name</ChangeBtn>
                        <CancelBtn onClick={() => sideEffects(userNameRef.current as HTMLTextAreaElement, 'clear', 'name')}>Cancel change</CancelBtn>
                    </ButtonsContainer>}
            </UserLogin>
            <UserEmail ref={emailOutside}>
                <UserEmailContainer>
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
                </UserEmailContainer>
                <ErrorCaption>{errorEmailCaption}</ErrorCaption>
                {isEmailClicked &&
                    <ButtonsContainer>
                        <ChangeBtn onClick={handleEmailChange}>Change email</ChangeBtn>
                        <CancelBtn onClick={() => sideEffects(emailRef.current as HTMLTextAreaElement, 'clear', 'email')}>Cancel change</CancelBtn>
                    </ButtonsContainer>}
            </UserEmail>
        </InfoContainer>
    );
}