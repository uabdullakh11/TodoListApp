"use client";
import styled from "styled-components"
import GlobalStyles from  "./css/global";;
import { Task } from "./components/Task";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import { Container, EmptyContainer } from "./css/containers";
import { paginate } from "./helpers/paginate";
const CardBlock = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  width: 466px;
  // width:35vw;
`;

// export const generateStaticParams = async () => {
//   const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
//   return res.data;
// };

interface TaskInterface {
  id: number;
  name: string;
  isCompleted: boolean;
  date: string;
}

export default function Home() {

  const [tasks, setTasks] = useState<React.ReactNode>();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const onPageChange = (page:number) => {
    console.log(page)
    setCurrentPage(page);
  };

  // const paginatedTasks = paginate(tasks, currentPage, pageSize);

  useEffect(() => {
    if (localStorage.getItem('tasks') === null){
      localStorage.setItem('tasks',JSON.stringify([]))
    }
    if (JSON.parse(localStorage.getItem("tasks")).length !== 0) {
      const tasks = localStorage.getItem("tasks")
      const arr = JSON.parse(tasks).map((item:TaskInterface, index:number)=>{
        return <Task id={1} key={index} name={item?.name} isCompleted={item.isCompleted} date={item.date}/>;
      })
      setTasks(arr);
    }
  }, []);
  return (
    <CardBlock>
      <Container>
        {tasks ? tasks : <EmptyContainer>No tasks yet...</EmptyContainer>}
        <Pagination
       items={100} // 100
       currentPage={currentPage} // 1
       pageSize={pageSize} // 10
       onPageChange={onPageChange}
        />
      </Container>
      <GlobalStyles />
    </CardBlock>
  );
}
