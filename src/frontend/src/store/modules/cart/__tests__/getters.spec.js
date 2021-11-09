import cartGetters from "../getters";
import { enableAutoDestroy } from "@vue/test-utils";
import { Entity } from "../const";
import { factory, mockValue } from "../mocks";

jest.mock("../../../../common/utils/helpers/calculate", () => ({
  calculateIngredientsPrice: () => 100,
}));

enableAutoDestroy(afterEach);

describe("store.modules.cart.getters", () => {
  let state = {};
  let getters;

  beforeEach(() => {
    getters = { ...cartGetters };
  });

  test("price должен вернуть 0", () => {
    getters.itemsPrice = null;
    expect(getters.price(state, getters)).toBe(0);
  });

  test("price должен вернуть 10", () => {
    getters.itemsPrice = 5;
    getters.additionalPrice = 5;
    expect(getters.price(state, getters)).toBe(10);
  });

  test("itemsPrice должен вернуть 100", () => {
    expect(getters.itemsPrice(state)).toBe(100);
  });

  test("additionalPrice должен вернуть 100", () => {
    state = factory(Entity.ADDITIONAL, mockValue);
    expect(getters.additionalPrice(state)).toBe(100);
  });

  test("getItems", () => {
    state = factory(Entity.ITEMS, mockValue);
    expect(getters.getItems(state)).toStrictEqual(mockValue);
  });

  test("getAdditional", () => {
    state = factory(Entity.ADDITIONAL, mockValue);
    expect(getters.getAdditional(state)).toStrictEqual(mockValue);
  });

  test("getMisc", () => {
    state = factory(Entity.LOADED_ADDITIONAL, mockValue);
    expect(getters.getMisc(state)).toStrictEqual(mockValue);
  });
});
