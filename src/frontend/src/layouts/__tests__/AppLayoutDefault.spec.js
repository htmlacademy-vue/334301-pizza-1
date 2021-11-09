import { shallowMount } from "@vue/test-utils";
import AppLayoutDefault from "../AppLayoutDefault";
import { stubs, slots } from "../mocks";

describe("layout AppLayoutDefault", () => {
  const wrapper = shallowMount(AppLayoutDefault, { slots, stubs });

  test("Отображает div.full-height", () => {
    expect(wrapper.find("full-height")).toBeTruthy();
  });

  test("Отображает AppHeader", () => {
    expect(wrapper.find("header")).toBeTruthy();
  });

  test("Отображает AppNotifications", () => {
    expect(wrapper.find("notifications")).toBeTruthy();
  });

  test("Отображает slot", () => {
    expect(wrapper.html()).toContain(slots.default);
  });
});
