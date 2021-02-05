import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

import RadioButtonGroupField from 'components/Form/RadioButtonGroupField';
import IngredientCheckbox from 'components/Form/IngredientCheckbox';
import Button from 'components/Button';
import { PIZZA_SIZES, DOUGH } from 'constants/common';
import useCalculatePizzaPrice from 'utils/hooks/useCalculatePizzaPrice';
import { setPizza } from './state/reducer';
import { useIngredients, useIngredientsArray, useIsIngredientsLoading } from './state/selectors';
import {
  Container,
  InnerContainer,
  PizzaName,
  Title,
  PizzaParamsWrapper,
  SauceWrapper,
  Row,
  IngredientsLabel,
  IngredientsItemsContainer,
  SubmitContainer,
  SubmitInnerWrapper,
} from './PizzaConstructor.style';
import Header from './Header';
import PizzaView from './PizzaView';
import PizzaDescription from './PizzaDescription';
import type { FormValues } from './types';

const PizzaConstructor = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      size: '30',
      dough: 'thin',
      cheese: [],
      vegetables: [],
      meat: [],
    },
  });

  const allIngredients = useIngredients();
  const ingredientsArray = useIngredientsArray();

  const { cheese = [], vegetables = [], sauces = [], meat = [] } = allIngredients;

  const formValues = watch();
  const {
    cheese: cheeseValue = [],
    meat: meatValue = [],
    vegetables: vegetablesValue = [],
    sauce,
    dough,
    size,
  } = formValues;

  const selectedIngredients = [...cheeseValue, ...meatValue, ...vegetablesValue];

  const price = useCalculatePizzaPrice({
    allIngredients: ingredientsArray,
    size: size,
    dough: dough,
    saucesValue: sauce,
    selectedIngredients: selectedIngredients,
  });

  const handleOrderClick = handleSubmit(() => {
    dispatch(setPizza(formValues));
    history.push('/order-checkout');
  });

  const normalizedSauces = reduce(
    sauces,
    (acc, cur) => ({ ...acc, [cur.slug]: { ...cur, label: cur.name } }),
    {},
  );

  const isLoadingIngredients = useIsIngredientsLoading();

  if (isLoadingIngredients) {
    return <span>Загрузка</span>;
  }

  return (
    <Container>
      <Header />
      <InnerContainer>
        <Title>Собери свою пиццу</Title>
        <PizzaView data={formValues} />
        <PizzaName>Pepperoni</PizzaName>
        <PizzaDescription data={formValues} />
        <form>
          <PizzaParamsWrapper>
            <RadioButtonGroupField
              label="Размер"
              name="size"
              ref={register}
              options={PIZZA_SIZES}
            />
            <RadioButtonGroupField label="Тесто" name="dough" ref={register} options={DOUGH} />
          </PizzaParamsWrapper>
          <SauceWrapper>
            <RadioButtonGroupField
              label="Выберите соус"
              name="sauce"
              ref={register}
              options={normalizedSauces}
            />
          </SauceWrapper>
          <Row>
            <IngredientsLabel>Добавьте сыр</IngredientsLabel>
            <IngredientsItemsContainer>
              {map(cheese, (option) => (
                <IngredientCheckbox
                  key={option.id}
                  ref={register}
                  name="cheese"
                  option={option}
                  value={formValues.cheese}
                  setValue={setValue}
                />
              ))}
            </IngredientsItemsContainer>
          </Row>
          <Row>
            <IngredientsLabel>Добавьте овощи</IngredientsLabel>
            <IngredientsItemsContainer>
              {map(vegetables, (option) => (
                <IngredientCheckbox
                  key={option.id}
                  ref={register}
                  name="vegetables"
                  option={option}
                  value={formValues.vegetables}
                  setValue={setValue}
                />
              ))}
            </IngredientsItemsContainer>
          </Row>
          <Row>
            <IngredientsLabel>Добавьте мясо</IngredientsLabel>
            <IngredientsItemsContainer>
              {map(meat, (option) => (
                <IngredientCheckbox
                  key={option.id}
                  ref={register}
                  name="meat"
                  option={option}
                  value={formValues.meat}
                  setValue={setValue}
                />
              ))}
            </IngredientsItemsContainer>
          </Row>
        </form>
      </InnerContainer>
      <SubmitContainer>
        <SubmitInnerWrapper>
          <Button text={`Заказать за ${price} руб`} onClick={handleOrderClick} />
        </SubmitInnerWrapper>
      </SubmitContainer>
    </Container>
  );
};

export default PizzaConstructor;
