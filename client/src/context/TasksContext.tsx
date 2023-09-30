import React, { useState } from "react";
import { ITask, TasksArray, TasksContextType } from "@/types/types";
import { api } from "@/utils/axios/axios";
import axios from "axios";


export const TasksContext = React.createContext<TasksContextType | null>(null);

interface Props {
  children: React.ReactNode;
}
const TasksProvider: React.FC<Props> = ({ children }) => {

  const [tasksArray, setTasksArray] = useState<TasksArray>()
  const [filter, setFilter] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [tasksCount, setTasksCount] = useState<number>(10);
  const [errors, setErrors] = useState<string>("")

  React.useEffect(() => {
    const getTodos = async (type: string) => {
      try {
        switch (type) {
          case "All":
            const all = await api(`/api/todos?page=${currentPage}`);
            setTasksArray(all.data.currentTodos)
            setTasksCount(all.data.allTodosCount)
            break;
          case "Today":
            const today = await api(`/api/todos/today?page=${currentPage}`);
            setTasksArray(today.data.currentTodos)
            setTasksCount(today.data.allTodosCount)
            break;
          case "Done":
            const done = await api(`/api/todos/done?page=${currentPage}`);
            setTasksArray(done.data.currentTodos)
            setTasksCount(done.data.allTodosCount)
            break;
          case "Undone":
            const undone = await api(`/api/todos/undone?page=${currentPage}`);
            setTasksArray(undone.data.currentTodos)
            setTasksCount(undone.data.allTodosCount)
            break;
          case "New":
            const newTodos = await api(`/api/todos/new?page=${currentPage}`);
            setTasksArray(newTodos.data.currentTodos)
            setTasksCount(newTodos.data.allTodosCount)
            break;
          case "Past":
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
      }
      catch (err) {
        console.log(err)
      }
    };
    getTodos(filter)
    return () => { }
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
      title: newName.trim(),
      date: newDate,
    };
    console.log("update")
    try {
      await api.put("api/todos?update=title", todo);
    }
    catch (err) {
      if (axios.isAxiosError(err) && err.response){
        setErrors(err.response.data)
        console.log(errors)
      }
    }
    setFilter("all")
    console.log(filter)
  }
  const deleteTask = async (id: number) => {
    try {
      await api.delete(`api/todos/${id}`);
      console.log("delete")
      setFilter("all")
      console.log(filter)
    }
    catch (err) {
      console.log(err)
    }

  }
  const addTask = async (todo: ITask) => {
    const newTodo: ITask = {
      title: todo.title.trim(),
      completed: todo.completed,
      date: todo.date,
    };
    try {
      await api.post("/api/todos", newTodo);
    }
    catch (err) {
      if (axios.isAxiosError(err) && err.response){
        setErrors(err.response.data)
        console.log(errors)
      }
    }

    console.log("add task")
    setFilter("all")
    console.log(filter)
  }
  const updateTask = async (id: number, completed: boolean, date: string) => {
    const todo = {
      id: id,
      completed: !completed,
      date,
    };
    try {
      await api.put("api/todos?update=completed", todo);
      console.log("update")
      setFilter("today")
      console.log(filter)
    }
    catch (err) {
      console.log(err)
    }

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
        errors,
        filter
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;

