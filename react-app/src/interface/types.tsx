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

type ILoginState = {
  name: string;
  login: string;
  password: string;
  id: string;
  token: string;
  status: string;
};

type IState = {
  loginData: ILoginState;
};

type IRegisterData = {
  userName: string;
  userLogin: string;
  userPassword: string;
};

type IAuthorizeData = {
  userLogin: string;
  userPassword: string;
};

export { INewUser, IUser, INewBoard, INewColumn, INewTask, IState, IRegisterData, IAuthorizeData };
