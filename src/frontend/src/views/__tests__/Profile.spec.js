import { shallowMount } from "@vue/test-utils";
import Profile from "../Profile";

describe("view Profile", () => {
  const wrapper = shallowMount(Profile);

  test("Exist", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
