import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.gray[100]};
  height: 100%;
`;

export const Container = styled.div`
  padding: 0 16px 16px;

  & > div {
    margin-bottom: 8px;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`;
