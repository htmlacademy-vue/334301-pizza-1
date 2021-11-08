import { shallowMount } from "@vue/test-utils";
import AppLayoutInner from "../AppLayoutInner";
import { stubs, slots } from "../mocks";

describe("layout AppLayoutInner", () => {
  const wrapper = shallowMount(AppLayoutInner, { slots, stubs });

  test("Has AppHeader", () => {
    expect(wrapper.find(".header")).toBeTruthy();
  });

  test("Has slot", () => {
    expect(wrapper.html()).toContain(slots.default);
  });

  test("Has Sidebar", () => {
    expect(wrapper.find(".sidebar")).toBeTruthy();
  });
});
