"use client";
import styled from "styled-components"
import { InferGetStaticPropsType } from 'next'
import GlobalStyles from "./styles/global";;
import { Task } from "./components/Task";
import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import { Container, EmptyContainer } from "./styles/containers";
import { paginate } from "./helpers/paginate";
import { GetStaticProps } from "next";
import axios from "axios";
const CardBlock = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  width: 466px;
  // width:35vw;
`;
interface TaskInterface {
  id: number;
  name: string;
  isCompleted: boolean;
  date: string;
}
// export default function Home({data}:InferGetStaticPropsType<typeof getStaticProps>) {
export default function Home() {
  const [tasks, setTasks] = useState<React.ReactNode>();
  const [tasksCount, setTasksCount] = useState<number>(10);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (localStorage.getItem('tasks') === null) {
      localStorage.setItem('tasks', JSON.stringify([]))
    }
    if (JSON.parse(localStorage.getItem("tasks") || "").length !== 0) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const arr = tasks.map((item: TaskInterface, index: number) => {
        return <Task id={1} key={index} name={item?.name} isCompleted={item.isCompleted} date={item.date} />;
      })
      setTasksCount(arr.length)
      const paginatedTasks = paginate(arr, currentPage, pageSize);
      setTasks(paginatedTasks)
    }
  }, [currentPage]);

  useEffect(() => {
    console.log()
  },[]);
  return (
    <CardBlock>
      <Container>
        {tasks ? <>
        {tasks}
        <Pagination
          items={tasksCount} // 100
          currentPage={currentPage} // 1
          pageSize={pageSize} // 10
          onPageChange={onPageChange}
        />
        </> : <EmptyContainer>No tasks yet...</EmptyContainer>}
      </Container>
      <GlobalStyles />
    </CardBlock>
  );
}

// 'use server';
// export const getStaticProps: GetStaticProps = async ()=>{
//   const res = await axios("https://jsonplaceholder.typicode.com/todos?_limit=100")
//   const data = res.data
//   return {props:{data}}
// }