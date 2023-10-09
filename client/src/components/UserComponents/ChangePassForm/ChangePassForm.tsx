import { useState } from 'react'
import { FormContainer } from "@/styles/containers";
import { Form, InputContainer } from "@/styles/containers";
import { ErrorCaption, FormTitle } from "@/styles/text";
import { Input } from "@/styles/inputs";
import { useRouter } from "next/router";
import { changePassword } from '@/utils/services/user.service';
import { ChangePassBtn } from './changePassFormStyles';

const ChangePassForm = () => {
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [rePassword, setRePassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    const router = useRouter();


    const handleSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currentPassword.trim() || !newPassword.trim() || !rePassword.trim()) {
            setError("Please enter password!")
        }
        else if (newPassword !== rePassword) {
            setError("Paswords do not match!")
        }
        else {
            setError("")
            try {
                const userNewPassword = {
                    currentPassword,
                    newPassword,
                }
                // await api.patch('api/users/password', userNewPassword)
                await changePassword(userNewPassword)
                sessionStorage.removeItem('ACCESS_TOKEN')
                sessionStorage.removeItem('REFRESH_TOKEN')
                sessionStorage.removeItem('expires_in')
                router.push("/login");
            }
            catch (err) {
                setError((err as Error).message)
                // if (axios.isAxiosError(err) && err.response) {
                //     setError(err.response.data)
                // }
            }
        }
    }

    return (
        <FormContainer>
            <FormTitle>Change password</FormTitle>
            <Form name="login-form" id="login-form" onSubmit={handleSubmitChange}>
                <InputContainer>
                    <Input
                        placeholder="Enter your current password..."
                        type="password"
                        name="enter-current-pass"
                        id="enter-current-pass"
                        minLength={6}
                        autoFocus
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
                    />
                    <Input
                        placeholder="Enter new password..."
                        type="password"
                        name="enter-new-pass"
                        id="enter-new-pass"
                        minLength={6}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                    />
                    <Input
                        placeholder="Confirm password..."
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        minLength={6}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRePassword(e.target.value)}
                    />
                    {error && <ErrorCaption>{error}</ErrorCaption>}
                </InputContainer>
                <ChangePassBtn type="submit">Change password</ChangePassBtn>
            </Form>
        </FormContainer>
    );
};
export { ChangePassForm };
