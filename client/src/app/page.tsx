"use client";
import styled from "styled-components";
import { Task } from "./components/Task";
import axios from "axios";
import React, { ReactComponentElement, useEffect, useState } from "react";
import Pagination from "./components/Pagination";
const CardBlock = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  width: 466px;
  // width:35vw;
`;
const Container = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const EmptyContainer = styled.h2`
  text-align: center;
  font-family: "Roboto", sans-serif;
`;

export const generateStaticParams = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
  return res.data;
};

interface Todo {
  id: string;
  title: string;
}

export default function Home(params: Array<Todo>) {
  const [tasks, setTasks] = useState<React.ReactNode>();

  // const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 10;

  // const onPageChange = (page:any) => {
  //   setCurrentPage(page);
  // };

  useEffect(() => {
    if (localStorage.getItem("task")) {
      const task = localStorage.getItem("task") || "";
      //const tasks = JSON.parse(localStorage.getItem("task")) || "";
      setTasks(<Task id={1} isCompleted={true} name={task} date={"Today, 18:30"}></Task>)
    }
  }, []);
  return (
    <CardBlock>
      <Container>
        {tasks ? tasks : <EmptyContainer>No tasks yet...</EmptyContainer>}
        {/* <ThePagination
       items={100} // 100
       currentPage={currentPage} // 1
       pageSize={pageSize} // 10
       onPageChange={onPageChange}
        /> */}
      </Container>
    </CardBlock>
  );
}
