import { Navigate } from 'react-router';

export interface Props {
  children: JSX.Element;
  token: string;
}

function PrivateRoute({ children, token }: Props): JSX.Element {
  return token != '' ? children : <Navigate to="/" />;
}

export default PrivateRoute;
