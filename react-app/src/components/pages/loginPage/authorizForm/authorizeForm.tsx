import '../registerForm/registerForm.css';
import { useForm } from 'react-hook-form';
import { getUserToken, setAuthorizedUserData } from '../../../../react/features/loginSlice';
import { useSelector } from 'react-redux';
import { INewUser, IState, ILoginState } from '../../../../interface/types';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import httpClient from '../../../../API/api';
import { useNavigate } from 'react-router';
import CloseWindowButton from '../../reusableComponents/closeWindowButton/CloseWindowButton';
import SubmitButton from '../../reusableComponents/submitButton/SubmitButton';

type FormData = {
  userLoginIn: string;
  userPasswordIn: string;
};

const AurhorizeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isValid, isDirty },
  } = useForm<FormData>({ mode: 'onChange', reValidateMode: 'onChange' });
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState('');
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
  const userState = useSelector((state: IState) => state.loginData);
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    const userData = {
      login: data.userLoginIn,
      password: data.userPasswordIn,
    } as INewUser;
    setUserLogin(data.userLoginIn);
    dispatch(getUserToken(userData));
  });

  useEffect(() => {
    const findUser = async () => {
      const ALL_USERS = await httpClient.getAllUsers(userState.token);
      const USER = ALL_USERS.filter((el: ILoginState) => {
        return el.login === userLogin;
      });
      dispatch(setAuthorizedUserData(USER[0]));
    };
    if (userState.token) {
      findUser();
      navigate('/main');
      localStorage.setItem('token', userState.token);
    }
  }, [userState.token]);

  const closeWindow = (event: boolean) => {
    if (event) navigate('/');
  };

  useEffect(() => {
    if (isDirty && isValid) setSubmitBtnDisabled(false);
  }, [isDirty, isValid]);

  return (
    <div className="registration-block">
      <div className="registration-block_blur">
        <div className="form-wrapper">
          <p className="info-block-preview">Авторизация</p>
          <p className="info-block-status">Ваш статус:{userState.status}</p>
          <form className="registration-form" onSubmit={onSubmit}>
            <label className="registration-form_userLogin" htmlFor="userLoginIn">
              <input
                {...register('userLoginIn', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 3,
                    message: 'Минимум 3 символа',
                  },
                  pattern: /[\d\w\DА-я]{3,}/,
                })}
                placeholder="login"
                type="text"
                className="userLogin"
                name="userLoginIn"
                id="userLoginIn"
              />
              {errors.userLoginIn && (
                <span className={'userName-error'} data-testid="userName-error">
                  {errors.userLoginIn.message ||
                    'Введите свой Login. Минимум 3 символа. Допустимы латинские смволы и цифры'}
                </span>
              )}
            </label>
            <label className="registration-form_userPassword" htmlFor="userPasswordIn">
              <input
                {...register('userPasswordIn', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 7,
                    message: 'Минимум 7 символов',
                  },
                  pattern: /[\d\wА-я]{7,}/,
                })}
                placeholder="passsowrd"
                type="password"
                className="userPassword"
                name="userPasswordIn"
                id="userPasswordIn"
                autoComplete="off"
              />
              {errors.userPasswordIn && (
                <span className={'userName-error'} data-testid="userName-error">
                  {errors.userPasswordIn.message ||
                    'Введите пароль. Минимум 5 символов. Допустимы латинские смволы и цифры'}
                </span>
              )}
            </label>
            <SubmitButton submitBtnDisabled={submitBtnDisabled} />
          </form>
          <CloseWindowButton closeWindow={closeWindow} />
        </div>
      </div>
    </div>
  );
};

export default AurhorizeForm;
