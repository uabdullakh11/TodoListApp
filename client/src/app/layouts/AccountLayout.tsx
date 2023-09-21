import type { Metadata } from "next";
import type { ReactElement, ReactNode } from 'react'

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
     <main>{children}</main>
    </>
  );
}
