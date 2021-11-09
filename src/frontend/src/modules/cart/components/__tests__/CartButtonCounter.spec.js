import { enableAutoDestroy, shallowMount } from "@vue/test-utils";
import CartButtonCounter from "../CartButtonCounter";

const factory = (propsData) => {
  return shallowMount(CartButtonCounter, { propsData });
};

enableAutoDestroy(afterEach);

describe("Компонент CartButtonCounter", () => {
  let wrapper;

  test("Правильно отображает", () => {
    wrapper = factory({ count: 0, id: 1 });

    expect(wrapper.text()).toContain("Меньше");
    expect(wrapper.text()).toContain("Больше");
  });

  test("Правильно отображает input", async () => {
    wrapper = await factory({ count: 1, id: 1 });

    const input = wrapper.find('input[name="counter"]');
    expect(input.element.value).toBe("1");
  });

  test("Тест increment", async () => {
    wrapper = factory({ count: 0, id: 1 });

    const button = wrapper.find("button.counter__button--plus");
    await button.trigger("click");

    expect(wrapper.emitted("increment").length).toBe(1);
    expect(wrapper.emitted("increment")[0]).toEqual([1]);
  });

  test("Тест decrement", async () => {
    wrapper = factory({ count: 1, id: 1 });

    const button = wrapper.find("button.counter__button--minus");
    await button.trigger("click");

    expect(wrapper.emitted("decrement").length).toBe(1);
    expect(wrapper.emitted("decrement")[0]).toEqual([1]);
  });

  test("Тест handleChange", async () => {
    wrapper = factory({ count: 1, id: 1 });

    const input = wrapper.find(".counter__input");
    input.element.value = 2;
    await input.trigger("change");

    expect(wrapper.emitted("change")[0]).toStrictEqual([{ count: 2, id: 1 }]);
  });

  test("Тест computed.isDisabled должен вернуть false", async () => {
    wrapper = factory({ count: 1, id: 1 });

    expect(wrapper.vm.isDisabled).toBeFalsy();
  });

  test("Тест computed.isDisabled должен вернуть true", async () => {
    wrapper = factory({ count: 0, id: 1 });

    expect(wrapper.vm.isDisabled).toBeTruthy();
  });
});
