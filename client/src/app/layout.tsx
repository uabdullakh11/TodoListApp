import type { Metadata } from "next";
import { Header } from "./components/Header";
import { NavPanel } from "./components/NavPanel";

export const metadata: Metadata = {
  title: "Todo List",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="wrapper">
      <Header />
          <main>
            <NavPanel />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
