import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Registration from '.';

describe('LogIn', () => {
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
        fireEvent.click(getByText(/Войти/i));
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
        fireEvent.click(getByText(/Войти/i));
      });

      expect(getByText('Неправильный email')).toBeInTheDocument();
    });
    it('validates that password is filled in', async () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <Registration />
        </Router>,
      );

      await act(async () => {
        fireEvent.click(getByText(/Войти/i));
      });

      expect(getByText('Пароль обязательное поле')).toBeInTheDocument();
    });
  });
});
