import { useState, createContext, useCallback, useEffect, FC, useRef } from "react";
import { ITask, TasksContextType } from "@/types/types";
import { addTodo, deleteTodo, getTasks, updateTodo } from "@/utils/services/todo.service";

interface Props {
  children: React.ReactNode;
}

export const TasksContext = createContext<TasksContextType | null>(null);

const TasksProvider: FC<Props> = ({ children }) => {

  const [tasks, setTasks] = useState<{ todos: ITask[], todosCount: number }>({ todos: [], todosCount: 10 })
  const [filter, setFilter] = useState<string>('today')
  const [currentPage, setCurrentPage] = useState<number>(1)
  // const [error, setError] = useState<{ createError: string, editError: string }>({ createError: "", editError: "" })

  const fetched = useRef(false)

  const getTodos = useCallback(async (type?: string, search?:string) => {
    try {
      let res;
      switch (type) {
        case "done":
          res = await getTasks(currentPage, "true", "DESC");
          break;
        case "undone":
          res = await getTasks(currentPage, "false", "DESC");
          break;
        case "past":
          res = await getTasks(currentPage, "", "ASC");
          break;
        case "today":
          res = await getTasks(currentPage, type, "DESC");
          break;
        case "search":
          res = await getTasks(currentPage, type, "DESC", search);
          break;
        default:
          res = await getTasks(currentPage, "", "DESC");
      }
      setTasks({ todos: res.rows, todosCount: res.count })
      tasks.todosCount < 11 ? setCurrentPage(1) : null;
    }
    catch (err) {
      console.log(err)
    }
  }, [currentPage, tasks.todosCount]);


  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true
    console.log(filter)
    getTodos(filter)
  }, [filter, getTodos])

  const handleSetFilter = (value: string) => {
    setFilter(value)
    fetched.current = false
  }
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetched.current = false
  };

  const editTask = async (todo: ITask, handleError: (error: string) => void): Promise<boolean | undefined> => {
    try {
      await updateTodo("title", todo)
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
      getTodos(filter)
    }
    catch (err) {
      console.log(err)
    }
  }
  const addTask = async (todo: { title: string, completed: boolean, date: string }, handleError: (error: string) => void): Promise<boolean | undefined> => {
    try {
      await addTodo(todo)
      getTodos(filter)
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
      await updateTodo("completed", todo);
      getTodos(filter)
    }
    catch (err) {
      console.log(err)
    }
  }

  const searchTask =async (value: string) => {
    getTodos("search", value)
    setFilter("search")
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
        currentPage,
        filter,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;

