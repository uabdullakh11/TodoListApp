import React from "react";
import Card from "@/components/Card";
import { NavPanel } from "@/components/NavPanel";
import TasksProvider from "@/context/TasksContext";
import HomeLayout from "@/layouts/HomeLayout";


export default function Home() {
  
  return (
    <HomeLayout>
      <TasksProvider>
        <NavPanel />
        <Card />
      </TasksProvider>
    </HomeLayout>
  );
}
