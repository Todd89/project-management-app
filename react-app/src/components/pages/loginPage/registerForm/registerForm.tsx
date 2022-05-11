/* eslint-disable @typescript-eslint/no-explicit-any */
import './registerForm.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { setNewUser } from '../../../../react/features/loginSlice';
import { useSelector } from 'react-redux';
import { INewUser } from '../../../../interface/types';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const navigate = useNavigate();
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
      navigate('/login');
    }
  }, [userState.id]);

  return (
    <div className="registration-block">
      <p className="info-block-preview">Register new user</p>
      <p className="info-block-status">Status:{userState.status}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userName">
          Name:
          <input
            {...register('userName', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 3,
                message: 'Минимум 3 символа',
              },
              pattern: /[\d\wА-я]{3,}/,
            })}
            placeholder="Name"
            type="text"
            name="userName"
            id="userName"
          />
          {errors.userName && <span className="userName-error">{errors.userName.message}</span>}
        </label>
        <label htmlFor="userLogin">
          Login:
          <input
            {...register('userLogin', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 3,
                message: 'Минимум 3 симовла',
              },
              pattern: /[\d\wА-я]{3,}/,
            })}
            placeholder="login"
            type="text"
            name="userLogin"
            id="userLogin"
          />
          {errors.userLogin && <span className="userName-error">{errors.userLogin.message}</span>}
        </label>
        <label htmlFor="userPassword">
          Password:
          <input
            {...register('userPassword', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 3,
                message: 'Минимум 3 символов',
              },
              pattern: /[\d\wА-я]{3,}/,
            })}
            placeholder="password"
            type="password"
            name="userPassword"
            id="userPassword"
            autoComplete="off"
          />
          {errors.userPassword && (
            <span className="userName-error">{errors.userPassword.message}</span>
          )}
        </label>
        <input type="submit" onClick={() => console.log('Send')} value={'Send'} />
      </form>
    </div>
  );
};

export default RegisterForm;
