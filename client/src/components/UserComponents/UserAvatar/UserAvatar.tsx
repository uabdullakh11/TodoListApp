import { useContext, useState } from "react";
import { ErrorCaption } from "@/styles/text";
import { changeAvatar } from "@/utils/services/user.service";
import { AvatarContainer, AvatarImage, FileInput, Label, AvatarForm } from "./userAvatarStyles";
import { EditButton } from "@/styles/buttons";
import { AccountContext } from "@/context/AccountContext";
import { AccountContextType } from "@/types/types";
import { toast } from "react-toastify";

export const UserAvatar = () => {
    const { userAvatar, handleChangeAvatar, error} = useContext(AccountContext) as AccountContextType;

    const handleSendFile= async (e: React.ChangeEvent) => {
        const elem = e.target as HTMLInputElement;
        if (elem.files) {
            const avatarIcon = new FormData()
            avatarIcon.append('avatar', elem.files[0])
            try {
                handleChangeAvatar(avatarIcon)
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
            }
            catch (err) {
                console.log(err)
            }
        }
    }

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
                    <AvatarImage src={'http://localhost:5000'+userAvatar}
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
                <ErrorCaption>{error.avatarError}</ErrorCaption>
            </AvatarForm>
        </AvatarContainer>
    );
}