import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

import Content from './Content';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Button = styled.button`
  display: block;
  border: unset;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 16px;
  font-weight: 800;
  font-size: 16px;
  line-height: 16px;
  padding: 0 15px;
  color: #ffffff;
  height: 40px;
  margin-bottom: 16px;
  cursor: pointer;
`;

const OrdersList = (): JSX.Element => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Content />;
  }

  return (
    <Wrapper>
      <Button onClick={() => loginWithRedirect({ redirectUri: window.location.href })}>
        Авторизоваться
      </Button>
    </Wrapper>
  );
};

export default OrdersList;
