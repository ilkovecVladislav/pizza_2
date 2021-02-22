import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.gray[100]};
  height: 100%;

  button + a {
    margin-top: 12px;
  }
`;

export default Container;
