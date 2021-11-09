import {
  createLocalVue,
  enableAutoDestroy,
  shallowMount,
} from "@vue/test-utils";
import Cart from "../Cart";
import Vuex from "vuex";

enableAutoDestroy(afterEach);

const localVue = createLocalVue();
localVue.use(Vuex);

const factory = (items = []) => {
  const store = new Vuex.Store({
    modules: {
      cart: {
        namespaced: true,
        getters: {
          getItems: () => items,
        },
      },
    },
  });

  return shallowMount(Cart, { localVue, store });
};

describe("View Cart", () => {
  let wrapper;

  test("Пустая корзина", () => {
    wrapper = factory();

    expect(wrapper.text()).toContain("В корзине нет ни одного товара");
  });

  test("В корзине 2 пиццы", () => {
    const items = [{ id: 1 }, { id: 2 }];
    wrapper = factory(items);

    const list = wrapper.find(".cart-list");
    expect(list.element.childElementCount).toBe(2);
  });
});
