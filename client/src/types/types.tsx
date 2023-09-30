export interface ITask {
  completed: boolean;
  title: string;
  id?: number | undefined;
  date: string;
}
export interface IUser {
  id: number;
  name: string;
  email: string;
}
export type TasksArray = {
  [x: string]: any;
  todos: ITask[];
}
export type TasksContextType = {
  updateTask: (id: number, completed: boolean, date: string) => void,
  addTask: (todo: ITask) => void,
  deleteTask: (id: number) => void,
  editTask: (id: number, newName: string, newDate: string) => void,
  onPageChange: (page: number) => void,
  handleSetFilter: (value: string) => void,
  tasksArray:TasksArray | undefined,
  currentPage: number,
  tasksCount: number,
  errors: string,
  filter: string,
};
