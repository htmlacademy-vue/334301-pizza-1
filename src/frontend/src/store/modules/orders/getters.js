import { Entity } from "./const";

export default {
  getAddress(state) {
    return state[Entity.ADDRESS];
  },
  getOrders(state) {
    return state[Entity.ORDERS];
  },
};
