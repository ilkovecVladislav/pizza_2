import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

import RadioButtonGroupField from 'components/Form/RadioButtonGroupField';
import IngredientCheckbox from 'components/Form/IngredientCheckbox';
import { loadIngredients, setPizza } from './state/reducer';
import { useIngredients, useIsIngredientsLoading } from './state/selectors';
import {
  Container,
  Content,
  PizzaName,
  PizzaParamsWrapper,
  SauceWrapper,
  Row,
  IngredientsLabel,
  IngredientsItemsContainer,
  SubmitContainer,
  SubmitButton,
} from './PizzaConstructor.style';
import Header from './Header';
import PizzaView from './PizzaView';
import PizzaDescription from './PizzaDescription';
import { PIZZA_SIZES, DOUGH } from './constants';
import useCalculatePizzaPrice from './priceCalcHooks';
import type { FormValues } from './types';

const PizzaConstructor = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      size: 'medium',
      dough: 'thin',
      cheese: [],
      vegetables: [],
      meat: [],
    },
  });

  const formValues = watch();

  const allIngredients = useIngredients();

  const { cheese = [], vegetables = [], sauces = [], meat = [] } = allIngredients;

  const price = useCalculatePizzaPrice({
    selectedIngredients: formValues,
    sauces,
    meat,
    cheese,
    vegetables,
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
    return <span>Loading</span>;
  }

  return (
    <Container>
      <Header />
      <PizzaView data={formValues} />
      <Content>
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
      </Content>
      <SubmitContainer>
        <SubmitButton className="submit" type="button" onClick={handleOrderClick}>
          Заказать за {price} руб
        </SubmitButton>
      </SubmitContainer>
    </Container>
  );
};

export default PizzaConstructor;
