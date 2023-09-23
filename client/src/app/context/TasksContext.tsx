import React from 'react';
import { ITask, TasksContextType } from '../types/types';
import getDate from '../helpers/getDate';

export const TasksContext = React.createContext<TasksContextType | null>(null);

interface Props {
  children: React.ReactNode;
}
const TasksProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = React.useState<ITask[]>([]);
  const [allTodos, setAllTodos] = React.useState<ITask[]>([]);

  const { currentDate } = getDate();

  const saveTodo = (todo: ITask) => {
    const newTodo: ITask = {
      id: todo.id,
      name: todo.name,
      isCompleted: todo.isCompleted,
      date: todo.date,
    };
    setTodos([...todos, newTodo]);
    setAllTodos([...todos, newTodo])
  };

  const updateTodo = (id: number) => {
    todos.filter((todo: ITask) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
        setTodos([...todos]);
      }
    });
    setAllTodos([...todos])
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo: ITask) => todo.id !== id)
    setTodos([...newTodos]);
    setAllTodos([...todos])
  }

  const editTodo = (id: number, newName: string, newDate: string) => {
    const newTasks = todos.map((item: ITask) => {
      if (item.id === id) {
        [item.name, item.date] = [newName, newDate]
      }
      return item;
    });
    setTodos(newTasks);
    setAllTodos([...todos])
  }

  const filterToday = () => {
    todos.sort((a: ITask, b: ITask) => {
      if (a.date < b.date) return 1
      else return -1
    })
    todos.filter((item: ITask) => {
      if (item.date.slice(0, 9) === currentDate) {
        return item
      }
    });
    setTodos([...todos]);
  }

  const filterNew = () => {
    todos.sort((a: ITask, b: ITask) => {
      if (a.date < b.date) return 1
      else return -1
    })
    setTodos([...todos])

  }

  const filterPast = () => {
    todos.sort((a: ITask, b: ITask) => {
      if (a.date > b.date) return 1
      else return -1
    })
    setTodos([...todos])
  }

  const filterAll = () => {
    setTodos([...allTodos]);
  }

  const filterDone = () => {
    const doneTasks = allTodos.filter((item: ITask) => item.isCompleted) 
    setTodos([...doneTasks])
  }

  const filterUndone = () => {
    const undoneTasks = allTodos.filter((item: ITask) => !item.isCompleted) 
    setTodos([...undoneTasks])
  }

  return <TasksContext.Provider value={{ todos, saveTodo, updateTodo, editTodo, deleteTodo, filterNew, filterPast, filterToday, filterAll, filterUndone, filterDone  }}>{children}</TasksContext.Provider>;
};

export default TasksProvider;
