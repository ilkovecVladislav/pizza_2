import React, { forwardRef, ReactElement } from 'react';

import { Container, StyledInput, Error } from './Input.style';

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
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label = '', type = 'text', name, error, ...rest }, ref): ReactElement => (
    <Container>
      {label}
      <StyledInput ref={ref} type={type} name={name} error={!!error} {...rest} />
      {error && <Error>{error}</Error>}
    </Container>
  ),
);

export default Input;
