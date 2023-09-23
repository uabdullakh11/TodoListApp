"use client";
import Card from "./components/Card";
import { NavPanel } from "./components/NavPanel";
import TasksProvider from "./context/TasksContext";
import React from "react";
export default function Home() {
  return (
    <>
    <TasksProvider>
    <NavPanel />
      <Card />
    </TasksProvider>
    </>
  );
}

// 'use server';
// export const getStaticProps: GetStaticProps = async ()=>{
//   const res = await axios("https://jsonplaceholder.typicode.com/todos?_limit=100")
//   const data = res.data
//   return {props:{data}}
// }
