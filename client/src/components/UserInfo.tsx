import { EditTask } from "@/styles/task";
import { FC, useEffect, useRef, useState } from "react";
import { InfoContainer, ButtonsContainer, UserLoginContainer, UserEmailContainer } from "@/styles/containers";
import {  ErrorCaption, UserEmail, UserLogin } from "@/styles/text";
import { UserNameInput, EmailInput } from "@/styles/inputs";
import { CancelBtn, ChangeBtn } from "@/styles/buttons";
import { useClickOutside } from '../utils/hooks/useClickOutside';
import axios from "axios";
import { api } from "@/utils/axios/axios";

export const UserInfo: FC= () => {

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
                const data = {
                    newLogin: userNameRef.current.value,
                }
                const res = await api.patch(`api/users?change=username`, data)
                setUserName(res.data)
                // userNameRef.current.value = res.data
                sideEffects(userNameRef.current, 'clear','name' )
            }
            catch (err) {
                if (axios.isAxiosError(err) && err.response) {
                    setErrorNameCaption(err.response.data)
                }
            }
        }
    }

    const handleEmailChange = async () => {
        if (emailRef.current) {
            try {
                const data = {
                    newEmail: emailRef.current.value,
                }
                const res = await api.patch(`api/users?change=email`, data)
                setEmail(res.data)
                // emailRef.current.value = res.data;
                sideEffects(emailRef.current, 'clear','email' )
            }
            catch (err) {
                if (axios.isAxiosError(err) && err.response) {
                    setErrorEmailCaption(err.response.data)
                }
            }
        }
    }

    useEffect(() => {
        const getUserData = async () => {
          try {
            const res = await api('/api/users')
            setUserName(res.data[0].login)
            setEmail(res.data[0].email)
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
                    <EditTask src="../edit-icon.svg"
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
                    <EditTask src="../edit-icon.svg"
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