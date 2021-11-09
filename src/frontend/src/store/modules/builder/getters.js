import { Entity } from "./const";
import {
  calculatePrice,
  calculateIngredientsPrice,
} from "../../../common/utils/helpers/calculate";

export default {
  isDataLoaded: (state) => state[Entity.IS_DATA_LOADED],
  doughs: (state) => state.doughs,
  ingredients: (state) => state[Entity.INGREDIENTS],
  sauces: (state) => state.sauces,
  sizes: (state) => state.sizes,
  addedIngredients: (state) =>
    state[Entity.INGREDIENTS].filter((item) => item.count > 0) || [],
  ingredientsPrice: (state, getters) =>
    calculateIngredientsPrice(getters.addedIngredients),
  pizzaPrice: (state, getters) =>
    calculatePrice(
      state[Entity.CURRENT_DOUGH].price,
      state[Entity.CURRENT_SAUCE].price,
      getters.ingredientsPrice,
      state[Entity.CURRENT_SIZE].multiplier
    ),

  pizza: (state, getters) => ({
    id: state[Entity.PIZZA_ID],
    name: state[Entity.PIZZA_NAME],
    dough: state[Entity.CURRENT_DOUGH],
    ingredients: getters.addedIngredients,
    sauce: state[Entity.CURRENT_SAUCE],
    size: state[Entity.CURRENT_SIZE],
    price: getters.pizzaPrice,
    count: state[Entity.PIZZA_COUNT],
  }),
};
