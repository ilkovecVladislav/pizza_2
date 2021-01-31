import React from 'react';

import IngredientsList from 'components/IngredientsList';
import { Container, Content, Title, Price } from './OrderDescription.style';
import { useIngredientsArray, usePizzaData } from '../PizzaConstructorPage/state/selectors';

type Props = {
  price: number;
};

const OrderDescription = ({ price }: Props): JSX.Element => {
  const data = usePizzaData();
  const allIngredients = useIngredientsArray();
  const { cheese = [], vegetables = [], meat = [] } = data;
  const selectedIngredients = [...cheese, ...vegetables, ...meat];

  return (
    <Container>
      <Content>
        <Title>Маргарита</Title>
        <IngredientsList
          size={data.size}
          dough={data.dough}
          saucesValue={data.sauce}
          allIngredients={allIngredients}
          selectedIngredients={selectedIngredients}
        />
        <Price>{price} руб</Price>
      </Content>
    </Container>
  );
};

export default OrderDescription;
