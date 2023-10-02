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
  addTask: (todo: ITask, handleError: (error: string) => void) => Promise<boolean | undefined>,
  deleteTask: (id: number) => void,
  editTask: ({id, title,  date}:{ id:number, title:string,  date:string }, handleError: (error: string) => void) => Promise<boolean | undefined>,
  onPageChange: (page: number) => void,
  handleSetFilter: (value: string) => void,
  tasksArray: TasksArray | undefined,
  currentPage: number,
  tasksCount: number,
  filter: string,
};
