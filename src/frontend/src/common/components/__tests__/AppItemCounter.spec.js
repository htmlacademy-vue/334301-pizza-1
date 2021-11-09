import { enableAutoDestroy, shallowMount } from "@vue/test-utils";
import AppItemCounter from "../AppItemCounter";

enableAutoDestroy(afterEach);

const incrementSelector = "button.counter__button.counter__button--plus";
const decrementSelector = "button.counter__button.counter__button--minus";

const factory = (propsData, mocks = {}) => {
  return shallowMount(AppItemCounter, { propsData, mocks });
};

describe("Компонент AppItemCounter", () => {
  let wrapper;

  test("Кнопка '-' должна быть заблокирована", () => {
    wrapper = factory({ itemId: 1, count: 0 });

    const decrBtn = wrapper.find(decrementSelector);

    expect(decrBtn.attributes("disabled")).toBeTruthy();
  });

  test("Кнопка '+' должна быть заблокирована", () => {
    wrapper = factory({ itemId: 1, count: 3 });

    const incBtn = wrapper.find(incrementSelector);

    expect(incBtn.attributes("disabled")).toBeTruthy();
  });

  test("Кнопка вызывается событие setCount c данными 1, 3", async () => {
    wrapper = factory({ itemId: 1, count: 2 });

    const incBtn = wrapper.find(incrementSelector);
    await incBtn.trigger("click");

    expect(wrapper.emitted("setCount").length).toBe(1);
    expect(wrapper.emitted("setCount")[0]).toEqual([1, 3]);
  });

  test("Кнопка вызывается событие setCount c данными 1, 2", async () => {
    wrapper = factory({ itemId: 1, count: 3 });

    const decrBtn = wrapper.find(decrementSelector);
    await decrBtn.trigger("click");

    expect(wrapper.emitted("setCount").length).toBe(1);
    expect(wrapper.emitted("setCount")[0]).toEqual([1, 2]);
  });
});
