import { shallowMount } from "@vue/test-utils";
import LoginModal from "../LoginModal";

describe("view LoginModal", () => {
  test("Отображает", () => {
    const wrapper = shallowMount(LoginModal);
    expect(wrapper.html()).toBeTruthy();
  });
});
