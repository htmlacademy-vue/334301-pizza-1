import mutations from "../mutations";
import notificationTypes from "../../common/enums/notifications";
import {
  SET_ENTITY,
  ADD_ENTITY,
  DELETE_ENTITY,
  UPDATE_ENTITY,
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "../mutation-types";

const notification = {
  id: 1,
  text: "test notification",
  type: notificationTypes.INFO,
};

describe("Тест mutations notification", () => {
  test("Добавить notification", () => {
    const state = {
      notifications: [],
    };

    mutations[ADD_NOTIFICATION](state, notification);

    expect(state).toStrictEqual({ notifications: [notification] });
  });

  test("Удалить notification", () => {
    const state = {
      notifications: [notification],
    };

    mutations[DELETE_NOTIFICATION](state, 1);

    expect(state).toStrictEqual({ notifications: [] });
  });
});

describe("Тест mutations SET_ENTITY", () => {
  test("Установить в модуль", () => {
    const state = {
      cart: {
        item: null,
      },
    };

    mutations[SET_ENTITY](state, {
      module: "cart",
      entity: "item",
      value: { id: 1 },
    });

    expect(state.cart.item).toStrictEqual({ id: 1 });
  });

  test("Установить в state", () => {
    const state = {
      item: null,
    };

    mutations[SET_ENTITY](state, {
      entity: "item",
      value: { id: 1 },
    });

    expect(state.item).toStrictEqual({ id: 1 });
  });
});

describe("Тест mutations ADD_ENTITY", () => {
  test("Добавить в модуль", () => {
    const state = {
      cart: {
        items: [{ id: 1 }],
      },
    };

    mutations[ADD_ENTITY](state, {
      module: "cart",
      entity: "items",
      value: { id: 2 },
    });

    expect(state.cart.items).toStrictEqual([{ id: 1 }, { id: 2 }]);
  });

  test("Добавить в state", () => {
    const state = {
      items: [{ id: 1 }],
    };

    mutations[ADD_ENTITY](state, {
      entity: "items",
      value: { id: 2 },
    });

    expect(state.items).toStrictEqual([{ id: 1 }, { id: 2 }]);
  });
});

describe("Тест mutations DELETE_ENTITY", () => {
  test("Удалить из модуля", () => {
    const state = {
      cart: {
        items: [{ id: 1 }, { id: 2 }],
      },
    };

    mutations[DELETE_ENTITY](state, {
      module: "cart",
      entity: "items",
      id: 2,
    });

    expect(state.cart.items).toStrictEqual([{ id: 1 }]);
  });

  test("Удалить в state", () => {
    const state = {
      items: [{ id: 1 }],
    };

    mutations[DELETE_ENTITY](state, {
      entity: "items",
      id: 1,
    });

    expect(state.items).toStrictEqual([]);
  });
});

/*
  [UPDATE_ENTITY](state, { module, entity, value, itemIndex = null }) {
    if (module) {
      if (itemIndex) {
        state[module][entity].splice(itemIndex, 1, value);
        return;
      }
      const index = state[module][entity].findIndex(
        ({ id }) => id === value.id
      );
      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    } else {
      if (itemIndex) {
        state[entity].splice(itemIndex, 1, value);
        return;
      }
      const index = state[entity].findIndex(({ id }) => id === value.id);
      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },
 */

describe("Тест mutations UPDATE_ENTITY", () => {
  test("Обновить в модуле (без itemIndex)", () => {
    const state = {
      cart: {
        items: [{ id: 1, name: "pizza 1" }],
      },
    };

    mutations[UPDATE_ENTITY](state, {
      module: "cart",
      entity: "items",
      value: { id: 1, name: "pizza 2" },
    });

    expect(state.cart.items).toStrictEqual([{ id: 1, name: "pizza 2" }]);
  });

  test("Обновить в модуле (с itemIndex)", () => {
    const state = {
      cart: {
        items: [
          { id: 1, name: "pizza 1" },
          { id: 2, name: "pizza 2" },
        ],
      },
    };

    mutations[UPDATE_ENTITY](state, {
      module: "cart",
      entity: "items",
      value: { id: 3, name: "pizza updated" },
      itemIndex: 1,
    });

    expect(state.cart.items).toStrictEqual([
      { id: 1, name: "pizza 1" },
      { id: 3, name: "pizza updated" },
    ]);
  });

  test("Обновить в state (без itemIndex)", () => {
    const state = {
      items: [{ id: 1, name: "pizza 1" }],
    };

    mutations[UPDATE_ENTITY](state, {
      entity: "items",
      value: { id: 1, name: "pizza 2" },
    });

    expect(state.items).toStrictEqual([{ id: 1, name: "pizza 2" }]);
  });

  test("Обновить в state (с itemIndex)", () => {
    const state = {
      items: [
        { id: 1, name: "pizza 1" },
        { id: 2, name: "pizza 2" },
      ],
    };

    mutations[UPDATE_ENTITY](state, {
      entity: "items",
      value: { id: 3, name: "pizza updated", price: 100 },
      itemIndex: 1,
    });

    expect(state.items).toStrictEqual([
      { id: 1, name: "pizza 1" },
      { id: 3, name: "pizza updated", price: 100 },
    ]);
  });
});
