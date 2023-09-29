import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import { NavPanel } from "@/components/NavPanel";
import TasksProvider from "@/context/TasksContext";
import HomeLayout from "@/layouts/HomeLayout";
import { api } from "@/utils/axios/axios";
import { TasksArray } from "@/types/types";

export default function Home() {

  const [tasksArray, setTasksArray] = useState<TasksArray>()
  const [filter, setFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [tasksCount, setTasksCount] = useState<number>(10);

  useEffect(() => {
    const getTodos = async (type: string) => {
      switch (type) {
        case "all":
          const all = await api(`/api/todos?page=${currentPage}`);
          setTasksArray(all.data.currentTodos)
          setTasksCount(all.data.allTodosCount)
          break;
        case "today":
          const today = await api(`/api/todos/today?page=${currentPage}`);
          setTasksArray(today.data.currentTodos)
          setTasksCount(today.data.allTodosCount)
          break;
        case "done":
          const done = await api(`/api/todos/done?page=${currentPage}`);
          setTasksArray(done.data.currentTodos)
          setTasksCount(done.data.allTodosCount)
          break;
        case "undone":
          const undone = await api(`/api/todos/undone?page=${currentPage}`);
          setTasksArray(undone.data.currentTodos)
          setTasksCount(undone.data.allTodosCount)
          break;
        case "new":
          const newTodos = await api(`/api/todos/new?page=${currentPage}`);
          console.log(newTodos)
          setTasksArray(newTodos.data.currentTodos)
          setTasksCount(newTodos.data.allTodosCount)
          console.log(currentPage)
          break;
        case "past":
          const past = await api(`/api/todos/past?page=${currentPage}`);
          setTasksArray(past.data.currentTodos)
          setTasksCount(past.data.allTodosCount)
          break;
        default:
          const res = await api(`/api/todos?page=${currentPage}`);
          setTasksArray(res.data.currentTodos)
          setTasksCount(res.data.allTodosCount)
      }
      tasksCount < 11 ? setCurrentPage(1) : null;
    };
    getTodos(filter)
  }, [filter, currentPage, tasksCount])

  const handleSetFilter = (value: string) => {
    setFilter(value)
  }
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <HomeLayout>
      <TasksProvider>
        <NavPanel />
        <Card />
        {/* <NavPanel handleSetFilter={handleSetFilter} /> */}
        {/* <Card tasksArray={tasksArray} onPageChange={onPageChange} currentPage={currentPage} tasksCount={tasksCount} /> */}
      </TasksProvider>
    </HomeLayout>
  );
}
