import type { Metadata } from "next";
import './styles/global.css';
import { Header } from "./components/Header";

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
              {children}
            </main>
        </div>
      </body>
    </html>
  );
}
