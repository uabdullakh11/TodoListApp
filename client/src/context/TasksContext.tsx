import { useState, createContext, FC } from "react";
import { TasksContextType } from "@/types/types";

interface Props {
  children: React.ReactNode;
}

export const TasksContext = createContext<TasksContextType | null>(null);

const TasksProvider: FC<Props> = ({ children }) => {
  const [filter, setFilter] = useState<{ filter: string, currentPage: number, search: string }>({ filter: "today", currentPage: 1, search: "" })

  const handleSetFilter = (filter:{ filter: string, currentPage: number, search: string }) => {
    setFilter(filter)
  }
  const onPageChange = (page: number) => {
    handleSetFilter({filter: filter.filter, currentPage: page,search: filter.search})
  };
  const searchTask = async (value: string) => {
    handleSetFilter({filter:"search", currentPage: 1, search:value})
  }
  return (
    <TasksContext.Provider
      value={{
        onPageChange,
        handleSetFilter,
        searchTask,
        filter,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;

