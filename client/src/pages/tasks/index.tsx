import React from "react";
import Card from "@/components/TaskBoard/Card/Card";
import { NavPanel } from "@/components/TaskBoard/NavPanel/NavPanel";
import TasksProvider from "@/context/TasksContext";
import TasksLayout from "@/layouts/TasksLayout";

export default function Tasks() {
  return (
    <TasksLayout>
      <TasksProvider>
        <NavPanel />
        <Card />
      </TasksProvider>
    </TasksLayout>
  );
}
