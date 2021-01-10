import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import closeIcon from 'assets/icons/close.svg';
import SuccessVariant from './SuccessVariant';
import FailedVariant from './FailedVariant';

const Header = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 8px;

  h2 {
    font-weight: 800;
    font-size: 20px;
    line-height: 28px;
    color: #1f1f33;
  }

  .close-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    position: relative;
    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      width: 14px;
      height: 14px;
      background: url(${closeIcon});
      background-position: center;
      background-repeat: no-repeat;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderConfirm = (): JSX.Element => {
  const { status = 'success' }: { status: string } = useParams();

  return (
    <div>
      <Header>
        <h2>Оформление заказа</h2>
        <Link to="/orders-history">
          <button className="close-btn" type="button" />
        </Link>
      </Header>

      <Content>{status === 'success' ? <SuccessVariant /> : <FailedVariant />}</Content>
    </div>
  );
};

export default OrderConfirm;
