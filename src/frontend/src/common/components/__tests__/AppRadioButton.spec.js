import { shallowMount } from "@vue/test-utils";
import AppRadioButton from "../AppRadioButton";

describe("Компонент AppRadioButton", () => {
  test("Вызывает handleChange c test-value", async () => {
    const wrapper = shallowMount(AppRadioButton, {
      propsData: {
        name: "name",
        value: "test-value",
        checked: false,
      },
    });

    await wrapper.trigger("change");

    expect(wrapper.emitted("handleChoice")[0]).toEqual(["test-value"]);
  });
});
