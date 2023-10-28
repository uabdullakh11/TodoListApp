export interface ITask {
  completed: boolean;
  title: string;
  id: string;
  date: string;
}

export type TasksContextType = {
  onPageChange: (page: number) => void,
  handleSetFilter: (filter: { filter: string, currentPage: number, search: string }) => void,
  searchTask: (value: string) => void,
  filter: { filter: string, currentPage: number, search: string },
};

export type AccountContextType = {
  isProfile: boolean;
  handleProfileClick: (value: boolean) => void;
}

export type tokenReceived = {
  ACCESS_TOKEN: string;
  expires_in: string;
  REFRESH_TOKEN: string;
}