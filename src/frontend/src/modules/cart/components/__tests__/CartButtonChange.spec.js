import {
  createLocalVue,
  enableAutoDestroy,
  shallowMount,
} from "@vue/test-utils";
import Vuex from "vuex";
import CartButtonChange from "../CartButtonChange";

const localVue = createLocalVue();
localVue.use(Vuex);

const routerPush = jest.fn();
const changePizza = jest.fn();
const mockStore = {
  modules: {
    cart: {
      namespaced: true,
      actions: {
        changePizza,
      },
    },
  },
};
const store = new Vuex.Store(mockStore);
const mocks = {
  $router: {
    push: routerPush,
  },
};

enableAutoDestroy(afterEach);

const factory = (id) => {
  return shallowMount(CartButtonChange, {
    localVue,
    store,
    propsData: { id },
    mocks,
  });
};

describe("Компонент CartButtonChange", () => {
  let wrapper;

  test("Правильно отображает", () => {
    wrapper = factory(1);

    expect(wrapper.text()).toContain("Изменить");
  });

  test("Вызывает action cart/changePizza", async () => {
    wrapper = factory(3);

    await wrapper.find("button.cart-list__edit").trigger("click");

    expect(changePizza).toHaveBeenCalled();
    expect(changePizza.mock.calls[0][1]).toBe(3);
  });

  test("Вызывает $router.push", async () => {
    wrapper = factory(1);

    await wrapper.find("button.cart-list__edit").trigger("click");

    expect(routerPush).toHaveBeenCalledWith("/");
  });
});
