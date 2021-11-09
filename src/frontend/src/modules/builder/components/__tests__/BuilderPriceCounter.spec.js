import {
  createLocalVue,
  enableAutoDestroy,
  shallowMount,
} from "@vue/test-utils";
import Vuex from "vuex";
import BuilderPriceCounter from "../BuilderPriceCounter";

enableAutoDestroy(afterEach);

const localVue = createLocalVue();
localVue.use(Vuex);

const init = jest.fn();
const addPizza = jest.fn();
const notifierSuccess = jest.fn();

const factoryStore = (pizza, addedIngredients) => {
  return {
    modules: {
      builder: {
        namespaced: true,
        actions: {
          init,
        },
        getters: {
          pizza: () => pizza,
          addedIngredients: () => addedIngredients,
        },
      },
      cart: {
        namespaced: true,
        actions: {
          addPizza,
        },
      },
    },
  };
};

const factory = (pizza, addedIngredients) => {
  const mockStore = factoryStore(pizza, addedIngredients);
  const store = new Vuex.Store(mockStore);

  const mocks = {
    $notifier: {
      success: notifierSuccess,
    },
  };
  return shallowMount(BuilderPriceCounter, { localVue, store, mocks });
};

describe("Компонент BuilderPriceCounter", () => {
  let wrapper;

  test("Правильно отрисовывает цену", () => {
    const pizza = { price: 100, name: "Test Pizza" };
    const addedIngredients = [];

    wrapper = factory(pizza, addedIngredients);

    expect(wrapper.text()).toContain("Итого: 100 ₽");
  });

  test("Кнопка заблокирована, если нет имени пиццы", () => {
    const pizza = { price: 100, name: "" };
    const addedIngredients = [1, 2];

    wrapper = factory(pizza, addedIngredients);

    const button = wrapper.find("button.button");

    expect(button.attributes("disabled")).toBeTruthy();
  });

  test("Кнопка заблокирована, если не выбраны ингредиенты", () => {
    const pizza = { price: 100, name: "Моя пицца" };
    const addedIngredients = [];

    wrapper = factory(pizza, addedIngredients);

    const button = wrapper.find("button.button");

    expect(button.attributes("disabled")).toBeTruthy();
  });

  test("Вызывается метод addToCart", async () => {
    const pizza = { price: 100, name: "Моя пицца" };
    const addedIngredients = [1, 2];

    wrapper = factory(pizza, addedIngredients);

    const button = wrapper.find("button.button");
    await button.trigger("click");

    await wrapper.vm.$nextTick();

    expect(addPizza).toHaveBeenCalled();
    expect(init).toHaveBeenCalled();
    expect(notifierSuccess).toHaveBeenCalled();
    expect(notifierSuccess.mock.calls[0][0]).toBe("Пицца добавлена в корзину");
  });
});
