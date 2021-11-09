import actions from "../actions";
import { enableAutoDestroy } from "@vue/test-utils";
import { factory, mockValue } from "../mocks";
import { Entity } from "../const";
jest.mock("../../../../common/utils/helpers/normalize", () => ({
  normalizeAdditional: () => ({ norm: true }),
}));
jest.mock("lodash", () => ({
  uniqueId: () => 100,
}));

enableAutoDestroy(afterEach);

actions.$api = {
  fetchData: { get: jest.fn(() => ({ value: "test" })) },
};

describe("store.modules.cart.actions", () => {
  let commit;
  let state;

  beforeEach(() => {
    commit = jest.fn();
  });

  test("loadData", async () => {
    await actions.loadData({ commit });

    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      { entity: "loadedAdditional", module: "cart", value: { value: "test" } },
      { root: true }
    );
  });

  test("init", async () => {
    state = factory(Entity.LOADED_ADDITIONAL, mockValue);
    await actions.init({ commit, state });

    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      {
        entity: "additional",
        module: "cart",
        value: [{ norm: true }, { norm: true }],
      },
      { root: true }
    );
  });

  test("update", async () => {
    await actions.update({ commit }, { item: { id: 1 }, entity: "items" });

    expect(commit).toHaveBeenCalledWith(
      "UPDATE_ENTITY",
      { module: "cart", entity: "items", value: { id: 1 } },
      { root: true }
    );
  });

  test("delete", async () => {
    await actions.delete({ commit }, { id: 1, entity: "items" });

    expect(commit).toHaveBeenCalledWith(
      "DELETE_ENTITY",
      { module: "cart", entity: "items", id: 1 },
      { root: true }
    );
  });
});

describe("store.modules.cart.actions addPizza", () => {
  let commit;
  let state;

  beforeEach(() => {
    commit = jest.fn();
  });

  test("addPizza вызывает commit update, если orderPizza = null", async () => {
    state = factory(Entity.ITEMS, mockValue);
    const rootGetters = {
      "builder/pizza": { id: 1 },
    };
    await actions.addPizza({ commit, state, rootGetters });

    expect(commit).toHaveBeenCalledWith(
      "UPDATE_ENTITY",
      {
        entity: "items",
        itemIndex: 0,
        module: "cart",
        value: { id: 1 },
      },
      { root: true }
    );
  });

  test("addPizza вызывает commit update, если orderPizza", async () => {
    state = factory(Entity.ITEMS, mockValue);
    const rootGetters = {
      "builder/pizza": jest.fn(),
    };
    await actions.addPizza({ commit, state, rootGetters }, { id: 1 });

    expect(commit).toHaveBeenCalledWith(
      "UPDATE_ENTITY",
      {
        entity: "items",
        itemIndex: 0,
        module: "cart",
        value: { id: 1 },
      },
      { root: true }
    );
    expect(rootGetters["builder/pizza"]).not.toHaveBeenCalled();
  });

  test("addPizza вызывает commit add", async () => {
    state = factory(Entity.ITEMS, mockValue);
    const rootGetters = {
      "builder/pizza": jest.fn(),
    };
    await actions.addPizza({ commit, state, rootGetters }, { name: "pizza" });

    expect(commit).toHaveBeenCalledWith(
      "ADD_ENTITY",
      {
        entity: "items",
        module: "cart",
        value: { id: 100, name: "pizza" },
      },
      { root: true }
    );
    expect(rootGetters["builder/pizza"]).not.toHaveBeenCalled();
  });
});

describe("store.modules.cart.actions setAdditional", () => {
  let commit;
  let state;

  beforeEach(() => {
    commit = jest.fn();
  });

  test(" вызывает commit add с count 2", async () => {
    state = factory(Entity.ADDITIONAL, mockValue);
    const additional = [{ id: 1, count: 2 }];

    await actions.setAdditional({ commit, state }, additional);

    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      {
        entity: "additional",
        module: "cart",
        value: [
          { id: 1, count: 2, value: 1 },
          { id: 2, count: 0 },
        ],
      },
      { root: true }
    );
  });

  test(" вызывает commit add", async () => {
    state = factory(Entity.ADDITIONAL, mockValue);
    const additional = [{ id: 100, count: 2 }];

    await actions.setAdditional({ commit, state }, additional);

    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      {
        entity: "additional",
        module: "cart",
        value: [
          { id: 1, count: 0, value: 1 },
          { id: 2, count: 0 },
        ],
      },
      { root: true }
    );
  });
});

describe("store.modules.cart.actions dispatch", () => {
  let dispatch;
  let state;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  test("changePizza", async () => {
    state = factory(Entity.ITEMS, mockValue);
    await actions.changePizza({ state, dispatch }, 1);

    expect(dispatch).toHaveBeenCalledWith(
      "builder/init",
      { id: 1, value: 1 },
      { root: true }
    );
  });

  test("incrementItems", async () => {
    await actions.incrementItems({ dispatch }, 1);

    expect(dispatch).toHaveBeenCalledWith("increment", {
      id: 1,
      entity: "items",
    });
  });

  test("decrementItems, должен вызвать delete if item.count == 1", async () => {
    const mock = [
      { id: 1, count: 1 },
      { id: 2, count: 3 },
    ];
    state = factory(Entity.ITEMS, mock);
    await actions.decrementItems({ state, dispatch }, 1);

    expect(dispatch).toHaveBeenCalledWith("delete", {
      id: 1,
      entity: "items",
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test("decrementItems, должен вызвать update if item.count != 1", async () => {
    const mock = [
      { id: 1, count: 1 },
      { id: 2, count: 3 },
    ];
    state = factory(Entity.ITEMS, mock);
    await actions.decrementItems({ state, dispatch }, 2);

    expect(dispatch).toHaveBeenCalledWith("update", {
      item: { id: 2, count: 2 },
      entity: "items",
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test("changeItemsCount, должен вызвать delete if item.count == 0", async () => {
    const mock = [
      { id: 1, count: 2 },
      { id: 2, count: 3 },
    ];
    state = factory(Entity.ITEMS, mock);
    await actions.changeItemsCount({ state, dispatch }, { id: 1, count: 0 });

    expect(dispatch).toHaveBeenCalledWith("delete", {
      id: 1,
      entity: "items",
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test("changeItemsCount, должен вызвать update if item.count > 0", async () => {
    const mock = [
      { id: 1, count: 2 },
      { id: 2, count: 3 },
    ];
    state = factory(Entity.ITEMS, mock);
    await actions.changeItemsCount({ state, dispatch }, { id: 1, count: 1 });

    expect(dispatch).toHaveBeenCalledWith("update", {
      item: { id: 1, count: 1 },
      entity: "items",
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test("incrementAdditional", async () => {
    await actions.incrementAdditional({ dispatch }, 1);

    expect(dispatch).toHaveBeenCalledWith("increment", {
      id: 1,
      entity: "additional",
    });
  });

  test("decrementAdditional не вызывает dispatch", async () => {
    const mock = [
      { id: 1, count: 0 },
      { id: 2, count: 3 },
    ];
    state = factory(Entity.ADDITIONAL, mock);
    await actions.decrementAdditional({ state, dispatch }, 1);

    expect(dispatch).not.toHaveBeenCalled();
  });

  test("decrementAdditional return undefined", async () => {
    const mock = [
      { id: 1, count: 1 },
      { id: 2, count: 3 },
    ];
    state = factory(Entity.ADDITIONAL, mock);
    const returnedValue = await actions.decrementAdditional(
      { state, dispatch },
      3
    );

    expect(returnedValue).toBeUndefined();
    expect(dispatch).not.toHaveBeenCalled();
  });

  test("decrementAdditional вызывает dispatch", async () => {
    const mock = [
      { id: 1, count: 1 },
      { id: 2, count: 3 },
    ];
    state = factory(Entity.ADDITIONAL, mock);
    await actions.decrementAdditional({ state, dispatch }, 2);

    expect(dispatch).toHaveBeenCalledWith("update", {
      item: { id: 2, count: 2 },
      entity: "additional",
    });
  });

  test("changeCountAdditional вызывает dispatch c count 0", async () => {
    const mock = [
      { id: 1, count: 0 },
      { id: 2, count: 3 },
    ];
    state = factory(Entity.ADDITIONAL, mock);
    await actions.changeCountAdditional(
      { state, dispatch },
      { id: 1, count: "0" }
    );

    expect(dispatch).toHaveBeenCalledWith("update", {
      item: { id: 1, count: 0 },
      entity: "additional",
    });
  });

  test("changeCountAdditional вызывает dispatch c count 1", async () => {
    const mock = [
      { id: 1, count: 1 },
      { id: 2, count: 3 },
    ];
    state = factory(Entity.ADDITIONAL, mock);
    await actions.changeCountAdditional(
      { state, dispatch },
      { id: 1, count: "1" }
    );

    expect(dispatch).toHaveBeenCalledWith("update", {
      item: { id: 1, count: 1 },
      entity: "additional",
    });
  });

  test("changeCountAdditional вызывает dispatch c count 3", async () => {
    const mock = [
      { id: 1, count: 1 },
      { id: 2, count: 3 },
    ];
    state = factory(Entity.ADDITIONAL, mock);
    await actions.changeCountAdditional(
      { state, dispatch },
      { id: 1, count: "3" }
    );

    expect(dispatch).toHaveBeenCalledWith("update", {
      item: { id: 1, count: 3 },
      entity: "additional",
    });
  });

  test("increment вызывает dispatch c count++", async () => {
    const mock = [
      { id: 1, count: 1 },
      { id: 2, count: 3 },
    ];
    state = factory(Entity.ADDITIONAL, mock);
    await actions.increment(
      { state, dispatch },
      { id: 1, entity: "additional" }
    );

    expect(dispatch).toHaveBeenCalledWith("update", {
      item: { id: 1, count: 2 },
      entity: "additional",
    });
  });

  test("clearCart вызывает commit, dispatch", async () => {
    const commit = jest.fn();
    await actions.clearCart({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      { module: "cart", entity: "items", value: [] },
      { root: true }
    );

    expect(dispatch).toHaveBeenCalledWith("init");
  });
});
