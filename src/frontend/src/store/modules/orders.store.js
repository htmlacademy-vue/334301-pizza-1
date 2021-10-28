import { SET_ORDERS_LIST, REPEAT_ORDER } from "@/store/mutation-types";

const calcPizzaPrice = (pizza, pizzaSchema) => {
  let pizzaPrice = 0;

  const saucePrice = pizzaSchema.sauces.find(
    (option) => option.id === pizza.sauceId
  ).price;
  pizzaPrice += saucePrice;

  const doughPrice = pizzaSchema.dough.find(
    (option) => option.id === pizza.doughId
  ).price;
  pizzaPrice += doughPrice;

  pizza.ingredients.forEach((ingredient) => {
    const ingridientPrice = pizzaSchema.ingredients.find(
      (option) => option.id === ingredient.ingredientId
    ).price;
    pizzaPrice += ingridientPrice * ingredient.quantity;
  });

  const multipler = pizzaSchema.sizes.find(
    (option) => option.id === pizza.sizeId
  ).multiplier;

  pizzaPrice = pizzaPrice * multipler;

  return pizzaPrice;
};

export default {
  namespaced: true,
  state: {
    pizzaSchema: null,
    miscSchema: [],
    ordersList: [],
  },
  actions: {
    async getOrdersList({ commit, dispatch, rootState }) {
      try {
        if (
          rootState.Builder.pizzaSchema === null ||
          rootState.Cart.miscSchema.length === 0
        ) {
          await dispatch("Builder/fetchBuilder", null, { root: true });
          await dispatch("Cart/fetchMisc", null, { root: true });
        }

        const data = await this.$api.orders.get();
        const pizzaSchema = rootState.Builder.pizzaSchema;
        const miscSchema = rootState.Cart.miscSchema;

        commit(SET_ORDERS_LIST, { data, pizzaSchema, miscSchema });
      } catch {
        console.log("Orders get error");
        commit(SET_ORDERS_LIST, { data: [], pizzaSchema: {}, miscSchema: [] });
      }
    },
    async postOrder({ dispatch, rootState }, orderData) {
      try {
        const postData = {
          ...orderData,
          userId: rootState.Auth.user.id,
        };
        await this.$api.orders.post(postData);
        await dispatch("getOrdersList");
      } catch {
        console.log("Order post error");
      }
    },
    async deleteOrder({ dispatch }, orderId) {
      try {
        await this.$api.orders.delete(orderId);
        await dispatch("getOrdersList");
      } catch {
        console.log("Order delete error");
      }
    },
    repeatOrder({ state, getters, commit, rootState }, order) {
      const { pizzaSchema, miscSchema } = state;
      const { getPizzaPrice } = getters;
      const { addressId, orderAddress, orderMisc, orderPizzas } = order;

      const pizzas = orderPizzas.map((pizza) => {
        return {
          price: getPizzaPrice(pizza),
          counter: pizza.quantity,
          title: {
            name: "title",
            value: pizza.name,
          },
          size: {
            name: "size",
            value: pizza.sizeId,
          },
          dough: {
            name: "dough",
            value: pizza.doughId,
          },
          ingredients: {
            sauce: {
              name: "sauce",
              value: pizza.sauceId,
            },
            subIngredients: [
              ...pizzaSchema.ingredients.map((item) => {
                return {
                  ...item,
                  value: pizza.ingredients.find(
                    (ingredient) => ingredient.ingredientId === item.id
                  )
                    ? pizza.ingredients.find(
                        (ingredient) => ingredient.ingredientId === item.id
                      ).quantity
                    : 0,
                };
              }),
            ],
          },
        };
      });

      const misc = [
        ...miscSchema.map((item) => {
          let counter = 0;
          if (orderMisc) {
            counter = orderMisc.find((misc) => misc.miscId === item.id)
              ? orderMisc.find((misc) => misc.miscId === item.id).quantity
              : 0;
          }

          return {
            ...item,
            counter: counter,
          };
        }),
      ];

      let address = {
        activeDeliveryOption: addressId ? addressId : "pickup",
        street: "",
        house: "",
        apartment: "",
        tel: "",
      };

      if (orderAddress) {
        address = {
          ...address,
          street: orderAddress.street ? orderAddress.street : "",
          house: orderAddress.building ? orderAddress.building : "",
          apartment: orderAddress.flat ? orderAddress.flat : "",
          tel: rootState.Auth.user.phone,
        };
      }

      commit(REPEAT_ORDER, { pizzas, misc, address }, { root: true });
    },
  },
  mutations: {
    [SET_ORDERS_LIST](state, payload) {
      const { data, pizzaSchema, miscSchema } = payload;

      state.pizzaSchema = { ...pizzaSchema };
      state.miscSchema = [...miscSchema];
      state.ordersList = [...data];
    },
  },
  getters: {
    getMisc: (state) => (miscData) => {
      const { miscSchema } = state;

      const misc = miscSchema.find((option) => option.id === miscData.miscId);

      return misc;
    },
    getPizzaIngredients: (state) => (ingredients) => {
      const { pizzaSchema } = state;

      return ingredients
        .map((item) => {
          return pizzaSchema.ingredients
            .find((option) => option.id === item.ingredientId)
            .name.toLowerCase();
        })
        .join(" ,");
    },
    getPizzaSize: (state) => (sizeId) => {
      const { pizzaSchema } = state;
      let pizzaSize = "";

      const schemaSize = pizzaSchema.sizes.find(
        (option) => option.id === sizeId
      );

      pizzaSize = schemaSize ? schemaSize.name : "";

      return pizzaSize;
    },
    getPizzaDough: (state) => (doughId) => {
      const { pizzaSchema } = state;
      let pizzaDough = "";

      const schemaDough = pizzaSchema.dough.find(
        (option) => option.id === doughId
      );

      if (schemaDough) {
        switch (schemaDough.name) {
          case "Тонкое":
            pizzaDough = "на тонком тесте";
            break;
          case "Толстое":
            pizzaDough = "на толстом тесте";
            break;
          default:
            pizzaDough = "на тесте";
        }
      }

      return pizzaDough;
    },
    getPizzaSauce: (state) => (sauceId) => {
      const { pizzaSchema } = state;
      let pizzaSauce = "";

      const schemaSauce = pizzaSchema.sauces.find(
        (option) => option.id === sauceId
      );

      pizzaSauce = schemaSauce ? schemaSauce.name.toLowerCase() : "";

      return pizzaSauce;
    },
    getPizzaPrice: (state) => (pizza) => {
      const { pizzaSchema } = state;

      return calcPizzaPrice(pizza, pizzaSchema);
    },
    getOrderPrice: (state) => (id) => {
      const { ordersList, pizzaSchema, miscSchema } = state;

      let orderPrice = 0;
      const order = ordersList.find((item) => item.id === id);
      const { orderPizzas, orderMisc } = order;

      orderPizzas.forEach((pizza) => {
        const pizzaPrice = calcPizzaPrice(pizza, pizzaSchema) * pizza.quantity;

        orderPrice += pizzaPrice;
      });

      if (orderMisc) {
        orderMisc.forEach((misc) => {
          const miscPrice = miscSchema.find(
            (option) => option.id === misc.miscId
          ).price;

          orderPrice += miscPrice * misc.quantity;
        });
      }

      return orderPrice;
    },
  },
};
