import React, { forwardRef, ReactElement } from 'react';

import { StyledInput, Error } from './Input.style';

type Props = {
  label?: string;
  type?: string;
  name: string;
  error?: string;
  placeholder?: string;
  inputMode?:
    | 'text'
    | 'none'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined;
  autoComplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label = '', type = 'text', name, error, ...rest }, ref): ReactElement => (
    <StyledInput error={!!error}>
      {label}
      <input ref={ref} type={type} name={name} {...rest} />
      {error && <Error>{error}</Error>}
    </StyledInput>
  ),
);

export default Input;
