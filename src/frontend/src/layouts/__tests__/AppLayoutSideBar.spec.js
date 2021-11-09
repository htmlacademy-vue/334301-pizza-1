import AppLayoutSideBar from "../AppLayoutSideBar";
import { stubs } from "../mocks";
import { shallowMount } from "@vue/test-utils";

describe("layout AppLayoutSideBar", () => {
  const wrapper = shallowMount(AppLayoutSideBar, { stubs });

  test("Отображает AppHeader", () => {
    expect(wrapper.find("header")).toBeTruthy();
  });

  test("Отображает AppNotifications", () => {
    expect(wrapper.find("notifications")).toBeTruthy();
  });

  test("Отображает SideBar", () => {
    expect(wrapper.find("side-bar")).toBeTruthy();
  });
});
