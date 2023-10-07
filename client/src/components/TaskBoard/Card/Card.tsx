import { Task } from "@/components/Task/Task";
import React, { FC, useEffect, useState } from "react";
import { ITask, TasksContextType } from "@/types/types";
import Pagination from "../../Pagination/Pagination";
import { Container } from "@/styles/containers";
import { TasksContext } from "@/context/TasksContext";
import { CardBlock, EmptyContainer } from "./cardStyles";

const Card: FC = () => {
  const { tasksArray, onPageChange, currentPage, tasksCount, filter } = React.useContext(TasksContext) as TasksContextType;

  // const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasks, setTasks] = useState<React.ReactNode>();
  const pageSize = 10;

  useEffect(() => {
    const arr = tasksArray.map((item: ITask) => {
      return (
        <Task
          key={item.id}
          id={item.id}
          title={item.title}
          completed={item.completed}
          date={item.date}
        />
      );
    });
    // setTasks(tasksArray);
    setTasks(arr);
  }, [tasksArray, currentPage]);


  return (
    <CardBlock>
      <Container>
        {filter[0].toUpperCase()+filter.slice(1)} tasks quantity: {tasksCount}
        {tasksCount ? (
          <>
            {tasks}
            {/* {tasks.map((item: ITask) => {
              <Task
                key={item.id}
                id={item.id}
                title={item.title}
                completed={item.completed}
                date={item.date}
              />
            })} */}
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
