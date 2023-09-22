import * as React from 'react';
import { ITask, TasksContextType } from '../types/types';

export const TodoContext = React.createContext<TasksContextType | null>(null);

const TodoProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [todos, setTodos] = React.useState<ITask[]>([
    
  ]);

  const saveTodo = (todo: ITask) => {
    const newTodo: ITask = {
      id: Math.random(), // not really unique - but fine for this example
      name: todo.name,
      isCompleted: todo.isCompleted,
      date: todo.date,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: number) => {
    todos.filter((todo: ITask) => {
      if (todo.id === id) {
        todo.isCompleted = true;
        setTodos([...todos]);
      }
    });
  };

  return <TodoContext.Provider value={{ todos, saveTodo, updateTodo }}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
