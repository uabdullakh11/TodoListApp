import type { Metadata } from "next";
import './styles/global.css';

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
          {children}
        </div>
      </body>
    </html>
  );
}
