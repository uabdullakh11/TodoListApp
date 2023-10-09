import { AuthForm } from "@/components/AuthForm/AuthForm";
import AuthLayout from "@/layouts/AuthLayout";
import { Form, InputContainer } from "@/styles/containers";
import { ErrorCaption, FormTitle, LinkTo } from "@/styles/text";
import { Input } from "@/styles/inputs";
import { AuthButton } from "@/styles/buttons";
import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "@/utils/services/auth.service";


export default function SignIn() {
  const [userLogin, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const router = useRouter();

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userLogin.trim() || !password.trim()) {
      setError("Please enter login and password!")
    }
    else {
      setError("");
      try {
        const userData = {
          login: userLogin.trim(),
          password,
        }
        await login(userData);
        // const token = await axiosInstance.post('api/auth/login',userData)
        // sessionStorage.setItem('ACCESS_TOKEN', token.data.ACCESS_TOKEN)
        // sessionStorage.setItem('expires_in', token.data.expires_in)
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
          <FormTitle>Login</FormTitle>
          <Form name="login-form" id="login-form" onSubmit={handleSubmitLogin}>
            <InputContainer>
              <Input
                placeholder="Enter login or email..."
                type="text"
                name="enter-login-input"
                id="enter-login-input"
                autoComplete="true"
                autoFocus
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
              />
              <Input
                placeholder="Enter password..."
                type="password"
                name="enter-password-input"
                id="enter-password-input"
                autoComplete="true"
                minLength={6}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              {error && <ErrorCaption>{error}</ErrorCaption>}
            </InputContainer>
            <LinkTo href="./registration">Sign up</LinkTo>
            <AuthButton type="submit">Sign In</AuthButton>
          </Form>
        </>
      </AuthForm>
    </AuthLayout>
  );
}
