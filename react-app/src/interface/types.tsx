type INewUser = {
  name: string;
  login: string;
  password: string;
};
type IUser = {
  login: string;
  password: string;
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

export { INewUser, IUser, ILoginState, IState };
