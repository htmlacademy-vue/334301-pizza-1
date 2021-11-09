import getters from "../getters";
import { Entity } from "../const";

const state = {
  [Entity.ADDRESS]: [{ address: 1 }, { address: 2 }],
  [Entity.ORDERS]: [{ order: 1 }, { order: 2 }],
};

describe("store.modules.orders.getters", () => {
  test("getAddress", () => {
    expect(getters.getAddress(state)).toStrictEqual([
      { address: 1 },
      { address: 2 },
    ]);
  });

  test("getOrders", () => {
    expect(getters.getOrders(state)).toStrictEqual([
      { order: 1 },
      { order: 2 },
    ]);
  });
});
