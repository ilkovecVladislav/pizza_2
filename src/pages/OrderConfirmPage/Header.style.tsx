import styled from 'styled-components';

import closeIcon from 'assets/icons/close.svg';

export const Container = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 8px;
`;

export const Title = styled.h2`
  font-weight: 800;
  font-size: 20px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.primary.text};
`;

export const CloseButton = styled.button`
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
`;
