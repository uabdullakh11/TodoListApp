export interface ITask {
  completed: boolean;
  title: string;
  id: string;
  date: string;
}

export type TasksContextType = {
  updateTask: (todo: ITask) => void,
  addTask: (todo: { title: string, completed: boolean, date: string }, handleError: (error: string) => void) => Promise<boolean | undefined>,
  deleteTask: (id: string) => void,
  editTask: (todo: ITask, handleError: (error: string) => void) => Promise<boolean | undefined>,
  onPageChange: (page: number) => void,
  handleSetFilter: (filter: { filter: string, currentPage: number, search: string }) => void,
  searchTask: (value: string) => void,
  tasks: { todos: ITask[], todosCount: number },
  filter: { filter: string, currentPage: number, search: string },
};

export type AccountContextType = {
  isProfile: boolean;
  userName: string;
  userEmail: string;
  userAvatar: string;
  userStatisctic: { WeekPercant: number, AllTimePercant: number };
  error: { avatarError: string, userNameError: string, userEmailError: string };
  handleProfileClick: (value: boolean) => void;
  handleChangeAvatar: (avatarIcon: FormData) => void;
  handleChangeUserName: (userData: { newLogin: string, newEmail: string }) => void;
  handleChangeUserEmail: (userData: { newLogin: string, newEmail: string }) => void;
}