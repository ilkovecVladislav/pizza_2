import React, { useState, useEffect, ReactElement } from 'react';

import { getOrders } from 'services/orders';
import type Order from 'services/types/Order';
import OrderCard from 'components/OrderCard';
import Header from 'components/Header';
import { useIngredientsArray } from 'pages/PizzaConstructorPage/state/selectors';
import { Wrapper, Container } from './OrdersList.style';

const getDate = (step: number): Date => {
  const baseDate = new Date();
  const newDate = new Date();
  newDate.setDate(baseDate.getDate() + step * 2);

  return newDate;
};

const OrdersList = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Order[] | null>(null);
  const ingredients = useIngredientsArray();

  useEffect(() => {
    setIsLoading(true);

    getOrders()
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Header title="Мои заказы" link="/home" />
      {data && (
        <Container>
          {data.reverse().map((item, index) => (
            <OrderCard
              key={item.id}
              order={item}
              ingredients={ingredients}
              date={getDate(index)}
              status={index === 0 ? 'not-completed' : 'completed'}
            />
          ))}
        </Container>
      )}
    </Wrapper>
  );
};

export default OrdersList;
