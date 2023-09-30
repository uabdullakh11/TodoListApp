import styled from "styled-components";
import { Task } from "@/components/Task";
import React, { FC, useEffect, useState } from "react";
import { ITask, TasksContextType } from "@/types/types";
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

const Card:FC= () => {
  const { tasksArray, onPageChange, currentPage, tasksCount, filter } = React.useContext(TasksContext) as TasksContextType;

  const [tasks, setTasks] = useState<React.ReactNode>();
  const pageSize = 10;

  useEffect(() => {
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
}, [tasksArray, currentPage]);


  return (
    <CardBlock>
      <Container>
      {filter} tasks quantity: {tasksCount}
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
