import React from 'react';
import { ITask, TasksContextType } from '@/types/types';
import getDate from '@/helpers/getDate';
import { api } from '@/utils/axios/axios';

const getTodos = async (currentPage:number) => {
  const res = await api(`/api/todos/1?page=${currentPage}`);
  return res.data
}

export const TasksContext = React.createContext<TasksContextType | null>(null);

interface Props {
  children: React.ReactNode;
}
const TasksProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = React.useState<ITask[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1)

  const [allTodos, setAllTodos] = React.useState<ITask[]>([]);

  const [todosCount, setTodosCount] = React.useState<number>(0);
  const { currentDate } = getDate();

  const setPage = async (pageNumber:number) =>{
    setCurrentPage(pageNumber)
  }

  const saveTodos = async (currentPage:number) => {
    const data = await getTodos(currentPage)
    // setAllTodos([...data.currentTodos])
    setTodos([...data.currentTodos])
    setTodosCount(data.allTodosCount)
  }
  // const saveTodo = async (todo: ITask) => {
  //   const newTodo: ITask = {
  //     id: todo.id,
  //     title: todo.title,
  //     completed: todo.completed,
  //     date: todo.date,
  //   };
  //   //const res = await api.post('/api/todos', newTodo);
  //   const data = await getTodos();
  //   console.log(data)
  //   setTodos([...todos, newTodo]);
  //   setAllTodos([...todos, newTodo])
  // };

  const saveTodo = async (todo: ITask) => {
    const newTodo: ITask = {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      date: todo.date,
      userId: todo.userId
    };
    await api.post('/api/todos', newTodo);
  }
  const updateTodo = async (id: number, completed: boolean) => {
    // todos.filter((todo: ITask) => {
    //   if (todo.id === id) {
    //     todo.completed = !todo.completed;
    //     setTodos([...todos]);
    //   }
    // });
    // setAllTodos([...todos])
    const todo = {
      id: id,
      completed: !completed
    }
    await api.put("api/todos/1?update=completed", todo);
  };

  const deleteTodo = async (id: number) => {
    // const newTodos = todos.filter((todo: ITask) => todo.id !== id)
    // setTodos([...newTodos]);
    const taskId = {
      id: id,
    }
    await api.delete("api/todos/1", {
      data: taskId,
    });
    // setTodos([...newTodos]);
    // setAllTodos([...todos])
  }

  const editTodo = async (id: number, newName: string, newDate: string) => {
    // const newTasks = todos.map((item: ITask) => {
    //   if (item.id === id) {
    //     [item.title, item.date] = [newName, newDate]
    //   }
    //   return item;
    // });
    // setTodos(newTasks);
    // setAllTodos([...todos])
    const todo = {
      id,
      title: newName,
      date: newDate,
    }
    await api.put("api/todos/1?update=title", todo);
  }

  const filterToday = async(currentPage:number) => {
    // allTodos.sort((a: ITask, b: ITask) => {
    //   if (a.date < b.date) return 1
    //   else return -1
    // })
    // allTodos.filter((item: ITask) => {
    //   if (item.date.slice(0, 9) === currentDate) {
    //     return item
    //   }
    // });
    // setTodos([...allTodos]);
    const todayTodos = await api(`/api/todos/1/today?page=${currentPage}`)
    setTodos([...todayTodos.data.currentTodos])
    setTodosCount(todayTodos.data.allTodosCount)
  }

  const filterNew = async () => {
    // todos.sort((a: ITask, b: ITask) => {
    //   if (a.date < b.date) return 1
    //   else return -1
    // })
    // setTodos([...todos])

    const newTodos = await api("api/todos/1/new?page=1")
    setTodos([...newTodos.data.currentTodos])
    setTodosCount(newTodos.data.allTodosCount)
  }

  const filterPast = async () => {
    // todos.sort((a: ITask, b: ITask) => {
    //   if (a.date > b.date) return 1
    //   else return -1
    // })
    // setTodos([...todos])
    const pastTodos = await api("api/todos/1/past?page=1")
    setTodos([...pastTodos.data.currentTodos])
    setTodosCount(pastTodos.data.allTodosCount)
  }

  const filterAll = async (currentPage:number) => {
    // setTodos([...allTodos]);
    const allTodos = await api(`api/todos/1?page=${currentPage}`);
    setTodos([...allTodos.data.currentTodos]);
    setTodosCount(allTodos.data.allTodosCount)
  }

  const filterDone = async () => {
    // const doneTasks = allTodos.filter((item: ITask) => item.completed)
    // setTodos([...doneTasks])
    const doneTodos = await api('api/todos/1/done?page=1');
    setTodos([...doneTodos.data.currentTodos])
    setTodosCount(doneTodos.data.allTodosCount)
  }

  const filterUndone = async (currentPage:number) => {
    // const undoneTasks = allTodos.filter((item: ITask) => !item.completed)
    // setTodos([...undoneTasks])

    const undoneTodos = await api(`api/todos/1/undone?page=${currentPage}`);
    setTodos([...undoneTodos.data.currentTodos])
    setTodosCount(undoneTodos.data.allTodosCount)
  }

  return <TasksContext.Provider value={{ todosCount, allTodos, todos, currentPage, setPage, saveTodos, saveTodo, updateTodo, editTodo, deleteTodo, filterNew, filterPast, filterToday, filterAll, filterUndone, filterDone }}>{children}</TasksContext.Provider>;
};

export default TasksProvider;


