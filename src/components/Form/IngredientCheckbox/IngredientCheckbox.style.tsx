import styled from 'styled-components';

import checkedIcon from 'assets/icons/checked.svg';

export const Container = styled.div<{ isSelected: boolean }>`
  margin-top: 10px;
  padding: 0 12px 8px;
  width: 104px;
  height: 130px;
  background: #ffffff;
  box-shadow: 0px 8px 16px rgba(75, 75, 124, 0.05);
  border-radius: 12px;
  flex: none;
  border: 2px solid
    ${({ isSelected, theme }) => (isSelected ? theme.colors.primary.main : 'transparent')};
  cursor: pointer;
`;

export const Thumb = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 64px;
  max-height: 64px;
  position: relative;
  top: -8px;
`;

export const Title = styled.span<{ isSelected: boolean }>`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.primary.text};
  margin-bottom: 8px;
  display: block;
  font-weight: ${({ isSelected }) => (isSelected ? 500 : 400)};
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Price = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.primary.text};
`;

export const Checkbox = styled.label`
  display: block;
  cursor: pointer;

  input {
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    position: absolute;

    &:checked + .checkbox {
      background: ${({ theme }) => theme.colors.primary.main};

      &::before {
        content: '';
        position: absolute;
        background: url(${checkedIcon});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        width: 12px;
        height: 12px;
        top: 0;
        left: 0;
      }
    }
  }

  .checkbox {
    display: block;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 4px;
    background: #ffffff;
    width: 16px;
    height: 16px;
    position: relative;
  }
`;
