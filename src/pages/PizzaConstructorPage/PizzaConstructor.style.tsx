import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  height: 100%;
  overflow-x: hidden;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
`;

export const Content = styled.div`
  padding: 0 16px 54px;
`;

export const PizzaName = styled.h4`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.primary.text};
  margin-bottom: 4px;
`;

export const PizzaParamsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const SauceWrapper = styled.div`
  margin-bottom: 24px;
`;

export const Row = styled.div`
  padding-bottom: 10px;
`;

export const IngredientsLabel = styled.span`
  display: block;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.gray[600]};
`;

export const IngredientsItemsContainer = styled.div`
  display: flex;
  overflow-y: auto;
  padding-bottom: 14px;

  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray[200]};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[400]};
  }

  & > div {
    margin-right: 8px;
  }
  & > div:last-child {
    margin-right: 0;
  }
`;

export const SubmitContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  box-shadow: 0px -16px 32px rgba(75, 75, 124, 0.05), 0px 0px 4px rgba(75, 75, 124, 0.1);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SubmitButton = styled.button`
  padding: 12px 16px;
  height: 40px;
  width: 328px;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 16px;
  border: none;
  font-weight: 800;
  font-size: 16px;
  line-height: 16px;
  color: #ffffff;
  cursor: pointer;
`;
