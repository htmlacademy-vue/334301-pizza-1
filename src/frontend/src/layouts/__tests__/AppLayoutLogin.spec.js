import { shallowMount } from "@vue/test-utils";
import AppLayoutLogin from "../AppLayoutLogin";
import { slots, stubs } from "../mocks";

describe("layout AppLayoutLogin", () => {
  const wrapper = shallowMount(AppLayoutLogin, { slots, stubs });

  test("Отображает AppNotifications", () => {
    expect(wrapper.find("notifications")).toBeTruthy();
  });

  test("Отображает slot", () => {
    expect(wrapper.html()).toContain(slots.default);
  });
});
