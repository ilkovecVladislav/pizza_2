import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import errorIcon from 'assets/icons/error.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: ${({ theme }) => theme.colors.primary.text};
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.gray[600]};
    margin-bottom: 32px;
    text-align: center;
  }
  a {
    width: 100%;
  }

  button {
    width: 100%;
    border: none;
    background: ${({ theme }) => theme.colors.primary.main};
    border-radius: 16px;
    height: 40px;
    padding: 12px 16px;
    font-weight: 800;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;
  }
`;

const Error = styled.div`
  width: 67px;
  height: 67px;
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

const FailedVariant = (): JSX.Element => (
  <Container>
    <Error />
    <h3>Оплата не прошла</h3>
    <p>Попробуйте еще раз или используйте другую карту</p>

    <Link to="/order-checkout">
      <button type="button">Попробовать еще раз</button>
    </Link>
  </Container>
);

export default FailedVariant;
