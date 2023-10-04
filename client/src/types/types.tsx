export interface ITask {
  completed: boolean;
  title: string;
  id: number;
  date: string;
}
export interface IUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  weekStatistics: number;
  allStatistics: number;
}

export type TasksContextType = {
  updateTask: (todo:ITask) => void,
  addTask: (todo: {title: string,completed: boolean, date: string}, handleError: (error: string) => void) => Promise<boolean | undefined>,
  deleteTask: (id: number) => void,
  editTask: (todo:ITask, handleError: (error: string) => void) => Promise<boolean | undefined>,
  onPageChange: (page: number) => void,
  handleSetFilter: (value: string) => void,
  tasksArray: ITask[],
  currentPage: number,
  tasksCount: number,
  filter: string,
};
