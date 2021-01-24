import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header';
import SuccessVariant from './SuccessVariant';
import FailedVariant from './FailedVariant';

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
      <Header />
      <Content>{status === 'success' ? <SuccessVariant /> : <FailedVariant />}</Content>
    </div>
  );
};

export default OrderConfirm;
