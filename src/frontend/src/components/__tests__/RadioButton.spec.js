import { enableAutoDestroy, shallowMount } from "@vue/test-utils";
import RadioButton from "../RadioButton";

enableAutoDestroy(afterEach);

const factory = (propsData, mocks = {}) => {
  return shallowMount(RadioButton, { propsData, mocks });
};

const labelSelector = "label";
const inputSelector = "input";
const boldSelector = "b";
const spanSelector = "span";

describe("Component RadioButton", () => {
  let wrapper;

  test("Input name has correct value", () => {
    wrapper = factory({
      name: "Name",
      value: 1,
      checked: true,
    });

    const input = wrapper.find(inputSelector);

    expect(input.attributes().name).toBe("Name");
  });

  test("Input value has correct value", () => {
    wrapper = factory({
      name: "Name",
      value: 1,
      checked: true,
    });

    const input = wrapper.find(inputSelector);

    expect(input.attributes().value).toBe("1");
  });

  test("Bold element exist when has props", () => {
    wrapper = factory({
      name: "Name",
      value: 1,
      checked: true,
      boldText: "bold text",
    });

    const boldElement = wrapper.find(boldSelector);

    expect(boldElement.text()).toBe("bold text");
  });

  test("Span element exist when has props", () => {
    wrapper = factory({
      name: "Name",
      value: 1,
      checked: true,
      spanText: "span text",
    });

    const spanElement = wrapper.find(spanSelector);

    expect(spanElement.text()).toBe("span text");
  });

  test("Label click emit event 'radioClick' and returns input value", async () => {
    wrapper = factory({
      name: "Name",
      value: 1,
      checked: true,
    });

    const label = wrapper.find(labelSelector);
    await label.trigger("click");

    expect(label.emitted("radioClick")[0]).toEqual([1]);
  });
});
