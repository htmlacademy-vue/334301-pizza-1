import {
  calculatePizzaPrice,
  calculatePrice,
  calculateIngredientsPrice,
} from "../calculate";

const ingredients = [
  { price: 6, count: 1 },
  { price: 5, count: 1 },
  { price: 9, count: 1 },
];

describe("Тест calculatePrice()", () => {
  test("Должен вернуть 6", () => {
    const price = calculatePrice(2, 2, 2, 1);
    expect(price).toBe(6);
  });

  test("Должен вернуть 180", () => {
    const price = calculatePrice(10, 20, 60, 2);
    expect(price).toBe(180);
  });

  test("Должен вернуть 0", () => {
    const price = calculatePrice(2, 2, 2, 0);
    expect(price).toBe(0);
  });
});

describe("Тест calculateIngredientsPrice()", () => {
  test("Должен вернуть 20", () => {
    const ingredientsPrice = calculateIngredientsPrice(ingredients);
    expect(ingredientsPrice).toBe(20);
  });

  test("Должен вернуть 40", () => {
    const items = ingredients.map((item) => ({ ...item, count: 2 }));
    const ingredientsPrice = calculateIngredientsPrice(items);
    expect(ingredientsPrice).toBe(40);
  });

  test("Должен вернуть 0", () => {
    const items = ingredients.map((item) => ({ ...item, count: 0 }));
    const ingredientsPrice = calculateIngredientsPrice(items);
    expect(ingredientsPrice).toBe(0);
  });
});

describe("Тест calculatePizzaPrice()", () => {
  const pizza = {
    dough: { price: 10 },
    sauce: { price: 10 },
    size: { multiplier: 2 },
    ingredients,
  };

  test("Должен вернуть 80", () => {
    const ingredientsPrice = calculatePizzaPrice(pizza);
    expect(ingredientsPrice).toBe(80);
  });

  test("Должен вернуть 120", () => {
    const items = ingredients.map((item) => ({ ...item, count: 2 }));
    const pizza = {
      dough: { price: 10 },
      sauce: { price: 10 },
      size: { multiplier: 2 },
      ingredients: items,
    };

    const ingredientsPrice = calculatePizzaPrice(pizza);
    expect(ingredientsPrice).toBe(120);
  });
});
