import { publicGet } from './publicAxios';
import type Ingredient from './types/Ingredient';

const BASE_URL = '/ingredients';

export const getIngredients = (): Promise<Ingredient[]> => publicGet(BASE_URL);
