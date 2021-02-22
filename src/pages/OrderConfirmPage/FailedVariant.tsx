import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Button from 'components/Button';
import errorIcon from 'assets/icons/error.svg';
import { Label, Description } from './OrderConfirm.style';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    width: 100%;
  }
`;

const Error = styled.div`
  width: 51px;
  height: 51px;
  background: ${({ theme }) => theme.colors.primary.errorText};
  border-radius: 99px;
  position: relative;
  margin-bottom: 24px;

  &:after {
    content: '';
    position: absolute;
    width: 32px;
    height: 31px;
    background: url(${errorIcon});
    background-position: center;
    background-repeat: no-repeat;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const FailedVariant = (): ReactElement => (
  <Container>
    <Error />
    <Label>Оплата не прошла</Label>
    <Description>Попробуйте еще раз или используйте другую карту</Description>

    <Link to="/order-checkout">
      <Button text="Попробовать еще раз" />
    </Link>
  </Container>
);

export default FailedVariant;
