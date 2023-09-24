import type { Metadata } from "next";

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
            {children}
        </>
    );
}
