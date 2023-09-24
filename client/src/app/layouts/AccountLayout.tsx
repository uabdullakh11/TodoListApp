import type { Metadata } from "next";
import type { ReactElement, ReactNode } from 'react'
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountLayout({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <>
    <Header type="profile" />
     <main>{children}</main>
    </>
  );
}
