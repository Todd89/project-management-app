type INewUser = {
  name: string;
  login: string;
  password: string;
};
type IUser = {
  login: string;
};
type ILoginState = {
  name: string;
  login: string;
  id: string;
  token: string;
  status: string;
};
type IState = {
  loginData: ILoginState;
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

type IRegisterData = {
  userName: string;
  userLogin: string;
  userPassword: string;
};

type IAuthorizeData = {
  userLogin: string;
  userPassword: string;
};
type IEditUser = {
  ID: string;
  token: string;
  user: INewUser;
};
type IDeleteUser = {
  ID: string;
  token: string;
};
type IToken = {
  iat: number;
  login: string;
  userId: string;
};

export {
  INewUser,
  IUser,
  INewBoard,
  INewColumn,
  INewTask,
  IState,
  IRegisterData,
  IAuthorizeData,
  ILoginState,
  IEditUser,
  IDeleteUser,
  IToken,
};
