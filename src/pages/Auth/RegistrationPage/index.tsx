import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import Input from 'components/Form/Input';
import Container from './Container';
import { logIn } from '../state/reducer';

const schema = yup.object().shape({
  email: yup.string().required('Email обязательное поле').email('Неправильный email'),
  password: yup
    .string()
    .required('Пароль обязательное поле')
    .min(8, 'Пароль должен быть минимум 8 символов')
    .matches(/[a-zA-Z]/, 'Пароль может содержать только буквы латинского алфавита'),
});

type FormValues = {
  email: string;
  password: string;
};

const Registration = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleGoBack = () => history.goBack();

  const { register, handleSubmit, formState, errors } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    dispatch(logIn());
    history.push('/home');
  };

  return (
    <Container>
      <div className="top">
        <button className="back-btn" type="button" onClick={handleGoBack} />
        <h3 className="title">Регистрация</h3>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          label="E-mail"
          type="email"
          name="email"
          error={errors?.email?.message}
        />
        <Input
          ref={register}
          label="Пароль"
          type="password"
          name="password"
          error={errors?.password?.message}
        />
        <button className="submit-btn" type="submit" disabled={!formState.isDirty}>
          Зарегистрироваться
        </button>
        <Link to="/">
          <button className="link-btn" type="button">
            Войти
          </button>
        </Link>
      </form>
    </Container>
  );
};

export default Registration;
