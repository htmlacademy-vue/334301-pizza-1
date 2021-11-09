import misc from "../../../../static/misc.json";
import pizza from "../../../../static/pizza.json";
import { prepareAdditional, preparePizza } from "../prepare-order-data";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSize,
} from "../normalize";
import { mockPizza1, mockPizza2 } from "../../../../static/mocks";

describe("Тест prepareAdditional()", () => {
  test("Тест 1. Должен вернуть { additional: [], additionalPrice; 0 }", async () => {
    const loadedAdditional = [...misc];
    const prepared = await prepareAdditional(loadedAdditional, null);

    expect(prepared).toStrictEqual({
      additional: [],
      additionalPrice: 0,
    });
  });

  test("Тест 2. Должен вернуть { additional: [], additionalPrice; 0 }", async () => {
    const loadedAdditional = [];
    const prepared = await prepareAdditional(loadedAdditional, null);

    expect(prepared).toStrictEqual({
      additional: [],
      additionalPrice: 0,
    });
  });

  test("Должен вернуть { additional: [{obj}], additionalPrice: 112 }", async () => {
    const loadedAdditional = [...misc];
    const orderMisc = [
      {
        miscId: 1,
        quantity: 2,
      },
    ];
    const prepared = await prepareAdditional(loadedAdditional, orderMisc);

    expect(prepared).toStrictEqual({
      additional: [
        {
          count: 2,
          id: 1,
          name: "Cola-Cola 0,5 литра",
          image: "/public/img/cola.svg",
          price: 56,
        },
      ],
      additionalPrice: 112,
    });
  });

  test("Должен вернуть { additional: [{obj}, {obj}], additionalPrice: 396 }", async () => {
    const loadedAdditional = [...misc];
    const orderMisc = [
      {
        miscId: 1,
        quantity: 1,
      },
      {
        miscId: 3,
        quantity: 2,
      },
    ];
    const prepared = await prepareAdditional(loadedAdditional, orderMisc);

    expect(prepared).toStrictEqual({
      additional: [
        {
          count: 1,
          id: 1,
          name: "Cola-Cola 0,5 литра",
          image: "/public/img/cola.svg",
          price: 56,
        },
        {
          count: 2,
          id: 3,
          name: "Картошка из печи",
          image: "/public/img/potato.svg",
          price: 170,
        },
      ],
      additionalPrice: 396,
    });
  });
});

describe("Тест preparePizza()", () => {
  const sauces = [...pizza.sauces];
  const dough = pizza.dough.map((item) => normalizeDough(item));
  const sizes = pizza.sizes.map((item) => normalizeSize(item));
  const ingredients = pizza.ingredients.map((item) =>
    normalizeIngredient(item)
  );

  test("Должен вернуть пиццу {name: 'Pizza', price: 383}", async () => {
    const orderPizza = {
      name: "Pizza",
      sauceId: 1,
      doughId: 1,
      sizeId: 1,
      quantity: 2,
      ingredients: [
        {
          ingredientId: 1,
          quantity: 1,
        },
      ],
    };

    const prepared = await preparePizza(
      orderPizza,
      sauces,
      dough,
      sizes,
      ingredients
    );
    expect(prepared).toStrictEqual(mockPizza1);
  });

  test("Должен вернуть пиццу {name: 'Pizza 2', price: 467}", async () => {
    const orderPizza = {
      name: "Pizza 2",
      sauceId: 1,
      doughId: 1,
      sizeId: 1,
      quantity: 1,
      ingredients: [
        {
          ingredientId: 1,
          quantity: 1,
        },
        {
          ingredientId: 2,
          quantity: 2,
        },
      ],
    };

    const prepared = await preparePizza(
      orderPizza,
      sauces,
      dough,
      sizes,
      ingredients
    );
    expect(prepared).toStrictEqual(mockPizza2);
  });
});
