import { useEffect, useState } from "react";
import { ErrorCaption } from "@/styles/text";
import { useChangeAvatarMutation, useGetUserQuery } from "@/utils/services/user.service";
import { AvatarContainer, AvatarImage, FileInput, Label, AvatarForm } from "./userAvatarStyles";
import { EditButton } from "@/styles/buttons";

import { toast } from "react-toastify";

export const UserAvatar = () => {
    const [error, setError] = useState("")
    const [userAvatar, setUserAvatar] = useState("")

    const [changeAvatar] = useChangeAvatarMutation()
    const { data } = useGetUserQuery("")

    const handleSendFile = async (e: React.ChangeEvent) => {
        const elem = e.target as HTMLInputElement;
        if (elem.files) {
            const avatarIcon = new FormData()
            avatarIcon.append('avatar', elem.files[0])
            changeAvatar(avatarIcon)
                .unwrap()
                .then((avatar) => {
                    setUserAvatar('http://localhost:5000' + avatar)
                    toast.info(`Avatar was changed!`, {
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
                .catch((error) => setError(error.data.message))

        }
    }

    useEffect(() => {
        data && setUserAvatar('http://localhost:5000'+ data[0].avatar)
    }, [data])

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
                    <AvatarImage src={userAvatar}
                        alt=""
                        height={100}
                        width={100}
                        priority
                    />
                    <EditButton src="../edit-icon.svg"
                        alt=""
                        width={20}
                        height={20}
                    />
                </Label>
                <ErrorCaption>{error}</ErrorCaption>
            </AvatarForm>
        </AvatarContainer>
    );
}