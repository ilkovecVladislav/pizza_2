import styled from 'styled-components';

export const Container = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 24px;
`;

export const IngredientsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const IngredientsListItem = styled.span`
  position: relative;
  margin-right: 10px;
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
