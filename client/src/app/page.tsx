import Card from "./components/Card";
import { NavPanel } from "./components/NavPanel";
import { TasksArray } from "./types/types";
import React, { useState } from "react";
// export default function Home({data}:InferGetStaticPropsType<typeof getStaticProps>) {
export default function Home() {
  // const [tasks, setTasks] = useState<TasksArray | null>(null);
  const [tasks, setTasks] = useState<TasksArray | null>(null);
  const handleSetTasks = (value: TasksArray) :void =>{
    setTasks(value)
  }
  return (
    <>
    <NavPanel handleSetTasks={handleSetTasks}/>
    <Card tasks={tasks}/>
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

