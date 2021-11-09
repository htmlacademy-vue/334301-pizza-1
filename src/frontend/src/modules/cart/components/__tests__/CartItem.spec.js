import { shallowMount } from "@vue/test-utils";
import CartItem from "../CartItem";

describe("Компонент CartItem", () => {
  test("Правильно отображает", () => {
    const product = {
      id: 1,
      count: 2,
      price: 100,
    };

    const wrapper = shallowMount(CartItem, {
      propsData: { product },
    });

    expect(wrapper.find("div.cart-list__price").text()).toBe("200 ₽");
  });
});
