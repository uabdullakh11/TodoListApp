export interface ITask {
  completed: boolean;
  title: string;
  id: number;
  date: string;
  userId?: number;
}
export interface IUser {
    id: number;
    name: string;
    email: string;
}
export type TasksArray = {
  todos: ITask[];
}
export type TasksContextType = {
  todos: ITask[];
  allTodos: ITask[];
  todosCount: number;
  currentPage: number;
  setPage: (pageNumber:number)=>void;
  // saveTodo: (todo: ITask) => void;
  saveTodo: (todo: ITask) => void
  updateTodo: (id: number, completed: boolean) => void;
  editTodo:(id: number, newName: string, newDate: string) => void;
  deleteTodo:(id: number) => void;
  filterToday: (currentPage:number) => void;
  filterNew: () => void;
  filterPast: () => void;
  filterAll: (currentPage:number) => void;
  filterUndone:(currentPage:number) => void;
  filterDone:() => void;
  saveTodos:(currentPage: number) => void;
};
