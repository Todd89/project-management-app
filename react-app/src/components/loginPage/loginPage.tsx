/* eslint-disable @typescript-eslint/no-explicit-any */
import './loginPage.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getUserToken, setNewUser } from '../../react/features/loginSlice';
import { useSelector } from 'react-redux';
import { INewUser } from '../../interface/types';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const userState = useSelector((state: any) => state.loginData);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(userState);
    const user = {
      name: data.userName,
      login: data.userLogin,
      password: data.userPassword,
    } as INewUser;
    dispatch(setNewUser(user));
  };

  useEffect(() => {
    if (userState.id) {
      dispatch(getUserToken({ login: userState.login, password: userState.password }));
    }
  }, [userState.id]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userName">
          Name:
          <input
            {...register('userName', { required: true })}
            type="text"
            name="userName"
            id="userName"
          />
        </label>
        <label htmlFor="userLogin">
          Login:
          <input
            {...register('userLogin', { required: true })}
            type="text"
            name="userLogin"
            id="userLogin"
          />
        </label>
        <label htmlFor="userPassword">
          Password:
          <input
            {...register('userPassword', { required: true })}
            type="password"
            name="userPassword"
            id="userPassword"
            autoComplete="off"
          />
        </label>
        <input type="submit" onClick={() => console.log('Send')} value={'Send'} />
      </form>
    </div>
  );
};

export default LoginPage;
