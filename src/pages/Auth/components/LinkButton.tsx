import styled from 'styled-components';

const LinkButton = styled.button`
  border: unset;
  background: ${({ theme }) => theme.colors.gray[100]};
  border-radius: 16px;
  font-weight: 800;
  font-size: 16px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.primary.text};
  height: 40px;
  width: 100%;
  cursor: pointer;
`;

export default LinkButton;
