import React, { ReactElement } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

import OrdersList from './OrdersList';

import Button from 'components/Button';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-width: 400px;
  margin: 0 auto;
  padding: 0 16px;
`;

const OrdersListPage = (): ReactElement => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleAuthenticate = () => loginWithRedirect({ redirectUri: window.location.href });

  if (isAuthenticated) {
    return <OrdersList />;
  }

  return (
    <Wrapper>
      <Button text="Авторизоваться" onClick={handleAuthenticate} />
    </Wrapper>
  );
};

export default OrdersListPage;
