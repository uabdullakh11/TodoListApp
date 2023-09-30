import Image from "next/image";
import { EditTask } from "@/styles/task";
import { FC, useRef, useState } from "react";
import { AvatarContainer, InfoContainer, AllTime, StatisticContainer, ThisWeek, ProfileContainer, ButtonsContainer, AccountPageForm, UserLoginContainer, UserEmailContainer } from "@/styles/containers";
import { UserEmail, UserLogin } from "@/styles/text";
import { UserNameInput, EmailInput, FileInput, Label } from "@/styles/inputs";
import { CancelBtn, ChangeBtn } from "@/styles/buttons";
import { useClickOutside } from '../utils/hooks/useClickOutside';
import axios from "axios";
import { api } from "@/utils/axios/axios";

interface UserInfoProps {
    userName: string;
    userEmail: string;
    linkToAvatar: string;
    weekStatistic: string;
    allTimeStatistic: string;
}

export const UserInfo: FC<UserInfoProps> = (props: UserInfoProps) => {

    const userNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const [isUserNameClicked, setUserNameClick] = useState<boolean>(false)
    const [isEmailClicked, setEmailClicked] = useState<boolean>(false)


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

    const handleSendFile = async (e: React.ChangeEvent) => {
        const elem = e.target as HTMLInputElement;
        if (elem.files) {
            const avatarIcon = new FormData()
            avatarIcon.append('avatar', elem.files[0])
            // if (avatar.type!=='image/png' || avatar.type!=='image/jpeg' ||  avatar.type!=='image/svg'){

            // }
            try {
                await api.put(`api/users/avatar`, avatarIcon)
            }
            catch (err) {
                if (axios.isAxiosError(err) && err.response) {
                    // setError(err.response.data)
                }
            }
        }
    }

    const handleUserNameChange = async () => {
        if (userNameRef.current) {
            try {
                await api.patch(`api/users/username`, userNameRef.current.value)
            }
            catch (err) {
                if (axios.isAxiosError(err) && err.response) {
                    // setError(err.response.data)
                }
            }
        }
    }

    const handleEmailChange = async () => {
        if (emailRef.current) {
            try {
                await api.patch(`api/users/email`, emailRef.current.value)
            }
            catch (err) {
                if (axios.isAxiosError(err) && err.response) {
                    // setError(err.response.data)
                }
            }
        }
    }

    return (
        <ProfileContainer>
            <AvatarContainer>
                <AccountPageForm encType="multipart/form-data">
                    <Label>
                        <FileInput
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/png, image/jpeg, image/svg"
                            onChange={handleSendFile}
                        />
                        <Image src={props.linkToAvatar}
                            alt=""
                            height={100}
                            width={100}
                        />
                        <EditTask src="../edit-icon.svg"
                            alt=""
                            width={20}
                            height={20}
                        />
                    </Label>
                </AccountPageForm>
            </AvatarContainer>
            <InfoContainer>
                <UserLogin ref={userNameOutside}>
                    <UserLoginContainer>
                        <UserNameInput
                            type="text"
                            placeholder={props.userName}
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
                    {isUserNameClicked &&
                        <ButtonsContainer>
                            <ChangeBtn onClick={handleUserNameChange}>Change name</ChangeBtn>
                            <CancelBtn onClick={() => sideEffects(userNameRef.current, 'clear', 'name')}>Cancel change</CancelBtn>
                        </ButtonsContainer>}
                </UserLogin>
                <UserEmail ref={emailOutside}>
                    <UserEmailContainer>
                        <EmailInput
                            type="text"
                            placeholder={props.userName}
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
                    {isEmailClicked &&
                        <ButtonsContainer>
                            <ChangeBtn onClick={handleEmailChange}>Change email</ChangeBtn>
                            <CancelBtn onClick={() => sideEffects(emailRef.current, 'clear', 'email')}>Cancel change</CancelBtn>
                        </ButtonsContainer>}
                </UserEmail>
            </InfoContainer>
            <StatisticContainer>
                <ThisWeek>
                    <span>This week</span>
                </ThisWeek>
                <AllTime>
                    <span>All time</span>
                </AllTime>
            </StatisticContainer>
        </ProfileContainer>
    );
}