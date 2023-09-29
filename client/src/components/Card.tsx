import styled from "styled-components";
import { Task } from "@/components/Task";
import React, { FC, useEffect, useState } from "react";
import { ITask, TasksArray, TasksContextType } from "@/types/types";
import Pagination from "./Pagination";
import { Container, EmptyContainer } from "@/styles/containers";
import {TasksContext} from "@/context/TasksContext";
const CardBlock = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  width: 466px;
  @media (max-width: 689px) {
    width: 100%;
  }
`;

interface CardProps {
  tasksArray: TasksArray | undefined;
  currentPage: number;
  tasksCount: number;
  onPageChange: (pageNumber:number)=>void;
}
// const Card:FC<CardProps> = (props: CardProps) => {

const Card:FC= () => {
  const { tasksArray, onPageChange, currentPage, tasksCount } = React.useContext(TasksContext) as TasksContextType;

  const [tasks, setTasks] = useState<React.ReactNode>();
  const pageSize = 10;

  useEffect(() => {
    // const arr = props.tasksArray?.map((item: ITask) => {
      const arr = tasksArray?.map((item: ITask) => {
      return (
        <Task
          id={item.id}
          key={item.id}
          name={item.title}
          isCompleted={item.completed}
          date={item.date}
        />
      );
    });
    setTasks(arr);
  // }, [props.tasksArray, props.currentPage]);
}, [tasksArray, currentPage]);


  return (
    <CardBlock>
      <Container>
        {/* {props.tasksCount ? (
          <>
            {tasks}
            <Pagination
              items={props.tasksCount} // 100
              currentPage={props.currentPage} // 1
              pageSize={pageSize} // 10
              onPageChange={props.onPageChange}
            />
          </>
        ) : (
          <EmptyContainer>No tasks yet...</EmptyContainer>
        )} */}
        {tasksCount ? (
          <>
            {tasks}
            <Pagination
              items={tasksCount} // 100
              currentPage={currentPage} // 1
              pageSize={pageSize} // 10
              onPageChange={onPageChange}
            />
          </>
        ) : (
          <EmptyContainer>No tasks yet...</EmptyContainer>
        )}
      </Container>
    </CardBlock>
  );
};
export default Card;
