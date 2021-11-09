import { enableAutoDestroy, shallowMount } from "@vue/test-utils";
import OrderPizzaItem from "../OrderPizzaItem";

jest.mock("../../../../common/utils/helpers/common", () => ({
  getStringProductPrice: () => "100",
}));

enableAutoDestroy(afterEach);

const factory = () => {
  return shallowMount(OrderPizzaItem, { propsData: { pizza: {} } });
};

describe("Компонент OrderPizzaItem", () => {
  let wrapper;

  test("Отрисовывает", () => {
    wrapper = factory();
    expect(wrapper.html()).toBeTruthy();
  });

  test("Правильно отрисовывает", () => {
    wrapper = factory();
    expect(wrapper.find("li.order__item")).toBeTruthy();
    expect(wrapper.find(".product")).toBeTruthy();
    expect(wrapper.find(".order__price")).toBeTruthy();
  });
});
