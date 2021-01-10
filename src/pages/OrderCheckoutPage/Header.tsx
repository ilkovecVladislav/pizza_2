import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import arrowIcon from 'assets/icons/left-arrow.svg';

const Container = styled.div`
  height: 56px;
  padding: 8px 16px;
  display: flex;
  align-items: center;

  .title {
    font-weight: 800;
    font-size: 20px;
    line-height: 28px;
    color: #1f1f33;
    margin-left: 5px;
  }

  button {
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    position: relative;
    cursor: pointer;
    margin-right: 4px;

    &:before {
      content: '';
      position: absolute;
      width: 15px;
      height: 10px;
      background: url(${arrowIcon});
      background-position: center;
      background-repeat: no-repeat;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const Header = (): JSX.Element => (
  <Container>
    <Link to="/home">
      <button type="button" />
    </Link>
    <h3 className="title">Оформление заказа</h3>
  </Container>
);

export default Header;
