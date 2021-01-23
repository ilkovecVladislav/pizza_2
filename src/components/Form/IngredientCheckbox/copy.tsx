import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';

import checkedIcon from 'assets/icons/checked.svg';
import type Ingredient from 'services/types/Ingredient';

const Container = styled.div<{ isSelected: boolean }>`
  padding: 8px 12px;
  width: 104px;
  height: 130px;
  background: #ffffff;
  box-shadow: 0px 8px 16px rgba(75, 75, 124, 0.05);
  border-radius: 12px;
  flex: none;
  border: 2px solid ${({ isSelected }) => (isSelected ? '#00a896' : 'transparent')};
  cursor: pointer;

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
    cursor: pointer;
  }
`;

type Props = {
  name: string;
  value: string[];
  option: Ingredient;
  onChange: (value: string[]) => void;
};

const IngredientCheckbox = ({ name, option, value, onChange }: Props): JSX.Element => {
  const isSelected = value.includes(option.slug);
  console.log(value, option.slug, isSelected);

  const handleContainerClick = () => {
    if (isSelected) {
      onChange(value.filter((item) => item !== option.slug));
    } else {
      onChange([...value, option.slug]);
    }
  };

  const handleCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Container isSelected={isSelected} onClick={handleContainerClick}>
      <img
        className="thumb"
        src={`${process.env.REACT_APP_API_URL}/${option.thumbnail}`}
        alt={option.name}
      />
      <span className="label">{option.name}</span>
      <div className="row">
        <span className="price">{option.price} ₽</span>
        <Checkbox onClick={handleCheckboxClick}>
          <input checked={isSelected} type="checkbox" name={name} value={option.slug} readOnly />
          <span className="checkbox" />
        </Checkbox>
      </div>
    </Container>
  );
};

type FieldProps = {
  name: string;
  option: Ingredient;
  control: Control;
};

const IngredientCheckboxField = ({ name, option, control }: FieldProps): ReactElement => (
  <Controller
    control={control}
    name={name}
    render={({ value, name, onChange }) => (
      <IngredientCheckbox name={name} value={value} option={option} onChange={onChange} />
    )}
  />
);

export default IngredientCheckboxField;
