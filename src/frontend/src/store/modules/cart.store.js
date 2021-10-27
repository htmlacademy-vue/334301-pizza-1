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
  pizzaSchema: null,
  miscSchema: [],
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
    async fetchMisc({ commit, dispatch, rootState }) {
      const miscSchema = await this.$api.misc.query();
      const pizzaSchema = rootState.Builder.pizzaSchema;

      if (rootState.Auth.isAuthenticated === true) {
        await dispatch("Address/getAddressList", null, { root: true });

        commit(UPDATE_CART_FORM, {
          key: "tel",
          value: rootState.Auth.user.phone,
          data,
        });
      }

      const data = miscSchema.map((item) => {
        return {
          ...item,
          counter: 0,
        };
      });
      commit(SET_CART_MISC, {
        miscSchema,
        pizzaSchema,
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
    async submitForm({ state, commit, rootState }) {
      const { pizzas, misc, form } = state;

      const preparedPizzas = pizzas.map((pizza) => {
        return {
          name: pizza.title.value,
          sauceId: pizza.ingredients.sauce.value,
          doughId: pizza.dough.value,
          sizeId: pizza.size.value,
          quantity: pizza.counter,
          ingredients: pizza.ingredients.subIngridients
            .filter((item) => item.value > 0)
            .map((item) => {
              return {
                ingredientId: item.id,
                quantity: item.value,
              };
            }),
        };
      });

      const preparedMisc = misc
        .filter((item) => item.counter > 0)
        .map((item) => {
          return {
            miscId: item.id,
            quantity: item.counter,
          };
        });

      const postData = {
        userId: rootState.Auth.user.id,
        pizzas: preparedPizzas,
        misc: preparedMisc,
        phone: form.tel,
        address: {
          street: form.street,
          building: form.house,
          flat: form.apartment,
        },
      };

      if (rootState.Auth.isAuthenticated === false) {
        postData.userId = null;
      }

      switch (form.activeDeliveryOption) {
        case "pickup":
          postData.address = null;
          await this.$api.orders.post(postData);
          break;

        default:
          await this.$api.orders.post(postData);
          break;
      }

      commit(UPDATE_CART_POPUP_STATE, true);
    },
  },
  mutations: {
    [RESET_CART](state) {
      Object.assign(state, {
        pizzas: [],
        misc: [
          ...state.miscSchema.map((item) => {
            return {
              ...item,
              counter: 0,
            };
          }),
        ],
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
      const { miscSchema, pizzaSchema, data } = payload;

      state.miscSchema = [...miscSchema];
      state.pizzaSchema = { ...pizzaSchema };
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
      const { pizzas, pizzaSchema } = state;
      const pizza = pizzas[id];
      let pizzaSize = "";

      const schemaSize = pizzaSchema.sizes.find(
        (option) => option.id === pizza.size.value
      );

      pizzaSize = schemaSize ? schemaSize.name : "";

      return pizzaSize;
    },
    getPizzaDough: (state) => (id) => {
      const { pizzas, pizzaSchema } = state;
      const pizza = pizzas[id];
      let pizzaDough = "";

      const schemaDough = pizzaSchema.dough.find(
        (option) => option.id === pizza.dough.value
      );

      if (schemaDough) {
        switch (schemaDough.name) {
          case "Тонкое":
            pizzaDough = "тонком";
            break;
          case "Толстое":
            pizzaDough = "толстом";
            break;
          default:
            pizzaDough = "";
        }
      }

      return pizzaDough;
    },
    getPizzaSauce: (state) => (id) => {
      const { pizzas, pizzaSchema } = state;
      const pizza = pizzas[id];
      let pizzaSauce = "";

      const schemaSauce = pizzaSchema.sauces.find(
        (option) => option.id === pizza.ingredients.sauce.value
      );

      pizzaSauce = schemaSauce ? schemaSauce.name.toLowerCase() : "";

      return pizzaSauce;
    },
    getPizzaSubIngridients: (state) => (id) => {
      const pizza = state.pizzas[id];

      const subIngridients = pizza.ingredients.subIngridients
        .filter((subIngridient) => subIngridient.value > 0)
        .map((subIngridient) => {
          if (subIngridient.value > 0) {
            return subIngridient.name.toLowerCase();
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
