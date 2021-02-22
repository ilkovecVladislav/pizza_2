import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadIngredients } from 'pages/PizzaConstructorPage/state/reducer';

const App: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  return <>{children}</>;
};

export default App;
