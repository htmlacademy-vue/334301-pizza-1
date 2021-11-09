import { Entity } from "./const";

export default {
  getUser: (state) => {
    return state[Entity.USER];
  },
  getUserAddresses: (state) => {
    return state[Entity.ADDRESSES];
  },
};
