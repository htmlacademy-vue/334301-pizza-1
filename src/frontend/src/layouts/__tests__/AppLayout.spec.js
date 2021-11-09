import { enableAutoDestroy, shallowMount } from "@vue/test-utils";
import AppLayout from "../AppLayout";
import { stubs } from "../mocks";

enableAutoDestroy(afterEach);

const factory = (layoutName = null) => {
  const mocks = {
    $route: {
      meta: { layout: layoutName },
    },
  };
  return shallowMount(AppLayout, { mocks, stubs });
};
describe("layout AppLayout", () => {
  let wrapper;

  test("Отображает с AppLayoutDefault", () => {
    wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
  });

  test("Отображает c AppLayoutSideBar", () => {
    wrapper = factory("AppLayoutSideBar");
    expect(wrapper.exists()).toBeTruthy();
  });
});
