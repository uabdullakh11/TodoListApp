import {useState, createContext, useCallback, useEffect, FC, useRef} from "react";
import { ITask, TasksContextType } from "@/types/types";
import { addTodo, deleteTodo, getTasks, updateTodo } from "@/utils/services/todo.service";

interface Props {
  children: React.ReactNode;
}

export const TasksContext = createContext<TasksContextType | null>(null);

const TasksProvider: FC<Props> = ({ children }) => {

  const [tasksArray, setTasksArray] = useState<ITask[]>([])
  const [filter, setFilter] = useState<string>('today')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [tasksCount, setTasksCount] = useState<number>(10);

  const fetched = useRef(false)

  const getTodos = useCallback(async (type: string) => {
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

  
  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true
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
      // handleSetFilter("today")
      // setCurrentPage(1)
      return true;
    }
    catch (err) {
      if (err instanceof Error) {
        handleError(err.message)
        return false;
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

