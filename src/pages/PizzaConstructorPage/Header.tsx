import React from 'react';
import styled from 'styled-components';

import userIcon from 'assets/icons/user.svg';
import logo from 'assets/images/logo.png';

const Container = styled.div`
  height: 56px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: none;
`;

const Header = (): JSX.Element => (
  <Container>
    <img src={logo} alt="логотип" />
    <img src={userIcon} alt="аватар" />
  </Container>
);

export default Header;
