// "use client";
import { AuthForm } from "@/components/AuthForm";
import AuthLayout from "@/layouts/AuthLayout";
import { Form, InputContainer } from "@/styles/containers";
import { ErrorCaption, FormTitle, LinkTo } from "@/styles/text";
import { Input } from "@/styles/inputs";
import { AuthButton } from "@/styles/buttons";
import { useState } from "react";

export default function SignIn() {
  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    !login || !password ? setError("Please enter login and password!") : setError("");
    const userData = {
      login,
      password,
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
                placeholder="Enter login..."
                type="text"
                name="enter-login-input"
                id="enter-login-input"
                autoComplete="true"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
              />
              <Input
                placeholder="Enter password..."
                type="password"
                name="enter-password-input"
                id="enter-password-input"
                autoComplete="true"
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
