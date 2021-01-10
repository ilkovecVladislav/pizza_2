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
  password: yup.string().required('Пароль обязательное поле'),
});

type FormValues = {
  email: string;
  password: string;
};

const LogIn = (): JSX.Element => {
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
        <h3 className="title">Авторизация</h3>
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
          Войти
        </button>

        <Link to="/registration">
          <button className="link-btn" type="button">
            Зарегистрироваться
          </button>
        </Link>
      </form>
      <button onClick={methodDoesNotExist}>Break the world</button>;
    </Container>
  );
};

export default LogIn;
