import React, { forwardRef, ReactElement } from 'react';

import type Ingredient from 'services/types/Ingredient';
import { Container, Thumb, Title, Row, Price, Checkbox } from './IngredientCheckbox.style';

type Props = {
  name: string;
  option: Ingredient;
  value: string[];
  setValue: (name: string, value: string[]) => void;
};

const IngredientCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ name, option, value, setValue }, ref): ReactElement => {
    const isSelected = value.includes(option.slug);

    const handleContainerClick = () => {
      if (isSelected) {
        setValue(
          name,
          value.filter((item) => item !== option.slug),
        );
      } else {
        setValue(name, [...value, option.slug]);
      }
    };

    const handleCheckboxClick = (event: React.MouseEvent) => {
      event.stopPropagation();
    };

    return (
      <Container isSelected={isSelected} onClick={handleContainerClick}>
        <Thumb src={`${process.env.REACT_APP_API_URL}/${option.thumbnail}`} alt={option.name} />
        <Title isSelected={isSelected}>{option.name}</Title>
        <Row>
          <Price>{option.price} ₽</Price>
          <Checkbox onClick={handleCheckboxClick}>
            <input ref={ref} type="checkbox" name={name} value={option.slug} />
            <span className="checkbox" />
          </Checkbox>
        </Row>
      </Container>
    );
  },
);

export default IngredientCheckbox;
