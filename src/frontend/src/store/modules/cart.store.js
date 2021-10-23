import miscData from "@/static/misc.json";

import {
  RESET_CART,
  UPDATE_PIZZA_CART_COUNTER,
  EDIT_PIZZA_FROM_CART,
  SET_CART_MISC,
  UPDATE_CART_MISC_COUNTER,
  UPDATE_CART_FORM,
  UPDATE_CART_POPUP_STATE,
} from "@/store/mutation-types";

const initialState = () => ({
  pizzas: [],
  misc: [],
  form: {
    activeDeliveryOption: "pickup",
    tel: "",
    street: "",
    house: "",
    apartment: "",
  },
  popupActive: false,
});

export default {
  namespaced: true,
  state: initialState(),
  actions: {
    fetchMisc({ commit }) {
      const data = miscData.map((item) => {
        return {
          ...item,
          counter: 0,
        };
      });
      commit(SET_CART_MISC, {
        data,
      });
    },
    editPizza({ state, commit }, pizzaIndex) {
      const pizza = state.pizzas[pizzaIndex];

      commit(
        EDIT_PIZZA_FROM_CART,
        {
          pizza,
          pizzaIndex,
        },
        { root: true }
      );
    },
    submitForm({ state, commit }) {
      const { pizzas, misc, form } = state;

      if (pizzas.length === 0) {
        return;
      }

      const data = {
        pizzaData: [...pizzas],
        miscData: [...misc],
        formData: { ...form },
      };

      // W.I.P.
      console.log(data);

      // W.I.P.
      switch (form.activeDeliveryOption) {
        case "pickup":
          if (form.tel.split(" ").join("").length !== 0) {
            console.log("Оформлен заказ с самовывозом");
          }
          break;

        default:
          if (
            form.tel.split(" ").join("").length !== 0 &&
            form.street.split(" ").join("").length !== 0 &&
            form.house.split(" ").join("").length !== 0
          ) {
            console.log("Оформлен заказ с адресом");
          }
          break;
      }

      commit(UPDATE_CART_POPUP_STATE, true);
    },
  },
  mutations: {
    [RESET_CART](state) {
      Object.assign(state, {
        pizzas: [],
        misc: [...state.misc],
        form: {
          activeDeliveryOption: "pickup",
          tel: "",
          street: "",
          house: "",
          apartment: "",
        },
        popupActive: false,
      });
    },
    [UPDATE_PIZZA_CART_COUNTER](state, payload) {
      const { pizzaIndex, delta } = payload;

      if (state.pizzas[pizzaIndex].counter + delta >= 0) {
        state.pizzas[pizzaIndex].counter += delta;
      }
    },
    [SET_CART_MISC](state, payload) {
      const { data } = payload;

      state.misc = [...data];
    },
    [UPDATE_CART_MISC_COUNTER](state, payload) {
      const { miscIndex, delta } = payload;

      if (state.misc[miscIndex].counter + delta >= 0) {
        state.misc[miscIndex].counter += delta;
      }
    },
    [UPDATE_CART_FORM](state, payload) {
      const { key, value } = payload;

      state.form[key] = value;
    },
    [UPDATE_CART_POPUP_STATE](state, payload) {
      state.popupActive = payload;
    },
  },
  getters: {
    getPizzaSize: (state) => (id) => {
      const pizza = state.pizzas[id];
      let pizzaSize = "";

      switch (pizza.size.value) {
        case "small":
          pizzaSize = "23";
          break;
        case "normal":
          pizzaSize = "32";
          break;
        case "big":
          pizzaSize = "45";
          break;
        default:
          pizzaSize = "";
      }

      return pizzaSize;
    },
    getPizzaDough: (state) => (id) => {
      const pizza = state.pizzas[id];
      let pizzaDough = "";

      switch (pizza.dough.value) {
        case "light":
          pizzaDough = "тонком";
          break;
        case "large":
          pizzaDough = "толстом";
          break;
        default:
          pizzaDough = "";
      }

      return pizzaDough;
    },
    getPizzaSauce: (state) => (id) => {
      const pizza = state.pizzas[id];
      let pizzaSauce = "";

      switch (pizza.ingredients.sauce.value) {
        case "tomato":
          pizzaSauce = "томатный";
          break;
        case "creamy":
          pizzaSauce = "сливочный";
          break;
        default:
          pizzaSauce = "";
      }

      return pizzaSauce;
    },
    getPizzaSubIngridients: (state) => (id) => {
      const pizza = state.pizzas[id];

      const subIngridients = pizza.ingredients.subIngridients
        .filter((subIngridient) => subIngridient.value > 0)
        .map((subIngridient) => {
          if (subIngridient.value > 0) {
            return subIngridient.text.toLowerCase();
          } else {
            return null;
          }
        })
        .join(", ");

      return subIngridients;
    },
    totalPrice(state) {
      let price = 0;

      const { misc, pizzas } = state;

      pizzas.forEach((pizza) => {
        price += pizza.price * pizza.counter;
      });

      misc.forEach((item) => {
        price += item.price * item.counter;
      });

      return price;
    },
  },
};
