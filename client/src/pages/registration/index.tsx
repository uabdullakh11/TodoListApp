import { AuthForm } from "@/components/AuthForm/AuthForm";
import AuthLayout from "@/layouts/AuthLayout";
import { Form, InputContainer } from "@/styles/containers";
import { ErrorCaption, FormTitle, LinkTo } from "@/styles/text";
import { Input } from "@/styles/inputs";
import { AuthButton } from "@/styles/buttons";
import { useState } from "react";
import { useRouter } from "next/router";
import { register } from "@/utils/services/auth.service";


export default function SignUp() {
  const [login, setLogin] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [rePassword, setRePassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const router = useRouter();

  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!login.trim() || !password.trim() || !email.trim() || !rePassword.trim()) {
      setError("Please fill out the form!")
    }
    else if (password !== rePassword) {
      setError("Password did not match!")
    }
    else {
      setError("");
      try {
        const userData = {
          email: email.trim(),
          password,
          login: login.trim(),
        }
        await register(userData)
        // const token = await api.post('api/auth/register', userData)
        // const token = await axiosInstance.post('api/auth/register', userData)
        // sessionStorage.setItem('ACCESS_TOKEN', token.data.ACCESS_TOKEN)
        // sessionStorage.setItem('REFRESH_TOKEN', token.data.REFRESH_TOKEN)
        router.push("/tasks");
      }
      catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        }
        // if (axios.isAxiosError(err) && err.response){
        //   setError(err.response.data.message)
        // }
      }
    }
  }
  return (
    <AuthLayout>
      <AuthForm>
        <>
          <FormTitle>Sign Up</FormTitle>
          <Form name="login-form" id="login-form" onSubmit={handleSubmitSignUp}>
            <InputContainer>
              <Input
                placeholder="Enter login..."
                type="text"
                name="enter-login-input"
                id="enter-login-input"
                minLength={3}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
              />
              <Input
                placeholder="Enter email..."
                type="email"
                name="enter-email-input"
                id="enter-email-input"
                minLength={6}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Enter password..."
                type="password"
                name="enter-current-password-input"
                id="enter-current-password-input"
                minLength={6}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <Input
                placeholder="Repeat password..."
                type="password"
                name="enter-repeat-password-input"
                id="enter-repeat-password-input"
                minLength={6}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRePassword(e.target.value)}
              />
              {error && <ErrorCaption>{error}</ErrorCaption>}
            </InputContainer>
            <LinkTo href="./login">Sign in</LinkTo>
            <AuthButton type="submit">Sign Up</AuthButton>
          </Form>
        </>
      </AuthForm>
    </AuthLayout>
  );
}
