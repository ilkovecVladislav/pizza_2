import React, { ComponentPropsWithoutRef, ReactElement } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: unset;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 16px;
  font-weight: 800;
  font-size: 16px;
  line-height: 16px;
  padding: 0 15px;
  color: #ffffff;
  height: 40px;
  width: 100%;
  cursor: pointer;

  &:disabled {
    background: ${({ theme }) => theme.colors.gray[200]};
    color: ${({ theme }) => theme.colors.gray[400]};
    cursor: not-allowed;
  }
`;

type Props = {
  text: string;
} & ComponentPropsWithoutRef<'button'>;

const Button = ({ text, type = 'button', ...rest }: Props): ReactElement => (
  <StyledButton type={type} {...rest}>
    {text}
  </StyledButton>
);

export default Button;
