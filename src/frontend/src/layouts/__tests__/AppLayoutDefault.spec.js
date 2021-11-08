import { shallowMount } from "@vue/test-utils";
import AppLayoutDefault from "../AppLayoutDefault";
import { stubs, slots } from "../mocks";

describe("layout AppLayoutDefault", () => {
  const wrapper = shallowMount(AppLayoutDefault, { slots, stubs });

  test("Has AppHeader", () => {
    expect(wrapper.find("header")).toBeTruthy();
  });

  test("Has slot", () => {
    expect(wrapper.html()).toContain(slots.default);
  });
});
