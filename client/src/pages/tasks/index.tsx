import React from "react";
import Card from "@/components/TaskBoard/Card/Card";
import { NavPanel } from "@/components/TaskBoard/NavPanel/NavPanel";
import TasksLayout from "@/layouts/TasksLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Tasks() {
  return (
    <TasksLayout>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <NavPanel />
      <Card />
    </TasksLayout>
  );
}
