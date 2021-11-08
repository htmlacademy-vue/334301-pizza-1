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

  test("Displays AppLayoutDefault", () => {
    wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
  });

  test("Displays AppLayoutInner", () => {
    wrapper = factory("AppLayoutInner");
    expect(wrapper.exists()).toBeTruthy();
  });

  test("Displays AppLayoutEmpty", () => {
    wrapper = factory("AppLayoutEmpty");
    expect(wrapper.exists()).toBeTruthy();
  });
});
