import { enableAutoDestroy, mount, shallowMount } from "@vue/test-utils";
import AppDrop from "../AppDrop";

enableAutoDestroy(afterEach);

describe("Компонент AppDrop", () => {
  let wrapper;

  test("Правильно отображает", () => {
    wrapper = mount(AppDrop, { slots: { default: "default slot" } });

    expect(wrapper.html()).toBe("<div>default slot</div>");
  });

  test("Вызывает onDrop", async () => {
    wrapper = shallowMount(AppDrop);

    const spyOnDrop = jest.spyOn(wrapper.vm, "onDrop");

    const transfer = {
      dataTransfer: {
        effectAllowed: false,
        dropEffect: false,
        getData: jest.fn(),
      },
    };

    await wrapper.trigger("drop", transfer);
    expect(spyOnDrop).toHaveBeenCalled();
  });

  test("Вызывает $emit('drop')", async () => {
    wrapper = shallowMount(AppDrop);

    const transfer = {
      dataTransfer: {
        effectAllowed: false,
        dropEffect: false,
        getData: jest.fn(() => true),
      },
    };

    await wrapper.trigger("drop", transfer);
    expect(wrapper.emitted().drop).toBeTruthy();
  });

  test("Не вызывает $emit('drop')", async () => {
    wrapper = shallowMount(AppDrop);

    const transfer = {
      dataTransfer: null,
    };

    await wrapper.trigger("drop", transfer);
    expect(wrapper.emitted().drop).toBeFalsy();
  });
});
