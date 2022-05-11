type INewUser = {
  name: string;
  login: string;
  password: string;
};
type IUser = {
  login: string;
  password: string;
};
type INewBoard = {
  title: string;
};
type INewColumn = {
  title: string;
};
type INewTask = {
  title: string;
  order: number;
  description: string;
  userId: string;
};

export { INewUser, IUser, INewBoard, INewColumn, INewTask };
