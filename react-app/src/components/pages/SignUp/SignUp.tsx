import React, { useState, useEffect } from 'react';
import './SignUp.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormData = {
  userName: string;
  password: string;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<FormData>({ mode: 'onChange', reValidateMode: 'onChange' });
  const onSubmit = handleSubmit((data) => {
    if (data) {
      console.log(data);
      reset();
      {
        navigate('/main');
      }
    }
  });
  const closeSignUpWindow = () => {
    navigate('/');
  };
  useEffect(() => {
    console.log('isValid', isValid);
    if (isDirty && isValid) setSubmitBtnDisabled(false);
  }, [isDirty, isValid]);
  return (
    <section className="login">
      <div className="login-wrapper">
        <form className="login-form" onSubmit={onSubmit}>
          <div className="userName-wrapper">
            <input
              className="userName"
              type="text"
              {...register('userName', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 3,
                  message: 'Минимум 3 символов',
                },
                pattern: /[\d\wА-я]{3,}/,
              })}
              placeholder="Your login"
            />
            {errors.userName && (
              <span className={'userName-error'} data-testid="userName-error">
                {errors.userName.message ||
                  'Введите свой Login. Минимум 3 символа. Допустимы латинские смволы и цифры'}
              </span>
            )}
          </div>
          <div className="password-wrapper">
            <input
              className="password"
              type="text"
              {...register('password', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 5,
                  message: 'Минимум 7 символов',
                },
                pattern: /[\d\wА-я]{7,}/,
              })}
              placeholder="Password"
            />
            {errors.password && (
              <span className={'password-error'} data-testid="password-error">
                {errors.password.message ||
                  'Введите пароль. Минимум 5 символов. Допустимы латинские смволы и цифры'}
              </span>
            )}
          </div>
          <button
            type="submit"
            data-testid="submit-btn"
            className="submit-btn"
            disabled={submitBtnDisabled}
          >
            Submit
          </button>
        </form>
        <button
          type="button"
          className="close-btn"
          onClick={() => {
            closeSignUpWindow();
          }}
        >
          X
        </button>
      </div>
    </section>
  );
};
export default SignUp;
