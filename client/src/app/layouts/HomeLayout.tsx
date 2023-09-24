import type { Metadata } from "next";
import { Header } from "../components/Header";
import { LogoTitle, Username } from "../styles/text";
import { ProfileLogo } from "../styles/header";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Todo List",
};

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header>
                <>
                    <LogoTitle $auth={false}>To-Do</LogoTitle>
                    <Username>UserName</Username>
                    <ProfileLogo href="account" $profile={false}>
                        <Image src="../person-logo.svg" alt="" height={40} width={40}></Image>
                    </ProfileLogo>
                </>
            </Header>
            <main>
                {children}
            </main>
        </>
    );
}
