import type { Metadata } from "next";
import type { ReactElement} from 'react'

export const metadata: Metadata = {
  title: "Login",
};

export default function SignInUpLayout({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <>
     <main>{children}</main>
    </>
  );
}
