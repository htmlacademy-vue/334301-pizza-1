import { calculateIngredientsPrice } from "../../../common/utils/helpers/calculate";
import { Entity } from "./const";

export default {
  price: (state, getters) => {
    return getters.itemsPrice
      ? getters.itemsPrice + getters.additionalPrice
      : 0;
  },
  itemsPrice: (state) => {
    return calculateIngredientsPrice(state[Entity.ITEMS]);
  },
  additionalPrice: (state) => {
    return calculateIngredientsPrice(state[Entity.ADDITIONAL]);
  },
  getItems: (state) => {
    return state[Entity.ITEMS];
  },
  getAdditional: (state) => {
    return state[Entity.ADDITIONAL];
  },
  getMisc: (state) => {
    return state[Entity.LOADED_ADDITIONAL];
  },
};
