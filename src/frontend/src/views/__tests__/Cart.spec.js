import { shallowMount } from "@vue/test-utils";
import Cart from "../Cart";

describe("view Cart", () => {
  const wrapper = shallowMount(Cart);

  test("Exist", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
