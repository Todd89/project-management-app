import './editProfileForm.css';
import { useForm } from 'react-hook-form';
import {
  deleteUserProfile,
  editUserProfile,
  clearUserStatus,
} from '../../../../react/features/loginSlice';
import { useSelector } from 'react-redux';
import { INewUser, IState, IDeleteUser } from '../../../../interface/types';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { USER_STATUS } from '../../../../constant/constant';

type FormData = {
  userName: string;
  userLogin: string;
  userPassword: string;
};

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({ mode: 'onChange', reValidateMode: 'onChange' });
  const navigate = useNavigate();
  const userState = useSelector((state: IState) => state.loginData);
  const [submitBtnDisabled, setSubmitInputDisabled] = useState(true);
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    const NEW_USER = {
      name: data.userName,
      login: data.userLogin,
      password: data.userPassword,
    } as INewUser;
    const EDIT_USER = {
      ID: userState.id,
      token: userState.token,
      user: NEW_USER,
    };
    dispatch(editUserProfile(EDIT_USER));
  });

  const closeEditWindow = () => {
    navigate('/main');
  };

  useEffect(() => {
    if (isDirty && isValid) {
      setSubmitInputDisabled(false);
    }
  }, [isDirty, isValid]);

  useEffect(() => {
    if (userState.status === USER_STATUS.EDIT_SUCCESS) {
      reset();
    }
    if (userState.status === USER_STATUS.DELETE_SUCCESS) {
      navigate('/');
      dispatch(clearUserStatus('clear'));
    }
  }, [userState.status, userState.status]);

  return (
    <div className="registration-block">
      <p className="info-block-preview">Edit profile</p>
      <p className="info-block-status">Status:{userState.status}</p>
      <form onSubmit={onSubmit}>
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
          {errors.userName && (
            <span className="userName-error">
              {errors.userName.message ||
                'Введите Ваш Никнэйм. Минимум 3 символов. Допустимы латинские смволы и цифры'}
            </span>
          )}
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
          {errors.userLogin && (
            <span className="userName-error">
              {errors.userLogin.message ||
                'Введите свой Login. Минимум 3 символа. Допустимы латинские смволы и цифры'}
            </span>
          )}
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
            <span className="userName-error">
              {errors.userPassword.message ||
                'Введите пароль. Минимум 5 символов. Допустимы латинские смволы и цифры'}
            </span>
          )}
        </label>
        <input type="submit" disabled={submitBtnDisabled} value={'Send'} />
      </form>
      <button
        type="button"
        className=""
        onClick={() => {
          const user = {
            ID: userState.id,
            token: userState.token,
          } as IDeleteUser;
          dispatch(deleteUserProfile(user));
        }}
      >
        X
      </button>
      <button
        type="button"
        className="close-btn"
        onClick={() => {
          closeEditWindow();
        }}
      >
        X
      </button>
    </div>
  );
};

export default RegisterForm;
