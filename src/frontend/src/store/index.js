import Vue from "vue";
import Vuex from "vuex";

import modules from "@/store/modules";

import {
  ADD_PIZZA_TO_CART,
  EDIT_PIZZA_FROM_CART,
  UPDATE_PIZZA_AT_CART,
} from "@/store/mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    editablePizzaIndex: -1,
  },
  actions: {
    async init({ dispatch }) {
      dispatch("Cart/fetchMisc");
    },
  },
  mutations: {
    [ADD_PIZZA_TO_CART](state, { pizza, price }) {
      state.Cart.pizzas = [
        { ...pizza, price, counter: 1 },
        ...state.Cart.pizzas,
      ];
    },
    [EDIT_PIZZA_FROM_CART](state, { pizza, pizzaIndex }) {
      state.Builder.currentPizza = { ...pizza };
      state.editablePizzaIndex = pizzaIndex;
    },
    [UPDATE_PIZZA_AT_CART](state, { pizza, price }) {
      const updatedPizzas = [...state.Cart.pizzas];
      updatedPizzas[state.editablePizzaIndex] = { ...pizza, price };
      state.Cart.pizzas = [...updatedPizzas];

      state.editablePizzaIndex = -1;
    },
  },
  modules,
});
