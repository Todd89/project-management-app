/* eslint-disable @typescript-eslint/no-explicit-any */
import './authorizeForm.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getUserToken, setAuthorizedUserData } from '../../../../react/features/loginSlice';
import { useSelector } from 'react-redux';
import { INewUser } from '../../../../interface/types';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import httpClient from '../../../../API/api';

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
    <div className="registration-block">
      <p className="info-block-preview">Authotization</p>
      <p className="info-block-status">Status:{userState.status}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userLoginIn">
          Login:
          <input
            {...register('userLoginIn', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 3,
                message: 'Минимум 3 символа',
              },
              pattern: /[\d\wА-я]{3,}/,
            })}
            placeholder="login"
            type="text"
            name="userLoginIn"
            id="userLoginIn"
          />
          {errors.userLoginIn && (
            <span className={'userName-error'} data-testid="userName-error">
              {errors.userLoginIn.message}
            </span>
          )}
        </label>
        <label htmlFor="userPasswordIn">
          Password:
          <input
            {...register('userPasswordIn', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 3,
                message: 'Минимум 3 символов',
              },
              pattern: /[\d\wА-я]{3,}/,
            })}
            placeholder="passsowrd"
            type="password"
            name="userPasswordIn"
            id="userPasswordIn"
            autoComplete="off"
          />
          {errors.userPasswordIn && (
            <span className={'userName-error'} data-testid="userName-error">
              {errors.userPasswordIn.message}
            </span>
          )}
        </label>
        <input type="submit" onClick={() => console.log('Send')} value={'Send'} />
      </form>
    </div>
  );
};

export default AurhorizeForm;
