import { useEffect, useState } from "react";
import { ErrorCaption } from "@/styles/text";
import { changeAvatar, getUser } from "@/utils/services/user.service";
import { AvatarContainer, AvatarImage, FileInput, Label, AvatarForm } from "./userAvatarStyles";
import { EditButton } from "@/styles/buttons";

export const UserAvatar = () => {
    const [linkToAvatar, setLinkToAvatar] = useState<string>("http://localhost:5000/static/avatars/person-logo.svg")
    const [errorCaption, setErrorCaption] = useState("");


    const handleSendFile = async (e: React.ChangeEvent) => {
        const elem = e.target as HTMLInputElement;
        if (elem.files) {
            const avatarIcon = new FormData()
            avatarIcon.append('avatar', elem.files[0])
            // if (avatar.type!=='image/png' || avatar.type!=='image/jpeg' ||  avatar.type!=='image/svg'){
            // }
            try {
                setErrorCaption("")
                const res = await changeAvatar(avatarIcon)
                setLinkToAvatar("http://localhost:5000" + res)
                // await api.put(`api/users/avatar`, avatarIcon, {
                //     headers: { 'content-type': 'multipart/form-data' }
                // })
            }
            catch (err) {
                setErrorCaption((err as Error).message);
                // if (axios.isAxiosError(err) && err.response) {
                //     // setError(err.response.data)
                //     // setErrorCaption(err.response.data.message)
                // }
            }
        }
    }

    useEffect(() => {
        const getUserAvatar = async () => {
            try {
                const res = await getUser()
                setLinkToAvatar("http://localhost:5000" + res.avatar)
            }
            catch (err) {
                console.log(err)
            }
        }
        getUserAvatar()
    })
    return (
        <AvatarContainer>
            <AvatarForm encType="multipart/form-data">
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
                    <EditButton src="../edit-icon.svg"
                        alt=""
                        width={20}
                        height={20}
                    />
                </Label>
                <ErrorCaption>{errorCaption}</ErrorCaption>
            </AvatarForm>
        </AvatarContainer>
    );
}