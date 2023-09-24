"use client";
import React from "react";
import Card from "../../components/Card";
import { Header } from "../../components/Header";
import { NavPanel } from "../../components/NavPanel";
import TasksProvider from "../../context/TasksContext";

export default function Home() {
  return (
    <>
      <Header type="main" />
      <main>
        <TasksProvider>
          <NavPanel />
          <Card />
        </TasksProvider>
      </main>
    </>
  );
}

// 'use server';
// export const getStaticProps: GetStaticProps = async ()=>{
//   const res = await axios("https://jsonplaceholder.typicode.com/todos?_limit=100")
//   const data = res.data
//   return {props:{data}}
// }
