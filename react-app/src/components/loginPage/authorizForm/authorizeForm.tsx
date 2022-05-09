/* eslint-disable @typescript-eslint/no-explicit-any */
import './authorizeForm.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getUserToken, setAuthorizedUserData } from '../../../react/features/loginSlice';
import { useSelector } from 'react-redux';
import { INewUser } from '../../../interface/types';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import httpClient from '../../../API/api';

const AurhorizeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const [userLogin, setUserLogin] = useState('');
  const userState = useSelector((state: any) => state.loginData);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(userState);
    const userData = {
      login: data.userLoginIn,
      password: data.userPasswordIn,
    } as INewUser;
    setUserLogin(data.userLoginIn);
    dispatch(getUserToken(userData));
  };

  useEffect(() => {
    const findUser = async () => {
      const ALL_USERS = await httpClient.getAllUsers(userState.token);
      const USER = ALL_USERS.filter((el: any) => {
        return el.login === userLogin;
      });
      dispatch(setAuthorizedUserData(USER[0]));
    };
    if (userState.token) {
      findUser();
    }
  }, [userState.token]);

  return (
    <div>
      <p>Authotization</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userLoginIn">
          Login:
          <input
            {...register('userLoginIn', { required: true })}
            type="text"
            name="userLoginIn"
            id="userLoginIn"
          />
        </label>
        <label htmlFor="userPasswordIn">
          Password:
          <input
            {...register('userPasswordIn', { required: true })}
            type="password"
            name="userPasswordIn"
            id="userPasswordIn"
            autoComplete="off"
          />
        </label>
        <input type="submit" onClick={() => console.log('Send')} value={'Send'} />
      </form>
    </div>
  );
};

export default AurhorizeForm;
