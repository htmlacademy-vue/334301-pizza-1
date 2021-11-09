import actions from "../actions";
import { enableAutoDestroy } from "@vue/test-utils";
jest.mock("../../../../common/utils/helpers/prepare-order-data", () => ({
  prepareAdditional: () => ({
    additional: [{ id: 100, count: 1 }],
    additionalPrice: 100,
  }),
  preparePizza: () => ({ price: 1000, count: 2 }),
}));

enableAutoDestroy(afterEach);

const getters = {
  getOrders: [
    {
      id: 1,
      additional: [{ id: 1 }, { id: 2 }],
      pizzas: [{ id: 3 }, { id: 4 }],
      address: { id: 5 },
    },
    {
      id: 2,
      additional: [{ id: 10 }, { id: 20 }],
      pizzas: [{ id: 30 }, { id: 40 }],
    },
    {
      id: 3,
      pizzas: [{ id: 30 }, { id: 40 }],
      address: { id: 5 },
    },
  ],
};

describe("store.modules.orders.actions", () => {
  let commit;

  beforeEach(() => (commit = jest.fn()));

  test("setAddress", () => {
    actions.setAddress({ commit }, { id: 1, name: "my address" });
    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      {
        module: "orders",
        entity: "address",
        value: { id: 1, name: "my address" },
      },
      { root: true }
    );
  });

  test("clearAddress", () => {
    actions.clearAddress({ commit });
    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      {
        module: "orders",
        entity: "address",
        value: null,
      },
      { root: true }
    );
  });
});

describe("store.modules.orders.actions loadOrderToCart", () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  test("Вызывает dispatch 4 раза", () => {
    actions.loadOrderToCart({ getters, dispatch }, 1);

    expect(dispatch).toHaveBeenCalledTimes(4);
  });

  test("Вызывает dispatch cart/addPizza 2 раза", () => {
    actions.loadOrderToCart({ getters, dispatch }, 1);

    expect(dispatch.mock.calls[0][0]).toStrictEqual("cart/addPizza");
    expect(dispatch.mock.calls[0][1]).toStrictEqual({ id: 3 });

    expect(dispatch.mock.calls[0][0]).toStrictEqual("cart/addPizza");
    expect(dispatch.mock.calls[1][1]).toStrictEqual({ id: 4 });
  });

  test("Вызывает dispatch cart/setAdditional", () => {
    actions.loadOrderToCart({ getters, dispatch }, 2);
    expect(dispatch).toHaveBeenCalledWith(
      "cart/setAdditional",
      [{ id: 10 }, { id: 20 }],
      { root: true }
    );
  });

  test("Вызывает dispatch setAddress", () => {
    actions.loadOrderToCart({ getters, dispatch }, 3);
    expect(dispatch).toHaveBeenCalledWith("setAddress", { id: 5 });
  });
});

describe("store.modules.orders.actions removeOrder", () => {
  let commit;
  let getters;

  const $notifier = {
    success: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(() => {
    commit = jest.fn();
    getters = {
      getOrders: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };
    actions.$notifier = $notifier;
  });

  afterEach(() => {
    delete actions.$api;
    delete actions.$notifier;
  });

  test("Вызывает $api.delete", async () => {
    const apiDelete = jest.fn();
    actions.$api = {
      orders: {
        delete: apiDelete,
      },
    };

    await actions.removeOrder({ commit, getters }, 1);
    expect(apiDelete).toHaveBeenCalledWith(1);
  });

  test("Вызывает $notifier.success", async () => {
    actions.$api = {
      orders: {
        delete: jest.fn(),
      },
    };

    await actions.removeOrder({ commit, getters }, 1);
    expect($notifier.success).toHaveBeenCalledWith("Заказ удалён");
  });

  test("Вызывает commit", async () => {
    actions.$api = {
      orders: {
        delete: jest.fn(),
      },
    };

    await actions.removeOrder({ commit, getters }, 1);
    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      {
        module: "orders",
        entity: "orders",
        value: [{ id: 2 }, { id: 3 }],
      },
      { root: true }
    );
  });

  test("Обрабатывает исключение $notifier.error", async () => {
    const apiDelete = jest.fn().mockRejectedValue(new Error("Api Error"));
    actions.$api = {
      orders: {
        delete: apiDelete,
      },
    };

    await actions.removeOrder({ commit, getters }, 1);
    expect($notifier.error).toHaveBeenCalledWith(
      "Возникла ошибка при выполнении запроса к серверу"
    );
  });
});

describe("store.modules.orders.actions loadOrders", () => {
  let commit;
  const apiGet = jest.fn(() => [
    {
      id: 1,
      orderPizzas: [{ name: "pizza 1" }],
      orderAddress: { name: "my address 1" },
      orderMisc: [{ id: 100 }],
    },
  ]);

  const rootGetters = jest.fn();

  beforeEach(() => {
    commit = jest.fn();
    actions.$api = { orders: { get: apiGet } };
  });

  afterEach(() => {
    delete actions.$api;
  });

  test("Вызывает $api.get", async () => {
    await actions.loadOrders({ commit, rootGetters });
    expect(apiGet).toHaveBeenCalled();
  });

  test("Вызывает commit", async () => {
    await actions.loadOrders({ commit, rootGetters });
    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      {
        module: "orders",
        entity: ["orders"],
        value: [
          {
            additional: [
              {
                count: 1,
                id: 100,
              },
            ],
            address: {
              name: "my address 1",
            },
            id: 1,
            pizzas: [
              {
                count: 2,
                price: 1000,
              },
            ],
            price: 2100,
          },
        ],
      },
      { root: true }
    );
  });
});

/*
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
 */
