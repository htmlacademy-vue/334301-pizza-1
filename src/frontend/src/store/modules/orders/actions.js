import { Entity, MODULE } from "./const";
import { SET_ENTITY } from "../../mutation-types";
import resources from "../../../common/enums/resources";
import {
  prepareAdditional,
  preparePizza,
} from "../../../common/utils/helpers/prepare-order-data";
import { Message } from "../../../common/const/common";

const module = MODULE;

export default {
  setAddress({ commit }, address) {
    commit(
      SET_ENTITY,
      { module, entity: Entity.ADDRESS, value: address },
      { root: true }
    );
  },

  async clearAddress({ commit }) {
    commit(
      SET_ENTITY,
      { module, entity: Entity.ADDRESS, value: null },
      { root: true }
    );
  },

  async loadOrderToCart({ getters, dispatch }, id) {
    const order = getters["getOrders"].find((item) => item.id === +id);
    const { additional, pizzas, address } = order;
    pizzas.forEach((pizza) => {
      dispatch("cart/addPizza", pizza, { root: true });
    });

    if (additional) {
      dispatch("cart/setAdditional", order.additional, { root: true });
    }

    if (address) {
      dispatch("setAddress", address);
    }
  },

  async removeOrder({ commit, getters }, id) {
    try {
      await this.$api[resources.ORDERS].delete(id);
      this.$notifier.success(Message.ORDER_DELETE_SUCCESS);
      const orders = getters["getOrders"].filter((item) => +item.id !== +id);
      commit(
        SET_ENTITY,
        { module, entity: Entity.ORDERS, value: orders },
        { root: true }
      );
    } catch (e) {
      this.$notifier.error(Message.SERVER_ERROR);
    }
  },

  async loadOrders({ commit, rootGetters }) {
    const data = await this.$api[resources.ORDERS].get();

    const orders = await Promise.all(
      data.map(async (order) => {
        const { id, orderPizzas, orderAddress, orderMisc = null } = order;
        let orderPrice = 0;

        const { additional, additionalPrice } = await prepareAdditional(
          rootGetters["cart/getMisc"],
          orderMisc
        );
        orderPrice += additionalPrice;

        const pizzas = await Promise.all(
          orderPizzas.map(async (orderPizza) => {
            const pizza = await preparePizza(
              orderPizza,
              rootGetters["builder/sauces"],
              rootGetters["builder/doughs"],
              rootGetters["builder/sizes"],
              rootGetters["builder/ingredients"]
            );
            orderPrice += pizza.price * pizza.count;
            return pizza;
          })
        );

        return {
          id,
          address: orderAddress,
          pizzas,
          additional,
          price: orderPrice,
        };
      })
    );

    commit(
      SET_ENTITY,
      { module, entity: [Entity.ORDERS], value: orders },
      { root: true }
    );
  },
};
