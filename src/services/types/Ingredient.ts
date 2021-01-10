import type Categories from 'types/Categories';

type Ingredient = {
  id: string;
  name: string;
  slug: string;
  price: string;
  category: Categories;
  image: string;
  thumbnail: string;
};

export default Ingredient;
