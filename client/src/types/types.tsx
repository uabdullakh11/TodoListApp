export interface ITask {
  id: number;
  name: string;
  isCompleted: boolean;
  date: string;
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
  saveTodo: (todo: ITask) => void;
  updateTodo: (id: number) => void;
  editTodo:(id: number, newName: string, newDate: string) => void;
  deleteTodo:(id: number) => void;
  filterToday: () => void;
  filterNew: () => void;
  filterPast: () => void;
  filterAll: () => void;
  filterUndone:() => void;
  filterDone:() => void;
  saveTodos:(arr: ITask[]) => void;
};
