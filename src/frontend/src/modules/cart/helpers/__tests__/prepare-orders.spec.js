import { prepareOrder } from "../prepare-order";
import { mockPizza1, mockAdditional } from "../../../../static/mocks";

const factoryStore = (additional, userId = null) => {
  const user = userId ? { id: userId } : null;
  return {
    getters: {
      "cart/getItems": [mockPizza1],
      "cart/getAdditional": additional,
      "auth/getUser": user,
    },
  };
};

describe("modules/cart/helpers prepareOrder", () => {
  test("ордер без пользователя", () => {
    const store = factoryStore(mockAdditional);
    const order = prepareOrder(store);

    expect(order).toStrictEqual({
      pizzas: [
        {
          doughId: 1,
          ingredients: [{ ingredientId: 1, quantity: 1 }],
          name: "Pizza",
          quantity: 2,
          sauceId: 1,
          sizeId: 1,
        },
      ],
      misc: [
        { miscId: 1, quantity: 1 },
        { miscId: 3, quantity: 2 },
      ],
      userId: null,
    });
  });

  test("ордер с пользователем", () => {
    const additional = [mockAdditional[0]];
    const store = factoryStore(additional, 1);
    const order = prepareOrder(store);

    expect(order).toStrictEqual({
      pizzas: [
        {
          doughId: 1,
          ingredients: [{ ingredientId: 1, quantity: 1 }],
          name: "Pizza",
          quantity: 2,
          sauceId: 1,
          sizeId: 1,
        },
      ],
      misc: [{ miscId: 1, quantity: 1 }],
      userId: 1,
    });
  });
});
