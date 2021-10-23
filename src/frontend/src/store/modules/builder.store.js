import pizza from "@/static/pizza.json";

import {
  UPDATE_PIZZA,
  UPDATE_PIZZA_SAUSE,
  UPDATE_PIZZA_SUBINGRIDIENT,
  RESET_PIZZA,
  ADD_PIZZA_TO_CART,
  UPDATE_PIZZA_AT_CART,
} from "@/store/mutation-types";

const initialState = () => ({
  currentPizza: {
    dough: {
      name: "dough",
      value: "light",
    },
    ingredients: {
      sauce: {
        name: "sauce",
        value: "tomato",
      },
      subIngridients: [
        {
          name: "mushrooms",
          text: "Грибы",
          value: 0,
        },
        {
          name: "cheddar",
          text: "Чеддер",
          value: 0,
        },
        {
          name: "salami",
          text: "Салями",
          value: 0,
        },
        {
          name: "ham",
          text: "Ветчина",
          value: 0,
        },
        {
          name: "ananas",
          text: "Ананас",
          value: 0,
        },
        {
          name: "bacon",
          text: "Бекон",
          value: 0,
        },
        {
          name: "onion",
          text: "Лук",
          value: 0,
        },
        {
          name: "chile",
          text: "Чили",
          value: 0,
        },
        {
          name: "jalapeno",
          text: "Халапеньо",
          value: 0,
        },
        {
          name: "olives",
          text: "Маслины",
          value: 0,
        },
        {
          name: "tomatoes",
          text: "Томаты",
          value: 0,
        },
        {
          name: "salmon",
          text: "Лосось",
          value: 0,
        },
        {
          name: "mozzarella",
          text: "Моцарелла",
          value: 0,
        },
        {
          name: "parmesan",
          text: "Пармезан",
          value: 0,
        },
        {
          name: "blue_cheese",
          text: "Блю чиз",
          value: 0,
        },
      ],
    },
    size: {
      name: "size",
      value: "small",
    },
    title: {
      name: "title",
      value: "",
    },
  },
});

export default {
  namespaced: true,
  state: initialState(),
  actions: {
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

      state.currentPizza[`${key}`].value = value;
    },
    [UPDATE_PIZZA_SAUSE](state, payload) {
      const { key, value } = payload;

      state.currentPizza.ingredients[`${key}`].value = value;
    },
    [UPDATE_PIZZA_SUBINGRIDIENT](state, payload) {
      const { ingridientIndex, delta } = payload;

      const ingridientValue =
        state.currentPizza.ingredients.subIngridients[ingridientIndex].value;

      if (ingridientValue + delta <= 3 || ingridientValue + delta >= 0) {
        state.currentPizza.ingredients.subIngridients[ingridientIndex].value +=
          delta;
      }
    },
    [RESET_PIZZA](state) {
      Object.assign(state, initialState());
    },
  },
  getters: {
    calculatedPrice(state) {
      let price = 0;
      let multipler = 1;

      const { currentPizza } = state;

      switch (currentPizza.dough.value) {
        case "light":
          price +=
            pizza.dough.find((option) => option.name === "Тонкое").price || 0;
          break;
        case "large":
          price +=
            pizza.dough.find((option) => option.name === "Толстое").price || 0;
          break;
        default:
          price += 0;
      }

      switch (currentPizza.ingredients.sauce.value) {
        case "tomato":
          price +=
            pizza.sauces.find((option) => option.name === "Томатный").price ||
            0;
          break;
        case "creamy":
          price +=
            pizza.sauces.find((option) => option.name === "Сливочный").price ||
            0;
          break;
        default:
          price += 0;
      }

      currentPizza.ingredients.subIngridients.forEach((item) => {
        const ingridientData = pizza.ingredients.find(
          (pizzaItem) => pizzaItem.name === item.text
        );
        if (ingridientData) {
          price += ingridientData.price * item.value;
        }
      });

      switch (currentPizza.size.value) {
        case "small":
          multipler =
            pizza.sizes.find((option) => option.name === "23 см").multiplier ||
            1;
          break;
        case "normal":
          multipler =
            pizza.sizes.find((option) => option.name === "32 см").multiplier ||
            2;
          break;
        case "big":
          multipler =
            pizza.sizes.find((option) => option.name === "45 см").multiplier ||
            3;
          break;
        default:
          multipler = 1;
      }

      return price * multipler;
    },
    canOrderPizza(state) {
      const { currentPizza } = state;

      let canOrder = true;
      let haveAtLeastOneIngridient = false;

      for (let subIngridient of currentPizza.ingredients.subIngridients) {
        if (subIngridient.value !== 0) {
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
