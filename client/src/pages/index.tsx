// "use client";
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

// 'use server';
// export const getStaticProps: GetStaticProps = async ()=>{
//   const res = await axios("https://jsonplaceholder.typicode.com/todos?_limit=100")
//   const data = res.data
//   return {props:{data}}
// }
