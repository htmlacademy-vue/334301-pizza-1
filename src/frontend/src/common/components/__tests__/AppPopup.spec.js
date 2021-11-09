import { enableAutoDestroy, shallowMount } from "@vue/test-utils";
import AppPopup from "../AppPopup";

enableAutoDestroy(afterEach);
const factory = () => {
  return shallowMount(AppPopup);
};
describe("Компонент AppPopup", () => {
  let wrapper;

  test("Отображает компонент", () => {
    wrapper = factory();

    expect(wrapper.html()).toBeTruthy();
  });

  test("Закрывает окно при клике на 'Закрыть попап'", async () => {
    wrapper = factory();

    const closeLink = wrapper.find("a.close");
    await closeLink.trigger("click");

    expect(wrapper.emitted("close").length).toBe(1);
  });

  test("Закрывает окно при нажатии на кнопку 'Отлично, я жду'", async () => {
    wrapper = factory();

    const closeBtn = wrapper.find("a.button");
    await closeBtn.trigger("click");

    expect(wrapper.emitted("close").length).toBe(1);
  });
});
