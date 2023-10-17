import React, { FC, Suspense } from "react";
import { ITask, TasksContextType } from "@/types/types";
import Pagination from "../../Pagination/Pagination";
import { Container } from "@/styles/containers";
import { TasksContext } from "@/context/TasksContext";
import { CardBlock, CardHeader, EmptyContainer } from "./cardStyles";
import Loader from "../../Loading/loading"
import { SearchTask } from "../SearchTask/SearchTask";

const Task = React.lazy(()=> import("@/components/Task/Task") as any);

const Card: FC = () => {
  const { tasks, onPageChange, filter } = React.useContext(TasksContext) as TasksContextType;
  const pageSize = 10;

  return (
    <CardBlock>
      <Container>
        <Suspense fallback={<Loader />}>
          <CardHeader>
            {filter.filter[0]?.toUpperCase() + filter.filter?.slice(1)} tasks quantity: {tasks.todosCount}
            <SearchTask></SearchTask>
          </CardHeader>
          {tasks.todosCount ? (
            <>
              {tasks.todos.map((item: ITask) => {
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
                totalCount={tasks.todosCount} // 100
                currentPage={filter.currentPage} // 1
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
