"use client";
import Card from "./components/Card";
import { NavPanel } from "./components/NavPanel";
import { TasksArray } from "./types/types";
import React, { useEffect, useState } from "react";
// export default function Home({data}:InferGetStaticPropsType<typeof getStaticProps>) {
export default function Home() {
  // const [tasks, setTasks] = useState<TasksArray | null>(null);
  const [tasks, setTasks] = useState<TasksArray | null>(null);
  const handleSetTasks = (value: TasksArray): void => {
    setTasks(value);
    console.log(value);
  };
  useEffect(() => {
    if (localStorage.getItem("tasks") === null) {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
    if (JSON.parse(localStorage.getItem("tasks") || "").length !== 0) {
      const tasksArr = JSON.parse(localStorage.getItem("tasks") || "[]");
      console.log(tasksArr);
      setTasks(tasksArr);
    }
  }, []);
  return (
    <>
      <NavPanel handleSetTasks={handleSetTasks} />
      <Card tasks={tasks} />
      {/* <GlobalStyles /> */}
    </>
  );
}

// 'use server';
// export const getStaticProps: GetStaticProps = async ()=>{
//   const res = await axios("https://jsonplaceholder.typicode.com/todos?_limit=100")
//   const data = res.data
//   return {props:{data}}
// }
