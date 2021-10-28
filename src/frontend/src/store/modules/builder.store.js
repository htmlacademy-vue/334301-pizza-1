import {
  UPDATE_PIZZA,
  UPDATE_PIZZA_SAUSE,
  UPDATE_PIZZA_SUBINGRIDIENT,
  RESET_PIZZA,
  ADD_PIZZA_TO_CART,
  UPDATE_PIZZA_AT_CART,
} from "@/store/mutation-types";
import { SET_PIZZA_SCHEMA } from "../mutation-types";

export default {
  namespaced: true,
  state: {
    pizzaSchema: null,
    currentPizza: null,
  },
  actions: {
    async fetchBuilder({ commit }) {
      const results = await Promise.all([
        this.$api.dough.query(),
        this.$api.ingredients.query(),
        this.$api.sauces.query(),
        this.$api.sizes.query(),
      ]);
      const [dough, ingredients, sauces, sizes] = results;

      const newSchema = {
        dough,
        ingredients,
        sauces,
        sizes,
      };

      commit(SET_PIZZA_SCHEMA, { newSchema });
    },
    addToCart({ state, getters, commit, rootState }) {
      const { currentPizza } = state;
      const price = getters.calculatedPrice;

      if (rootState.editablePizzaIndex === -1) {
        commit(
          ADD_PIZZA_TO_CART,
          {
            pizza: currentPizza,
            price,
          },
          { root: true }
        );
      } else {
        commit(
          UPDATE_PIZZA_AT_CART,
          {
            pizza: currentPizza,
            price,
          },
          { root: true }
        );
      }

      commit(RESET_PIZZA);
    },
  },
  mutations: {
    [UPDATE_PIZZA](state, payload) {
      const { key, value } = payload;
      const { currentPizza } = state;

      currentPizza[key].value = value;
    },
    [UPDATE_PIZZA_SAUSE](state, payload) {
      const { key, value } = payload;

      state.currentPizza.ingredients[key].value = value;
    },
    [UPDATE_PIZZA_SUBINGRIDIENT](state, payload) {
      const { ingridientIndex, delta } = payload;

      const ingridientValue =
        state.currentPizza.ingredients.subIngredients[ingridientIndex].value;

      if (ingridientValue + delta <= 3 || ingridientValue + delta >= 0) {
        state.currentPizza.ingredients.subIngredients[ingridientIndex].value +=
          delta;
      }
    },
    [SET_PIZZA_SCHEMA](state, payload) {
      const { newSchema } = payload;
      state.pizzaSchema = { ...newSchema };

      const ingredients = state.pizzaSchema.ingredients.map((item) => {
        return { ...item, value: 0 };
      });

      state.currentPizza = {
        dough: {
          name: "dough",
          value: state.pizzaSchema.dough[0].id,
        },
        ingredients: {
          sauce: {
            name: "sauce",
            value: state.pizzaSchema.sauces[0].id,
          },
          subIngredients: [...ingredients],
        },
        size: {
          name: "size",
          value: state.pizzaSchema.sizes[0].id,
        },
        title: {
          name: "title",
          value: "",
        },
      };
    },
    [RESET_PIZZA](state) {
      const ingredients = state.pizzaSchema.ingredients.map((item) => {
        return { ...item, value: 0 };
      });

      state.currentPizza = {
        dough: {
          name: "dough",
          value: state.pizzaSchema.dough[0].id,
        },
        ingredients: {
          sauce: {
            name: "sauce",
            value: state.pizzaSchema.sauces[0].id,
          },
          subIngredients: [...ingredients],
        },
        size: {
          name: "size",
          value: state.pizzaSchema.sizes[0].id,
        },
        title: {
          name: "title",
          value: "",
        },
      };
    },
  },
  getters: {
    calculatedPrice(state) {
      let price = 0;

      const { currentPizza, pizzaSchema } = state;

      const doughPrice = pizzaSchema.dough.find(
        (option) => option.id === currentPizza.dough.value
      ).price;
      price += doughPrice;

      const saucePrice = pizzaSchema.sauces.find(
        (option) => option.id === currentPizza.ingredients.sauce.value
      ).price;
      price += saucePrice;

      currentPizza.ingredients.subIngredients.forEach((item) => {
        price += item.price * item.value;
      });

      const multipler = pizzaSchema.sizes.find(
        (option) => option.id === currentPizza.size.value
      ).multiplier;

      return price * multipler;
    },
    canOrderPizza(state) {
      const { currentPizza } = state;

      let canOrder = true;
      let haveAtLeastOneIngridient = false;

      for (let subIngredient of currentPizza.ingredients.subIngredients) {
        if (subIngredient.value !== 0) {
          haveAtLeastOneIngridient = true;

          break;
        }
      }

      if (
        currentPizza.title.value.split(" ").join("").length === 0 ||
        haveAtLeastOneIngridient === false
      ) {
        canOrder = false;
      }

      return canOrder;
    },
  },
};
