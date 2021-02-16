import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import theme from 'theme';
import Input from '.';

describe('Input component', () => {
  it('renders correctly', () => {
    const LABEL = 'Email';
    const INPUT_NAME = 'email';
    const INPUT_TYPE = 'email';
    const PLACEHOLDER = 'Enter your email';
    const register = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Input
          ref={register}
          name={INPUT_NAME}
          type={INPUT_TYPE}
          label={LABEL}
          placeholder={PLACEHOLDER}
        />
      </ThemeProvider>,
    );

    expect(screen.getByLabelText(LABEL)).toBeInTheDocument();
    expect(screen.getByLabelText(LABEL)).toHaveAttribute('name', INPUT_NAME);
    expect(screen.getByLabelText(LABEL)).toHaveAttribute('placeholder', PLACEHOLDER);
    expect(screen.getByLabelText(LABEL)).toHaveAttribute('type', INPUT_TYPE);
    expect(screen.getByRole('textbox')).toHaveStyleRule('border-color', theme.colors.gray[200]);
  });
  it('renders default input', () => {
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Input name="email" />
      </ThemeProvider>,
    );
    expect(getByRole('textbox')).toHaveAttribute('type', 'text');
  });
  it('renders input with error', () => {
    const ERROR = 'wrong email';
    const register = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Input ref={register} name="email" type="email" label="Email" error={ERROR} />
      </ThemeProvider>,
    );

    expect(screen.getByText(ERROR)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveStyleRule(
      'border-color',
      theme.colors.primary.errorText,
    );
  });
  describe('controlled input', () => {
    it('renders correctly', () => {
      const VALUE = 'test@mail.ru';
      render(
        <ThemeProvider theme={theme}>
          <Input name="email" type="email" label="Email" value={VALUE} onChange={() => undefined} />
        </ThemeProvider>,
      );

      expect(screen.getByRole('textbox')).toHaveAttribute('value', VALUE);
    });
    it('handle onChange', () => {
      const LABEL = 'Email';
      const onChange = jest.fn();
      render(
        <ThemeProvider theme={theme}>
          <Input name="email" type="email" label={LABEL} value="test@mail.ru" onChange={onChange} />
        </ThemeProvider>,
      );
      const input = screen.getByLabelText(LABEL);

      userEvent.type(input, '23');

      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });
});
