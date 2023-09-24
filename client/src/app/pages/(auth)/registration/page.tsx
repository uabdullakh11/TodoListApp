"use client";
import { AuthForm } from "../../../components/AuthForm";
import AuthLayout from "../../../layouts/AuthLayout";
import { Form, InputContainer } from "../../../styles/containers";
import { ErrorCaption, FormTitle, LinkTo } from "../../../styles/text";
import { Input } from "../../../styles/inputs";
import { AuthButton } from "../../../styles/buttons";
import { useState } from "react";

export default function SignUp() {
  const [login, setLogin] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [rePassword, setRePassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    !login || !password || !email || !rePassword ? setError("Please fill out the form!") : setError("");
    if (password !== rePassword) {
      setError("Password did not match!")
    }
    const userData = {
      email,
      password,
      login,
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
              />
              <Input
                placeholder="Enter email..."
                type="email"
                name="enter-email-input"
                id="enter-email-input"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Enter password..."
                type="password"
                name="enter-current-password-input"
                id="enter-current-password-input"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <Input
                placeholder="Repeat password..."
                type="password"
                name="enter-repeat-password-input"
                id="enter-repeat-password-input"
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
