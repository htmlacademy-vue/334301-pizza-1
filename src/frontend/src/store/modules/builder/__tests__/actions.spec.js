import actions from "../actions";
import { enableAutoDestroy } from "@vue/test-utils";
import { Entity } from "../const";
jest.mock("../../../../common/utils/helpers/normalize", () => ({
  normalizeSize: jest.fn(() => ({ norm: true })),
  normalizeDough: jest.fn(() => ({ norm: true })),
  normalizeIngredient: (item) => ({ id: item.id, norm: true }),
}));

enableAutoDestroy(afterEach);

const mockValue = [{ id: 1 }, { id: 2 }];
actions.$api = { fetchData: { get: jest.fn(() => mockValue) } };

describe("store.modules.builder.actions loadData", () => {
  let commit;
  let dispatch;
  beforeEach(() => {
    commit = jest.fn();
    dispatch = jest.fn();
  });

  test("dispatch был вызван 4 раза", async () => {
    await actions.loadData({ dispatch, commit });
    expect(dispatch.mock.calls.length).toBe(4);
  });

  test("dispatch был вызван с нужными аргументами", async () => {
    await actions.loadData({ dispatch, commit });
    const [call1, call2, call3, call4] = dispatch.mock.calls;

    expect(call1[0]).toBe("loadDough");
    expect(call2[0]).toBe("loadSizes");
    expect(call3[0]).toBe("loadSauces");
    expect(call4[0]).toBe("loadedIngredients");
  });

  test("commit был вызван", async () => {
    await actions.loadData({ dispatch, commit });
    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      { entity: "isDataLoaded", module: "builder", value: true },
      { root: true }
    );
  });
});

describe("store.modules.builder.actions loadedIngredients", () => {
  const commit = jest.fn();

  test("commit был вызван", async () => {
    await actions.loadedIngredients({ commit });
    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      {
        entity: "loadedIngredients",
        module: "builder",
        value: mockValue,
      },
      { root: true }
    );
  });
});

describe("store.modules.builder.actions loadSizes", () => {
  const commit = jest.fn();

  test("commit был вызван", async () => {
    await actions.loadSizes({ commit });
    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      {
        entity: "sizes",
        module: "builder",
        value: [{ norm: true }, { norm: true }],
      },
      { root: true }
    );
  });
});

describe("store.modules.builder.actions loadSauces", () => {
  const commit = jest.fn();

  test("commit был вызван", async () => {
    await actions.loadSauces({ commit });
    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      {
        entity: "sauces",
        module: "builder",
        value: mockValue,
      },
      { root: true }
    );
  });
});

describe("store.modules.builder.actions loadDough", () => {
  const commit = jest.fn();

  test("commit был вызван", async () => {
    await actions.loadDough({ commit });
    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      {
        entity: "doughs",
        module: "builder",
        value: [{ norm: true }, { norm: true }],
      },
      { root: true }
    );
  });
});

describe("store.modules.builder.actions init", () => {
  let dispatch;

  const state = {
    [Entity.PIZZA_ID]: 1,
    [Entity.PIZZA_NAME]: "my pizza",
    [Entity.CURRENT_DOUGH]: { id: 1 },
    [Entity.CURRENT_SAUCE]: { id: 11 },
    [Entity.CURRENT_SIZE]: { multiplier: 1 },
    [Entity.PIZZA_COUNT]: 1,
    [Entity.DOUGHS]: mockValue,
    [Entity.LOADED_INGREDIENTS]: mockValue,
    [Entity.SAUCES]: mockValue,
    [Entity.SIZES]: mockValue,
  };

  test("dispatch был вызван 8 раз, если нет pizza", async () => {
    dispatch = jest.fn();
    await actions.init({ state, dispatch });
    expect(dispatch.mock.calls.length).toBe(8);
  });

  test("dispatch был вызван 8 раз", async () => {
    dispatch = jest.fn();
    const pizza = {
      id: 1,
      name: "pizza",
      dough: { id: 1 },
      sauce: { id: 1 },
      size: { id: 1 },
      count: { id: 1 },
      ingredients: [mockValue[0]],
    };
    await actions.init({ state, dispatch }, pizza);
    expect(dispatch.mock.calls.length).toBe(8);
  });

  test("Увеличивает ingredient.count", async () => {
    dispatch = jest.fn();
    const pizza = {
      id: 1,
      name: "pizza",
      dough: { id: 1 },
      sauce: { id: 1 },
      size: { id: 1 },
      count: { id: 1 },
      ingredients: [{ id: 1, count: 2 }],
    };
    await actions.init({ state, dispatch }, pizza);
    expect(dispatch.mock.calls[1][1]).toStrictEqual({
      entity: "ingredients",
      value: [
        { count: 2, id: 1, norm: true },
        { id: 2, norm: true },
      ],
    });
  });
});

describe("store.modules.builder.actions setEntity", () => {
  const commit = jest.fn();
  const data = { entity: Entity.CURRENT_DOUGH, value: { id: 1 } };

  test("commit был вызван", async () => {
    await actions.setEntity({ commit }, data);
    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      {
        entity: "currentDough",
        module: "builder",
        value: { id: 1 },
      },
      { root: true }
    );
  });
});

describe("store.modules.builder.actions set", () => {
  const stateFactory = (entity, value) => ({
    [entity]: value,
  });
  const mockValues = [
    { id: 1, name: "name 1" },
    { id: 2, name: "name 2" },
  ];
  let dispatch;
  let state;
  beforeEach(() => {
    dispatch = jest.fn();
  });

  test("setDough", async () => {
    state = stateFactory("doughs", mockValues);
    await actions.setDough({ state, dispatch }, "name 2");

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][1]).toStrictEqual({
      entity: "currentDough",
      value: mockValues[1],
    });
  });

  test("setSauce", async () => {
    state = stateFactory("sauces", mockValues);
    await actions.setSauce({ state, dispatch }, "name 1");

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][1]).toStrictEqual({
      entity: "currentSauce",
      value: mockValues[0],
    });
  });

  test("setSize", async () => {
    state = stateFactory("sizes", mockValues);
    await actions.setSize({ state, dispatch }, "name 2");

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][1]).toStrictEqual({
      entity: "currentSize",
      value: mockValues[1],
    });
  });

  test("setName", async () => {
    await actions.setName({ dispatch }, "My pizza");

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][1]).toStrictEqual({
      entity: "pizzaName",
      value: "My pizza",
    });
  });
});

describe("store.modules.builder.actions setIngredient", () => {
  let commit;

  const state = {
    [Entity.INGREDIENTS]: mockValue,
  };

  beforeEach(() => {
    commit = jest.fn();
  });

  test("Должен прекратить выполнение", async () => {
    const mockFind = jest.fn();
    state[Entity.INGREDIENTS].find = mockFind;

    await actions.setIngredient(
      { state, commit },
      { ingredientId: 1, count: 10 }
    );

    expect(mockFind).not.toHaveBeenCalled();

    delete state[Entity.INGREDIENTS].find;
  });

  test("Должен вызвать commit", async () => {
    await actions.setIngredient(
      { state, commit },
      { ingredientId: 1, count: 2 }
    );

    expect(commit).toHaveBeenCalledWith(
      "UPDATE_ENTITY",
      { entity: "ingredients", module: "builder", value: { count: 2, id: 1 } },
      { root: true }
    );
  });

  test("Не должен вызвать commit", async () => {
    await actions.setIngredient(
      { state, commit },
      { ingredientId: 100, count: 2 }
    );

    expect(commit).not.toHaveBeenCalled();
  });
});
