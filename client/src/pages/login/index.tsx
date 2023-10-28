import { AuthForm } from "@/components/AuthForm/AuthForm";
import AuthLayout from "@/layouts/AuthLayout";
import { Form, InputContainer } from "@/styles/containers";
import { ErrorCaption, FormTitle, LinkTo } from "@/styles/text";
import { Input } from "@/styles/inputs";
import { AuthButton } from "@/styles/buttons";
import { useState } from "react";
import { useRouter } from "next/router";
import { useLoginMutation } from "@/utils/services/auth.service";
// import { login } from "@/utils/services/auth.service";


export default function SignIn() {
  const [userLogin, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loginError, setError] = useState<string>("")

  const router = useRouter();

  // const isFetchBaseQueryErrorType = (error: any): error is FetchBaseQueryErrorType => 'status' in error
  const [login] = useLoginMutation()

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userLogin.trim() || !password.trim()) {
      setError("Please enter login and password!")
    }
    else {
      setError("");

      const userData = {
        login: userLogin.trim(),
        password,
      }

      // login(userData)
      login(userData)
        .unwrap()
        .then(()=> router.push("/tasks"))
        .catch((error) => setError(error.data.message))

      // await login(userData);
      
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
              {loginError && <ErrorCaption>{loginError}</ErrorCaption>}
            </InputContainer>
            <LinkTo href="./registration">Sign up</LinkTo>
            <AuthButton type="submit">Sign In</AuthButton>
          </Form>
        </>
      </AuthForm>
    </AuthLayout>
  );
}
