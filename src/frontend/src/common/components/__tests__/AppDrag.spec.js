import { enableAutoDestroy, mount, shallowMount } from "@vue/test-utils";
import AppDrag from "../AppDrag";

enableAutoDestroy(afterEach);

describe("Компонент AppDrag", () => {
  let wrapper;
  const transferData = { prop1: "value1" };

  test("Правильно отображает draggable=true", () => {
    wrapper = mount(AppDrag, {
      propsData: { transferData, draggable: true },
      slots: { default: "default slot" },
    });

    expect(wrapper.html()).toBe('<div draggable="true">default slot</div>');
  });

  test("Правильно отображает draggable=false", () => {
    wrapper = mount(AppDrag, {
      propsData: { transferData, draggable: false },
      slots: { default: "default slot" },
    });

    expect(wrapper.html()).toBe('<div draggable="false">default slot</div>');
  });

  test("Вызывает onDrag", async () => {
    wrapper = shallowMount(AppDrag, {
      propsData: { transferData, draggable: true },
      slots: { default: "default slot" },
    });

    const transfer = {
      dataTransfer: {
        effectAllowed: false,
        dropEffect: false,
        setData: jest.fn(),
      },
    };

    const spyOnDrag = jest.spyOn(wrapper.vm, "onDrag");
    await wrapper.trigger("dragstart", transfer);
    expect(spyOnDrag).toHaveBeenCalled();
  });
});
