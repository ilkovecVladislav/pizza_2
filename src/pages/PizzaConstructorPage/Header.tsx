import React, { ReactElement } from 'react';
import styled from 'styled-components';

import userIcon from 'assets/icons/user.svg';
import logo from 'assets/images/logo.png';

const Container = styled.div`
  height: 56px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 4px rgba(46, 49, 55, 0.05), 0px 0px 2px rgba(46, 49, 55, 0.15);
  margin-bottom: 16px;
`;

const Header = (): ReactElement => (
  <Container>
    <img src={logo} alt="логотип" />
    <img src={userIcon} alt="аватар" />
  </Container>
);

export default Header;
