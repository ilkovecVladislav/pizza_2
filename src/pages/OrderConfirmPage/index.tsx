import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header';
import SuccessVariant from './SuccessVariant';
import FailedVariant from './FailedVariant';
import { Container } from './OrderConfirm.style';

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderConfirm = (): ReactElement => {
  const { status = 'success' }: { status: string } = useParams();

  return (
    <Container>
      <Header />
      <Content>{status === 'success' ? <SuccessVariant /> : <FailedVariant />}</Content>
    </Container>
  );
};

export default OrderConfirm;
