"use client";
import styled from "styled-components"
import { Task } from "../components/Task";
import React, { FC, useEffect, useState } from "react";
import { ITask, TasksArray } from "../types/types";
import { paginate } from "../helpers/paginate";;
import Pagination from "./Pagination";
import { Container, EmptyContainer } from "../styles/containers";
const CardBlock = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  width: 466px;
  // width:35vw;
`;

interface ICardProps{
  tasks: TasksArray | null
}

const Card: FC = (props: ICardProps) =>{
  const [tasks, setTasks] = useState<React.ReactNode>();
  const [tasksCount, setTasksCount] = useState<number>(10);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    console.log(props.tasks);
    if (localStorage.getItem('tasks') === null) {
      localStorage.setItem('tasks', JSON.stringify([]))
    }
    if (JSON.parse(localStorage.getItem("tasks") || "").length !== 0) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const arr = tasks.map((item: ITask, index: number) => {
        return <Task id={1} key={index} name={item?.name} isCompleted={item.isCompleted} date={item.date} />;
      })
      setTasksCount(arr.length)
      const paginatedTasks = paginate(arr, currentPage, pageSize);
      setTasks(paginatedTasks)
    }
  }, [currentPage]);
  return (
    <div>
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
    </CardBlock>
    </div>
  );
}
export default Card;