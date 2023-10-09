import React from "react";
import Card from "@/components/TaskBoard/Card/Card";
import { NavPanel } from "@/components/TaskBoard/NavPanel/NavPanel";
import TasksLayout from "@/layouts/TasksLayout";

export default function Tasks() {
  return (
    <TasksLayout>
      <NavPanel />
        <Card />
    </TasksLayout>
  );
}
