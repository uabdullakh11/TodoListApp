// import { Task } from "@/components/Task/Task";
import React, { FC, Suspense, useEffect, useState } from "react";
import { ITask, TasksContextType } from "@/types/types";
import Pagination from "../../Pagination/Pagination";
import { Container } from "@/styles/containers";
import { TasksContext } from "@/context/TasksContext";
import { CardBlock, EmptyContainer } from "./cardStyles";
import Loader from "../../Loading/loading"

const Task = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("@/components/Task/Task") as any);
      }, 2000);
    })
);

import dynamic from "next/dynamic";
// const Task = dynamic(
//   () => import("@/components/Task/Task").then((mod) => mod.Task)
//   ,
//   {
//     suspense: true, ssr: false, loading: () => <Loader></Loader>,
//   }
// );


const Card: FC = () => {
  const { tasksArray, onPageChange, currentPage, tasksCount, filter } = React.useContext(TasksContext) as TasksContextType;

  const [tasks, setTasks] = useState<ITask[]>([]);
  const pageSize = 10;

  useEffect(() => {
    setTasks(tasksArray)
  }, [tasksArray, currentPage]);


  return (
    <CardBlock>
      <Container>
        <Suspense fallback={<Loader />}>
          {filter[0].toUpperCase() + filter.slice(1)} tasks quantity: {tasksCount}
          {tasksCount ? (
            <>
              {tasks.map((item: ITask) => {
                return (
                  <Task
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    completed={item.completed}
                    date={item.date}
                  />)
              })}
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
        </Suspense>
      </Container>
    </CardBlock>
  );
};
export default Card;
