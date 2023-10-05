import React, { useState } from "react";
import { ITask, TasksContextType } from "@/types/types";
import { api } from "@/utils/axios/axios";
import axios from "axios";
import { addTodo, deleteTodo, getTasks, updateTodo } from "@/utils/services/todo.service";

interface Props {
  children: React.ReactNode;
}

export const TasksContext = React.createContext<TasksContextType | null>(null);

const TasksProvider: React.FC<Props> = ({ children }) => {

  const [tasksArray, setTasksArray] = useState<ITask[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [tasksCount, setTasksCount] = useState<number>(10);

  const getTodos = React.useCallback(async (type: string) => {
    try {
      const all = await getTasks(type, currentPage);
      setTasksArray(all.currentTodos)
      setTasksCount(all.allTodosCount)
      tasksCount < 11 ? setCurrentPage(1) : null;
    }
    catch (err) {
      console.log(err)
    }
  }, [currentPage, tasksCount]);

  React.useEffect(() => {
    getTodos(filter)
  }, [filter, getTodos])
  // }, [currentPage, filter, getTodos, tasksCount])

  const handleSetFilter = (value: string) => {
    setFilter(value)
  }
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const editTask = async (todo: ITask, handleError: (error: string) => void): Promise<boolean | undefined> => {
    try {
      // await api.put("api/todos?update=title", {id, title, date});
      // await api.put("api/todos?update=title", todo)
      await updateTodo("title", todo)
      getTodos("today")
      return true;
    }
    catch (err) {
      handleError(err.message)
      return false;
      // if (axios.isAxiosError(err) && err.response) {
      //   handleError(err.response.data)
      //   return false;
      // }
    }
  }
  const deleteTask = async (id: number) => {
    try {
      // await api.delete(`api/todos/${id}`);
      // setTasksCount(prev=>prev-1)
      await deleteTodo(id)
      getTodos("today")
    }
    catch (err) {
      console.log(err)
    }

  }
  const addTask = async (todo: { title: string, completed: boolean, date: string }, handleError: (error: string) => void): Promise<boolean | undefined> => {
    try {
      await addTodo(todo)
      getTodos("today")
      return true;
    }
    catch (err) {
      handleError(err.message)
      return false;
    }
  }
  const updateTask = async (todo: ITask) => {
    try {
      // await api.put("api/todos?update=completed", todo);
      await updateTodo("completed", todo);
      getTodos("today")
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
        filter
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;

