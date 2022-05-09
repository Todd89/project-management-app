/* eslint-disable @typescript-eslint/no-explicit-any */
import RegisterForm from './registerForm/registerForm';
import AurhorizeForm from './authorizForm/authorizeForm';
import LogautButton from './logaut/logaut';
import './loginPage.css';
import { useSelector } from 'react-redux';

const LoginPage: React.FC = () => {
  const userState = useSelector((state: any) => state.loginData);
  return (
    <div>
      <p>Status:{userState.status}</p>
      <RegisterForm />
      <AurhorizeForm />
      <LogautButton />
      <p>User ID:{userState.id}</p>
      <p>User Login :{userState.login}</p>
      <p>User Name:{userState.name}</p>
    </div>
  );
};

export default LoginPage;
