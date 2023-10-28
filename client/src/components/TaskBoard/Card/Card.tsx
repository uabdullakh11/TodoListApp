import React, { FC } from "react";
import { ITask, TasksContextType } from "@/types/types";
import Pagination from "../../Pagination/Pagination";
import { TasksContext } from "@/context/TasksContext";
import { CardBlock, CardHeader, EmptyContainer, TasksContainer } from "./cardStyles";
import Loader from "../../Loading/loading"
import { SearchTask } from "../SearchTask/SearchTask";
import { useGetTodosQuery } from "@/utils/services/todo.service";

import Task from "@/components/Task/Task";

const Card: FC = () => {
  const { onPageChange, filter } = React.useContext(TasksContext) as TasksContextType;
  const pageSize = 10;

  const {
    data: todos = [],
    isLoading,
    isFetching,
  } = useGetTodosQuery(filter);

  return (
    <CardBlock>
      {isLoading || isFetching ? <Loader /> : todos.length ? (
        <>
          <TasksContainer>
            <CardHeader>
              {filter.filter[0]?.toUpperCase() + filter.filter?.slice(1)} tasks quantity: {todos.length}
              <SearchTask></SearchTask>
            </CardHeader>
            {todos.map((item: ITask) => {
              return (
                <Task
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  completed={item.completed}
                  date={item.date}
                />)
            })}
          </TasksContainer>
          <Pagination
            totalCount={todos.length} // 100
            currentPage={filter.currentPage} // 1
            pageSize={pageSize} // 10
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <EmptyContainer>No tasks yet...</EmptyContainer>
      )}
    </CardBlock>
  );
};
export default Card;
