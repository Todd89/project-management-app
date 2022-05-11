import { Navigate } from 'react-router';
export interface Props {
  children: JSX.Element;
}

function PrivateRoute({ children }: Props): JSX.Element {
  const auth = true;
  return auth ? children : <Navigate to="/" />;
}

export default PrivateRoute;
