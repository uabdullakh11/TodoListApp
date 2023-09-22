import type { Metadata } from "next";
import './styles/global.css';
import { Header } from "./components/Header";
import { NavPanel } from "./components/NavPanel";
// import { createContext } from "react";
// import {  TasksContextType } from "./types/types";

export const metadata: Metadata = {
  title: "Todo List",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const TasksContext = createContext<TasksContextType | null>(null);
  return (
    <html lang="en">
      <body>
        <div className="wrapper">
          <Header />
          {/* <TasksContext.Provider value={null}> */}
            <main>
              {children}
            </main>
          {/* </TasksContext.Provider> */}
        </div>
      </body>
      {/* <GlobalStyles /> */}
    </html>
  );
}
