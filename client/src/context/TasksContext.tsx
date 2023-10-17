import { useState, createContext, useCallback, useEffect, FC, useRef } from "react";
import { ITask, TasksContextType } from "@/types/types";
import { addTodo, deleteTodo, getTasks, updateTodo } from "@/utils/services/todo.service";

interface Props {
  children: React.ReactNode;
}

export const TasksContext = createContext<TasksContextType | null>(null);

const TasksProvider: FC<Props> = ({ children }) => {

  const [tasks, setTasks] = useState<{ todos: ITask[], todosCount: number }>({ todos: [], todosCount: 10 })
  const [filter, setFilter] = useState<{ filter: string, currentPage: number, search: string }>({ filter: "today", currentPage: 1, search: "" })

  const fetched = useRef(false)

  const getTodos = useCallback(async (filter:{ filter: string, currentPage: number, search: string }) => {
    try {
      const res = await getTasks(filter)
      setTasks({ todos: res.rows, todosCount: res.count })
      tasks.todosCount < 11 ? setFilter({filter: filter.filter, currentPage: 1,search: filter.search}) : null;
    }
    catch (err) {
      console.log(err)
    }
  }, [tasks.todosCount]);


  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true
    getTodos(filter)
  }, [filter, getTodos])

  const handleSetFilter = (filter:{ filter: string, currentPage: number, search: string }) => {
    setFilter(filter)
    fetched.current = false
  }
  const onPageChange = (page: number) => {
    handleSetFilter({filter: filter.filter, currentPage: page,search: filter.search})
    fetched.current = false
  };

  const editTask = async (todo: ITask, handleError: (error: string) => void): Promise<boolean | undefined> => {
    try {
      await updateTodo(todo)
      getTodos(filter)
      return true;
    }
    catch (err) {
      if (err instanceof Error) {
        handleError(err.message)
        return false;
        // setError({ createError: "", editError: err.message })
      }
    }
  }
  const deleteTask = async (id: string) => {
    try {
      await deleteTodo(id)
      getTodos({filter:filter.filter, currentPage: 1, search:filter.search})
    }
    catch (err) {
      console.log(err)
    }
  }
  const addTask = async (todo: { title: string, completed: boolean, date: string }, handleError: (error: string) => void): Promise<boolean | undefined> => {
    try {
      await addTodo(todo)
      getTodos({filter:filter.filter, currentPage: 1, search:filter.search})
      return true
    }
    catch (err) {
      if (err instanceof Error) {
        handleError(err.message)
        return false;
        // setError({ createError: err.message, editError: "" })
      }
    }
  }
  const updateTask = async (todo: ITask) => {
    try {
      await updateTodo(todo);
      getTodos(filter)
    }
    catch (err) {
      console.log(err)
    }
  }

  const searchTask = async (value: string) => {
    setFilter({filter:"search", currentPage: 1, search:value})
    getTodos({filter:"search", currentPage: 1, search:value})
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
        searchTask,
        tasks,
        filter,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;

