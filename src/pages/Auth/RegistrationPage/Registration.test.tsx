import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Registration from '.';

describe('Registration', () => {
  it('renders correctly', () => {
    const history = createMemoryHistory();
    const { getByText, getByLabelText } = render(
      <Router history={history}>
        <Registration />
      </Router>,
    );

    expect(getByText('E-mail')).toBeInTheDocument();
    expect(getByLabelText('Пароль')).toBeInTheDocument();
  });

  describe('on submit', () => {
    it('validates that email is filled in', async () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <Registration />
        </Router>,
      );

      await act(async () => {
        fireEvent.click(getByText(/Зарегистрироваться/i));
      });

      expect(getByText('Email обязательное поле')).toBeInTheDocument();
    });
    it('validates that email is valid ', async () => {
      const history = createMemoryHistory();
      const { getByText, getByLabelText } = render(
        <Router history={history}>
          <Registration />
        </Router>,
      );

      fireEvent.input(getByLabelText('E-mail'), {
        target: {
          value: '222@222',
        },
      });

      await act(async () => {
        fireEvent.click(getByText(/Зарегистрироваться/i));
      });

      expect(getByText('Неправильный email')).toBeInTheDocument();
    });
    it('validates that password is  filled in', async () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <Registration />
        </Router>,
      );

      await act(async () => {
        fireEvent.click(getByText(/Зарегистрироваться/i));
      });

      expect(getByText('Пароль обязательное поле')).toBeInTheDocument();
    });
    it('validates that password has correct length', async () => {
      const history = createMemoryHistory();
      const { getByText, getByLabelText } = render(
        <Router history={history}>
          <Registration />
        </Router>,
      );

      fireEvent.input(getByLabelText('Пароль'), {
        target: {
          value: '123',
        },
      });

      await act(async () => {
        fireEvent.click(getByText(/Зарегистрироваться/i));
      });

      expect(getByText('Пароль должен быть минимум 8 символов')).toBeInTheDocument();
    });
    it('validates that password contains latin letters', async () => {
      const history = createMemoryHistory();
      const { getByText, getByLabelText } = render(
        <Router history={history}>
          <Registration />
        </Router>,
      );

      fireEvent.input(getByLabelText('Пароль'), {
        target: {
          value: '123123123',
        },
      });

      await act(async () => {
        fireEvent.click(getByText(/Зарегистрироваться/i));
      });

      expect(
        getByText('Пароль может содержать только буквы латинского алфавита'),
      ).toBeInTheDocument();
    });
  });
});
