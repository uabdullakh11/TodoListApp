// "use client";
import styled from "styled-components";
import { Task } from "@/components/Task";
import React, { FC, useEffect, useState } from "react";
import { ITask, TasksContextType } from "@/types/types";
import { paginate } from "@/helpers/paginate";
import Pagination from "./Pagination";
import { Container, EmptyContainer } from "@/styles/containers";
import { TasksContext } from "@/context/TasksContext";
const CardBlock = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  width: 466px;
  @media (max-width: 689px) {
    width: 100%;
  }
`;

const Card: FC = () => {
  const { todos, updateTodo } = React.useContext(TasksContext) as TasksContextType;

  const [tasks, setTasks] = useState<React.ReactNode>();
  // const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksCount, setTasksCount] = useState<number>(10);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (todos !== null && Array.isArray(todos)) {
      setTasksCount(todos.length);
      todos.length<11 ? setCurrentPage(1) : null;
      const paginatedTasks = paginate(todos, currentPage, pageSize);
       const arr = paginatedTasks.map((item: ITask) => {
        return (
          <Task
            id={item.id}
            key={item.id}
            name={item.name}
            isCompleted={item.isCompleted}
            date={item.date}
            updateTodo={updateTodo}
          />
        );
      });
      setTasks(arr);
    }
  }, [todos, currentPage, updateTodo]);

  return (
    <CardBlock>
      <Container>
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