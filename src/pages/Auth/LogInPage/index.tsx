import React, { ReactElement } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import Header from 'components/Header';
import Button from 'components/Button';
import Input from 'components/Form/Input';
import Container from '../components/Container';
import Form from '../components/Form';
import LinkButton from '../components/LinkButton';
import { logIn } from '../state/reducer';

const schema = yup.object().shape({
  email: yup.string().email('Неправильный email').required('Email обязательное поле'),
  password: yup
    .string()
    .required('Пароль обязательное поле')
    .min(8, 'Пароль должен быть минимум 8 символов'),
});

type FormValues = {
  email: string;
  password: string;
};

const LogIn = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState, errors } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    dispatch(logIn());
    history.push('/home');
  };

  return (
    <Container>
      <Header title="Авторизация" link="/registration" />

      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Button text="Войти" type="submit" disabled={!formState.isDirty} />

        <Link to="/registration">
          <LinkButton type="button">Зарегистрироваться</LinkButton>
        </Link>
      </Form>
    </Container>
  );
};

export default LogIn;
