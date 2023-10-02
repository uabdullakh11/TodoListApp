import { AccountPageForm, AvatarContainer } from "@/styles/containers";
import { FileInput, Label } from "@/styles/inputs";
import { EditTask } from "@/styles/task";
import { AvatarImage } from "@/styles/text";
import { api } from "@/utils/axios/axios";
import axios from "axios";
import { useEffect, useState } from "react";

export const UserAvatar = () => {
    const [linkToAvatar, setLinkToAvatar] = useState<string>("http://localhost:5000/static/avatars/person-logo.svg")

    const handleSendFile = async (e: React.ChangeEvent) => {
        const elem = e.target as HTMLInputElement;
        if (elem.files) {
            const avatarIcon = new FormData()
            avatarIcon.append('avatar', elem.files[0])
            // if (avatar.type!=='image/png' || avatar.type!=='image/jpeg' ||  avatar.type!=='image/svg'){

            // }
            try {
                const res = await api.put(`api/users/avatar`, avatarIcon)
                setLinkToAvatar("http://localhost:5000" + res.data)
                // await api.put(`api/users/avatar`, avatarIcon, {
                //     headers: { 'content-type': 'multipart/form-data' }
                // })
            }
            catch (err) {
                if (axios.isAxiosError(err) && err.response) {
                    // setError(err.response.data)
                }
            }
        }
    }

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await api('/api/users/')
                setLinkToAvatar("http://localhost:5000" + res.data[0].avatar)
            }
            catch (err) {
                console.log(err)
            }
        }
        getUserData()
    })
    return (
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
                    <AvatarImage src={linkToAvatar}
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
    );
}