import React, { forwardRef } from 'react';
import styled from 'styled-components';

import checkedIcon from 'assets/icons/checked.svg';
import type Ingredient from 'services/types/Ingredient';

const Container = styled.div`
  padding: 8px 12px;
  width: 104px;
  height: 130px;
  background: #ffffff;
  box-shadow: 0px 8px 16px rgba(75, 75, 124, 0.05);
  border-radius: 12px;
  flex: none;

  .thumb {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    max-width: 64px;
    max-height: 64px;
    margin-bottom: 8px;
  }

  .label {
    font-size: 14px;
    line-height: 20px;
    color: #1f1f33;
    margin-bottom: 8px;
  }

  .price {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #1f1f33;
  }

  .row {
    display: flex;
    justify-content: space-between;
  }
`;

const Checkbox = styled.label`
  display: block;

  input {
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    position: absolute;

    &:checked + .checkbox {
      background: #00a896;

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
    border: 2px solid #00a896;
    border-radius: 4px;
    background: #ffffff;
    width: 16px;
    height: 16px;
    position: relative;
  }
`;

type Props = {
  name: string;
  option: Ingredient;
};

const IngredientCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ name, option }, ref): JSX.Element => (
    <Container>
      <img
        className="thumb"
        src={`${process.env.REACT_APP_API_URL}/${option.thumbnail}`}
        alt={option.name}
      />
      <span className="label">{option.name}</span>
      <div className="row">
        <span className="price">{option.price} ₽</span>
        <Checkbox>
          <input ref={ref} type="checkbox" name={name} value={option.slug} />
          <span className="checkbox" />
        </Checkbox>
      </div>
    </Container>
  ),
);

export default IngredientCheckbox;
