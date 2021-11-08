import { shallowMount } from "@vue/test-utils";
import AppLayoutEmpty from "../AppLayoutEmpty";
import { stubs, slots } from "../mocks";

describe("layout AppLayoutEmpty", () => {
  const wrapper = shallowMount(AppLayoutEmpty, { slots, stubs });

  test("Has slot", () => {
    expect(wrapper.html()).toContain(slots.default);
  });
});
