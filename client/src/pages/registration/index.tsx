import { AuthForm } from "@/components/AuthForm/AuthForm";
import AuthLayout from "@/layouts/AuthLayout";
import { Form, InputContainer } from "@/styles/containers";
import { ErrorCaption, FormTitle, LinkTo } from "@/styles/text";
import { Input } from "@/styles/inputs";
import { AuthButton } from "@/styles/buttons";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRegisterMutation } from "@/utils/services/auth.service";
// import { register } from "@/utils/services/auth.service";


export default function SignUp() {
  const [login, setLogin] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [rePassword, setRePassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const router = useRouter();

  const [register] = useRegisterMutation()

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

      const userData = {
        email: email.trim(),
        password,
        login: login.trim(),
      }
      // await register(userData)
      register(userData)
        .unwrap()
        .then(() => router.push("/tasks"))
        .catch((error) => console.log(error))

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
                autoFocus
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
