import { enableAutoDestroy, shallowMount } from "@vue/test-utils";
import AppProductListItem from "../AppProductListItem";

const factoryProduct = (ingredients, doughName) => {
  return {
    name: "Test  pizza",
    size: { name: "23 см" },
    sauce: { name: "Томатный" },
    dough: { name: doughName ? doughName : "Толстое" },
    ingredients,
  };
};

const factory = (product) => {
  return shallowMount(AppProductListItem, { propsData: { product } });
};

enableAutoDestroy(afterEach);

describe("Компонент AppProductListItem", () => {
  let wrapper;

  test("Правильно отображается", () => {
    const ingredients = [{ name: "сыр" }, { name: "колбаса" }];
    const product = factoryProduct(ingredients);
    wrapper = factory(product);

    expect(wrapper.html()).toBeTruthy();
    expect(wrapper.html()).toContain("<h2>Test pizza</h2>");
    expect(wrapper.html()).toContain("<li>23 см, на толстом тесте</li>");
    expect(wrapper.html()).toContain("<li>Соус: томатный</li>");
    expect(wrapper.html()).toContain("<li>Начинка: сыр, колбаса</li>");
  });

  test('computed.ingredients() должен быть "сыр, грибы"', () => {
    const ingredients = [{ name: "сыр" }, { name: "грибы" }];
    let product = factoryProduct(ingredients);

    const ingredientsStr = AppProductListItem.computed.ingredients.call({
      product,
    });

    expect(ingredientsStr).toBe("сыр, грибы");
  });

  test('computed.ingredients() должен быть "сыр, грибы"', () => {
    const ingredients = [{ name: "сыр" }];
    const product = factoryProduct(ingredients);

    const ingredientsStr = AppProductListItem.computed.ingredients.call({
      product,
    });

    expect(ingredientsStr).toBe("сыр");
  });

  test('computed.sauce() должен быть "томатный"', () => {
    const ingredients = [{ name: "сыр" }];
    const product = factoryProduct(ingredients);

    const sauceStr = AppProductListItem.computed.sauce.call({ product });

    expect(sauceStr).toBe("томатный");
  });

  test('computed.dough() должен быть "на толстом тесте"', () => {
    const ingredients = [{ name: "сыр" }];
    const product = factoryProduct(ingredients);

    const sauceStr = AppProductListItem.computed.dough.call({ product });

    expect(sauceStr).toBe("на толстом тесте");
  });

  test('computed.dough() должен быть "на тонком тесте"', () => {
    const ingredients = [{ name: "сыр" }];
    const product = factoryProduct(ingredients, "Тонкое");

    const sauceStr = AppProductListItem.computed.dough.call({ product });

    expect(sauceStr).toBe("на тонком тесте");
  });
});
