import {
  normalizeAdditional,
  normalizeDough,
  normalizeIngredient,
  normalizeSize,
} from "../normalize";

describe("Тест normalizeIngredient()", () => {
  test("Тест 1. Ингредиент соответствует заданному", () => {
    const ingredient = {
      id: 1,
      name: "Грибы",
      image: "/public/img/filling/mushrooms.svg",
      price: 33,
    };
    const normalizedIngredient = normalizeIngredient(ingredient);

    expect(normalizedIngredient).toStrictEqual({
      id: 1,
      name: "Грибы",
      image: "/public/img/filling/mushrooms.svg",
      price: 33,
      count: 0,
      class: "filling--mushrooms",
    });
  });

  test("Тест 2. Ингредиент соответствует заданному", () => {
    const ingredient = {
      name: "Блю чиз",
      image: "/public/img/filling/blue_cheese.svg",
    };
    const normalizedIngredient = normalizeIngredient(ingredient);

    expect(normalizedIngredient).toStrictEqual({
      name: "Блю чиз",
      image: "/public/img/filling/blue_cheese.svg",
      count: 0,
      class: "filling--blue_cheese",
    });
  });
});

describe("Тест normalizeAdditional()", () => {
  test("Тест1. Продукт имеет свойство count=1", () => {
    const product = {};
    const normalizedProduct = normalizeAdditional(product);
    expect(normalizedProduct).toHaveProperty("count", 1);
  });

  test("Тест2. Продукт соответствует заданному", () => {
    const product = { price: 20, name: "product" };
    const normalizedProduct = normalizeAdditional(product);
    expect(normalizedProduct).toStrictEqual({
      price: 20,
      name: "product",
      count: 1,
    });
  });
});

describe("Тест normalizeDough", () => {
  test('Тест 1. class должен быть "dough__input dough__input--large"', () => {
    const dough = {
      name: "Толстое",
    };
    const normalizedDough = normalizeDough(dough);
    expect(normalizedDough).toHaveProperty(
      "class",
      "dough__input dough__input--large"
    );
  });

  test("Тест 2. Тесто соответствует заданному", () => {
    const dough = {
      name: "Тонкое",
    };
    const normalizedDough = normalizeDough(dough);
    expect(normalizedDough).toStrictEqual({
      name: "Тонкое",
      class: "dough__input dough__input--light",
    });
  });
});

describe("Тест normalizeSize", () => {
  test('Должен иметь свойство class "diameter__input diameter__input--small"', () => {
    const size = {
      name: "23 см",
    };
    const normalizedSize = normalizeSize(size);
    expect(normalizedSize).toHaveProperty(
      "class",
      "diameter__input diameter__input--small"
    );
  });

  test('Должен иметь свойство class "diameter__input diameter__input--normal"', () => {
    const size = {
      name: "32 см",
    };
    const normalizedSize = normalizeSize(size);
    expect(normalizedSize).toHaveProperty(
      "class",
      "diameter__input diameter__input--normal"
    );
  });

  test("Должен соответствовать заданному", () => {
    const size = {
      name: "32 см",
      price: 150,
    };
    const normalizedSize = normalizeSize(size);
    expect(normalizedSize).toStrictEqual({
      name: "32 см",
      price: 150,
      class: "diameter__input diameter__input--normal",
    });
  });
});
