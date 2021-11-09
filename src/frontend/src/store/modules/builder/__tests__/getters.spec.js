import getters from "../getters";
import { Entity } from "../const";

jest.mock("../../../../common/utils/helpers/calculate", () => ({
  calculatePrice: jest.fn(() => 1000),
  calculateIngredientsPrice: jest.fn(() => 100),
}));

const mockValue = [{ id: 1 }, { id: 2 }];

const factory = (entity, value) => {
  return {
    [entity]: value,
  };
};

describe("store.modules.builder.getters", () => {
  let state;

  test("isDataLoaded", () => {
    state = factory(Entity.IS_DATA_LOADED, false);
    expect(getters.isDataLoaded(state)).toBeFalsy();
  });

  test("return doughs", () => {
    state = factory(Entity.DOUGHS, mockValue);
    expect(getters.doughs(state)).toStrictEqual(mockValue);
  });

  test("ingredients", () => {
    state = factory(Entity.INGREDIENTS, mockValue);
    expect(getters.ingredients(state)).toStrictEqual(mockValue);
  });

  test("sauces", () => {
    state = factory(Entity.SAUCES, mockValue);
    expect(getters.sauces(state)).toStrictEqual(mockValue);
  });

  test("sizes", () => {
    state = factory(Entity.SIZES, mockValue);
    expect(getters.sizes(state)).toStrictEqual(mockValue);
  });

  test("addedIngredients", () => {
    const data = [
      { id: 1, count: 0 },
      { id: 2, count: 1 },
      { id: 3, count: null },
    ];

    state = factory(Entity.INGREDIENTS, data);
    expect(getters.addedIngredients(state)).toStrictEqual([
      { id: 2, count: 1 },
    ]);
  });

  test("addedIngredients if count 0", () => {
    const data = [{ id: 1 }];
    state = factory(Entity.INGREDIENTS, data);
    state[Entity.INGREDIENTS].filter = jest.fn(() => null);

    expect(getters.addedIngredients(state)).toStrictEqual([]);
  });

  test("ingredientsPrice", () => {
    getters.addedIngredients = mockValue;
    const state = jest.fn();

    expect(getters.ingredientsPrice(state, getters)).toBe(100);
  });

  test("pizzaPrice", () => {
    getters.ingredientsPrice = 100;
    const state = {
      [Entity.CURRENT_DOUGH]: { price: 10 },
      [Entity.CURRENT_SAUCE]: { price: 20 },
      [Entity.CURRENT_SIZE]: { multiplier: 1 },
    };

    expect(getters.pizzaPrice(state, getters)).toBe(1000);
  });

  test("pizza", () => {
    getters.pizzaPrice = 1000;
    getters.addedIngredients = mockValue;

    const state = {
      [Entity.PIZZA_ID]: 1,
      [Entity.PIZZA_NAME]: "my pizza",
      [Entity.CURRENT_DOUGH]: { id: 1 },
      [Entity.CURRENT_SAUCE]: { id: 11 },
      [Entity.CURRENT_SIZE]: { multiplier: 1 },
      [Entity.PIZZA_COUNT]: 1,
    };

    expect(getters.pizza(state, getters)).toStrictEqual({
      id: 1,
      name: "my pizza",
      dough: { id: 1 },
      ingredients: mockValue,
      sauce: { id: 11 },
      size: { multiplier: 1 },
      price: 1000,
      count: 1,
    });
  });
});
