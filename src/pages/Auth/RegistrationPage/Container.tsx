import styled from 'styled-components';

import arrowIcon from 'assets/icons/left-arrow.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  padding-top: 0;

  .top {
    display: flex;
    height: 56px;
    align-items: center;
  }

  .back-btn {
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

  .title {
    margin-left: 5px;
    font-weight: 800;
    font-size: 20px;
    line-height: 28px;
    color: #1f1f33;
  }

  .form {
    padding: 16px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0px 8px 16px rgba(75, 75, 124, 0.05);
    border-radius: 16px;
  }

  .submit-btn {
    border: unset;
    background: #00a896;
    border-radius: 16px;
    font-weight: 800;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;
    height: 40px;
    margin-bottom: 16px;
    cursor: pointer;
    &:disabled {
      background: #f9f9fb;
      color: #8181b1;
      cursor: not-allowed;
    }
  }

  .link-btn {
    border: unset;
    background: #f9f9fb;
    border-radius: 16px;
    font-weight: 800;
    font-size: 16px;
    line-height: 16px;
    color: #000;
    height: 40px;
    width: 100%;
    cursor: pointer;
  }
`;

export default Container;
