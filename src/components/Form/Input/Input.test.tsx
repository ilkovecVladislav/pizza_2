import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, fireEvent } from '@testing-library/react';

import theme from 'theme';
import Input from '.';

describe('Input component', () => {
  it('renders correctly', () => {
    const LABEL = 'Email';
    const INPUT_NAME = 'email';
    const INPUT_TYPE = 'email';
    const PLACEHOLDER = 'Enter your email';
    const register = jest.fn();
    const { getByRole, getByLabelText } = render(
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

    expect(getByLabelText(LABEL)).toBeInTheDocument();
    expect(getByLabelText(LABEL)).toHaveAttribute('name', INPUT_NAME);
    expect(getByLabelText(LABEL)).toHaveAttribute('placeholder', PLACEHOLDER);
    expect(getByLabelText(LABEL)).toHaveAttribute('type', INPUT_TYPE);
    expect(getByRole('textbox')).toHaveStyleRule('border-color', theme.colors.gray[200]);
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
    const { getByRole, getByText } = render(
      <ThemeProvider theme={theme}>
        <Input ref={register} name="email" type="email" label="Email" error={ERROR} />
      </ThemeProvider>,
    );

    expect(getByText(ERROR)).toBeInTheDocument();
    expect(getByRole('textbox')).toHaveStyleRule('border-color', theme.colors.primary.errorText);
  });
  describe('controlled input', () => {
    it('renders correctly', () => {
      const VALUE = 'test@mail.ru';
      const { getByRole } = render(
        <ThemeProvider theme={theme}>
          <Input name="email" type="email" label="Email" value={VALUE} onChange={() => undefined} />
        </ThemeProvider>,
      );

      expect(getByRole('textbox')).toHaveAttribute('value', VALUE);
    });
    it('handle onChange', () => {
      const LABEL = 'Email';
      const onChange = jest.fn();
      const { getByLabelText } = render(
        <ThemeProvider theme={theme}>
          <Input name="email" type="email" label={LABEL} value="test@mail.ru" onChange={onChange} />
        </ThemeProvider>,
      );
      const input = getByLabelText(LABEL);

      fireEvent.change(input, { target: { value: '23' } });

      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
