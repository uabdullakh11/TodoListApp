// "use client";
import styled from "styled-components";
import { Task } from "@/components/Task";
import React, { FC, useEffect, useState } from "react";
import { ITask, TasksContextType } from "@/types/types";
import Pagination from "./Pagination";
import { Container, EmptyContainer } from "@/styles/containers";
import { TasksContext } from "@/context/TasksContext";
import { api } from "@/utils/axios/axios";
import { GetStaticProps } from "next";
const CardBlock = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  width: 466px;
  @media (max-width: 689px) {
    width: 100%;
  }
`;

const getTodos = async (currentPage: number) => {
  try {
    const paginatedTasks = await api(`/api/todos/1?page=${currentPage}`);
    return paginatedTasks.data;
  }
  catch (error) {
    console.error(error);
  }
}

const Card: FC = () => {
  const { todos, updateTodo, saveTodos, todosCount, setPage, currentPage } = React.useContext(
    TasksContext
  ) as TasksContextType;

  const [tasks, setTasks] = useState<React.ReactNode>();
  const [tasksCount, setTasksCount] = useState<number>(10);

  // const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const onPageChange = (page: number) => {
    // setCurrentPage(page);
    console.log(page)
    setPage(page)
  };


  useEffect(() => {
    // if (todos !== null && Array.isArray(todos)) {
    //   setTasksCount(todos.length);
    //   todos.length < 11 ? setCurrentPage(1) : null;
    //   const paginatedTasks = paginate(todos, currentPage, pageSize);
    //   const arr = paginatedTasks.map((item: ITask) => {
    //     return (
    //       <Task
    //         id={item.id}
    //         key={item.id}
    //         name={item.name}
    //         isCompleted={item.isCompleted}
    //         date={item.date}
    //         updateTodo={updateTodo}
    //       />
    //     );
    //   });
    //   setTasks(arr);
    // }
    const getTasks = async () => {
      try {
        const paginatedTasks = await api(`/api/todos/1?page=${currentPage}`);
        setTasksCount(paginatedTasks.data.allTodosCount);
        paginatedTasks.data.allTodosCount < 11 ? setPage(1) : null;
        const arr = paginatedTasks.data.currentTodos.map((item: ITask) => {
          return (
            <Task
              id={item.id}
              key={item.id}
              name={item.title}
              isCompleted={item.completed}
              date={item.date}
              updateTodo={updateTodo}
            />
          );
        });
        setTasks(arr);
      } catch (err) {
        console.log(err);
      }
    };

    // getTasks();
    // getTodos(currentPage)
    //   .then((data) => {
    //     setTasksCount(data.allTodosCount);
    //     data.allTodosCount < 11 ? setCurrentPage(1) : null;
    //     const arr = data.currentTodos.map((item: ITask) => {
    //       return (
    //         <Task
    //           id={item.id}
    //           key={item.id}
    //           name={item.title}
    //           isCompleted={item.completed}
    //           date={item.date}
    //           updateTodo={updateTodo}
    //         />
    //       );
    //     });
    //     setTasks(arr);
    //   })
    //   .catch(err => console.log(err));
    // console.log(getTodos(currentPage));
    saveTodos(currentPage)
    
  }, [currentPage]);

  useEffect(() => {
    if (todos !== null && Array.isArray(todos)) {
      setTasksCount(todosCount);
      todosCount < 11 ? setPage(1) : null;
      const arr = todos.map((item: ITask) => {
        return (
          <Task
            id={item.id}
            key={item.id}
            name={item.title}
            isCompleted={item.completed}
            date={item.date}
            updateTodo={updateTodo}
          />
        );
      });
      setTasks(arr);
    }
  }, [todos,currentPage, updateTodo, todosCount]);

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
