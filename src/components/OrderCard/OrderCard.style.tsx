import styled from 'styled-components';

import deliveryIcon from 'assets/icons/delivery.svg';

export const Container = styled.div`
  padding: 12px 16px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 8px 16px rgba(75, 75, 124, 0.05);
  border-radius: 16px;
`;

export const Top = styled.div`
  display: flex;
  margin-bottom: 8px;
  justify-content: space-between;
`;

export const OrderNumber = styled.span`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-right: 16px;
`;

export const OrderDateBox = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray[400]};
`;

export const OrderDate = styled.span`
  margin-right: 10px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    top: 6px;
    right: -6px;
    background: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const PizzaName = styled.h5`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.primary.text};
  margin-bottom: 8px;
`;

export const IngredientsList = styled.div`
  margin-bottom: 13px;
  padding-bottom: 8px;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.gray[200]};
`;

export const IngredientsListItem = styled.span`
  position: relative;
  margin-right: 10px;
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray[600]};

  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    top: 8px;
    right: -6px;
    background: ${({ theme }) => theme.colors.gray[600]};
  }

  &:last-child {
    margin-right: 0;
  }

  &:last-child::after {
    background: none;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FooterBox = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray[600]};
  display: flex;
`;

export const PizzaPrice = styled.span`
  position: relative;
  margin-right: 10px;
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray[600]};

  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    top: 8px;
    right: -6px;
    background: ${({ theme }) => theme.colors.gray[600]};
  }
`;

export const InProcessStatus = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.secondary.main};
  position: relative;
  padding-left: 20px;

  &:before {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 16px;
    height: 13px;
    background: url(${deliveryIcon});
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export const RepeatButton = styled.button`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.primary.dark};
  border: none;
  background: transparent;
  cursor: pointer;
`;
