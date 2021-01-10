import React, { forwardRef } from 'react';
import styled from 'styled-components';

const StyledInput = styled.label<{ error: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  input {
    border: 2px solid;
    border-color: ${({ error }) => (error ? '#E3170A' : '#e1e1ed')};
    border-radius: 6px;
    padding: 12px;
    height: 40px;
    margin-top: 8px;
    font-size: 16px;
    line-height: 16px;
    color: ${({ error }) => (error ? '#E3170A' : '#1f1f33')};

    &::placeholder {
      font-size: 16px;
      line-height: 16px;
      color: #8181b1;
      opacity: 0.5;
    }
  }

  .error {
    padding-top: 4px;
    font-size: 14px;
    line-height: 20px;
    color: #e3170a;
  }
`;

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
  ({ label = '', type = 'text', name, error, ...rest }, ref) => (
    <StyledInput error={!!error}>
      {label}
      <input ref={ref} type={type} name={name} {...rest} />
      {error && <p className="error">{error}</p>}
    </StyledInput>
  ),
);

export default Input;
