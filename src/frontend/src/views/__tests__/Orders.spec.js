import { shallowMount } from "@vue/test-utils";
import Orders from "../Orders";

describe("view Orders", () => {
  const wrapper = shallowMount(Orders);

  test("Exist", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
