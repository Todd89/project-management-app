import ModalDeleteConfirmation from '../../../boards/ModalDeleteConfirmation/ModalDeleteConfirmation';
import './editProfileForm.css';
import { useForm } from 'react-hook-form';
import {
  deleteUserProfile,
  editUserProfile,
  clearUserStatus,
  setUserStatus,
} from '../../../../react/features/loginSlice';
import { useSelector } from 'react-redux';
import { INewUser, IState, IDeleteUser } from '../../../../interface/types';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { USER_STATUS } from '../../../../constant/constant';
import React from 'react';
import SubmitButton from '../../reusableComponents/submitButton/SubmitButton';
import CloseWindowButton from '../../reusableComponents/closeWindowButton/CloseWindowButton';

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
  const [isModalUser, setIsModalUser] = useState(false);
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

  useEffect(() => {
    if (isDirty && isValid) {
      setSubmitInputDisabled(false);
    }
  }, [isDirty, isValid]);

  useEffect(() => {
    console.log(userState);
    if (userState.status === USER_STATUS.DELETE_SUCCESS) {
      reset();
      localStorage.removeItem('token');
      dispatch(clearUserStatus('clear'));
      navigate('/');
    }
  }, [userState.status]);

  useEffect(() => {
    if (userState.status === USER_STATUS.EDIT_SUCCESS) {
      reset();
      localStorage.removeItem('token');
      dispatch(clearUserStatus('clear'));
      dispatch(setUserStatus(USER_STATUS.UNAUTHORIZED));
      navigate('/login');
    }
  }, [userState.status]);

  const closeWindow = (event: boolean) => {
    if (event) navigate('/main');
  };

  function handleConfirmation(event: React.MouseEvent) {
    event.stopPropagation();
    setIsModalUser(true);
  }

  function cancelModalState() {
    setIsModalUser(false);
  }

  function deleteUser(answer: boolean) {
    if (answer) {
      const user = {
        ID: userState.id,
        token: userState.token,
      } as IDeleteUser;
      dispatch(deleteUserProfile(user));
    }
  }

  return (
    // <div className="registration-block">
    //   <p className="info-block-preview">Edit profile</p>
    //   <p className="info-block-status">Status:{userState.status}</p>
    //   <form onSubmit={onSubmit}>
    //     <label htmlFor="userName">
    //       Name:
    //       <input
    //         {...register('userName', {
    //           required: 'Поле обязательно к заполнению',
    //           minLength: {
    //             value: 3,
    //             message: 'Минимум 3 символа',
    //           },
    //           pattern: /[\d\wА-я]{3,}/,
    //         })}
    //         placeholder="Name"
    //         type="text"
    //         name="userName"
    //         id="userName"
    //       />
    //       {errors.userName && (
    //         <span className="userName-error">
    //           {errors.userName.message ||
    //             'Введите Ваш Никнэйм. Минимум 3 символов. Допустимы латинские смволы и цифры'}
    //         </span>
    //       )}
    //     </label>
    //     <label htmlFor="userLogin">
    //       Login:
    //       <input
    //         {...register('userLogin', {
    //           required: 'Поле обязательно к заполнению',
    //           minLength: {
    //             value: 3,
    //             message: 'Минимум 3 симовла',
    //           },
    //           pattern: /[\d\wА-я]{3,}/,
    //         })}
    //         placeholder="login"
    //         type="text"
    //         name="userLogin"
    //         id="userLogin"
    //       />
    //       {errors.userLogin && (
    //         <span className="userName-error">
    //           {errors.userLogin.message ||
    //             'Введите свой Login. Минимум 3 символа. Допустимы латинские смволы и цифры'}
    //         </span>
    //       )}
    //     </label>
    //     <label htmlFor="userPassword">
    //       Password:
    //       <input
    //         {...register('userPassword', {
    //           required: 'Поле обязательно к заполнению',
    //           minLength: {
    //             value: 7,
    //             message: 'Минимум 7 символов',
    //           },
    //           pattern: /[\d\wА-я]{7,}/,
    //         })}
    //         placeholder="password"
    //         type="password"
    //         name="userPassword"
    //         id="userPassword"
    //         autoComplete="off"
    //       />
    //       {errors.userPassword && (
    //         <span className="userName-error">
    //           {errors.userPassword.message ||
    //             'Введите пароль. Минимум 5 символов. Допустимы латинские смволы и цифры'}
    //         </span>
    //       )}
    //     </label>
    //     <input type="submit" disabled={submitBtnDisabled} value={'Send'} />
    //   </form>
    //   <button
    //     type="button"
    //     className=""
    //     onClick={() => {
    //       const user = {
    //         ID: userState.id,
    //         token: userState.token,
    //       } as IDeleteUser;
    //       dispatch(deleteUserProfile(user));
    //     }}
    //   >
    //     DELETE
    //   </button>
    //   <button
    //     type="button"
    //     className="close-btn"
    //     onClick={() => {
    //       closeEditWindow();
    //     }}
    //   >
    //     X
    //   </button>
    // </div>

    <div className="registration-block">
      <div className="registration-block_blur">
        <div className="form-wrapper redaction-wrapper">
          <p className="info-block-preview">Редактирование</p>
          <p className="info-block-status">Ваш статус:{userState.status}</p>
          <form className="registration-form" onSubmit={onSubmit}>
            <label className="registration-form_userName" htmlFor="userName">
              <input
                {...register('userName', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 3,
                    message: 'Минимум 3 символа',
                  },
                  pattern: /[\d\w\DА-я]{3,}/,
                })}
                placeholder="Insert your Name"
                type="text"
                className="userName"
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
            <label className="registration-form_userLogin" htmlFor="userLogin">
              <input
                {...register('userLogin', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 3,
                    message: 'Минимум 3 симовла',
                  },
                  pattern: /[\d\w\DА-я]{3,}/,
                })}
                placeholder="Insert your Login"
                type="text"
                className="userLogin"
                name="userLogin"
                id="userLogin"
              />
              {errors.userLogin && (
                <span className="userName-error">
                  {errors.userLogin.message ||
                    'Введите свой Login. Минимум 3 символа. Допустимы латинские буквы и цифры'}
                </span>
              )}
            </label>
            <label className="registration-form_userPassword" htmlFor="userPassword">
              <input
                {...register('userPassword', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 7,
                    message: 'Минимум 7 символов',
                  },
                  pattern: /[\d\wА-я]{7,}/,
                })}
                placeholder="Insert your Password"
                type="password"
                className="userPassword"
                name="userPassword"
                id="userPassword"
                autoComplete="off"
              />
              {errors.userPassword && (
                <span className="userName-error">
                  {errors.userPassword.message ||
                    'Введите пароль. Минимум 7 символов. Допустимы латинские смволы и цифры'}
                </span>
              )}
            </label>
            <SubmitButton submitBtnDisabled={submitBtnDisabled} />
            <button onClick={handleConfirmation} type="button" className="delete-user-button">
              DELETE USER
            </button>
            {isModalUser && (
              <ModalDeleteConfirmation
                confirmationText={'user'}
                handleConfirmation={deleteUser}
                cancelModalState={cancelModalState}
              />
            )}
          </form>
          <CloseWindowButton closeWindow={closeWindow} />
        </div>
      </div>
    </div>
  );
};

// const user = {
//   ID: userState.id,
//   token: userState.token,
// } as IDeleteUser;
// dispatch(deleteUserProfile(user));

export default RegisterForm;
