import React, { useState } from "react";
import { ITask, TasksArray, TasksContextType } from "@/types/types";
import { api } from "@/utils/axios/axios";


export const TasksContext = React.createContext<TasksContextType | null>(null);

interface Props {
  children: React.ReactNode;
}
const TasksProvider: React.FC<Props> = ({ children }) => {

  const [tasksArray, setTasksArray] = useState<TasksArray>()
  const [filter, setFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [tasksCount, setTasksCount] = useState<number>(10);

  React.useEffect(() => {
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
  }, [currentPage, filter, tasksCount])

  const handleSetFilter = (value: string) => {
    setFilter(value)
  }
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const editTask = async (id: number, newName: string, newDate: string) => {
    const todo = {
      id,
      title: newName,
      date: newDate,
    };
    await api.put("api/todos?update=title", todo);
    setFilter("all")
  }
  const deleteTask = async (id: number) => {
    await api.delete(`api/todos/${id}`);
    setFilter("all")
  }
  const addTask = async (todo: ITask) => {
    const newTodo: ITask = {
      title: todo.title,
      completed: todo.completed,
      date: todo.date,
    };
    await api.post("/api/todos", newTodo);
    setFilter("all")
  }
  const updateTask = async (id: number, completed: boolean, date: string) => {
    const todo = {
      id: id,
      completed: !completed,
      date,
    };
    await api.put("api/todos?update=completed", todo);
    setFilter("all")
  }

  return (
    <TasksContext.Provider
      value={{
        updateTask,
        addTask,
        deleteTask,
        editTask,
        onPageChange,
        handleSetFilter,
        tasksArray,
        currentPage,
        tasksCount,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;

