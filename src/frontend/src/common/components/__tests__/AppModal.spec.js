import AppModal from "../AppModal";
import { shallowMount } from "@vue/test-utils";

describe("Компонент AppModal", () => {
  let wrapper;
  const slots = { default: '<div class="popup">Popup</div>' };

  beforeEach(() => (wrapper = shallowMount(AppModal, { slots })));

  afterEach(() => wrapper.destroy);

  test("Содержит div.modal-wrapper", () => {
    expect(wrapper.html()).toContain('<div class="modal-wrapper">');
  });

  test("Содержит div.modal-mask", () => {
    expect(wrapper.find("div.modal-mask").element.tagName).toBe("DIV");
  });

  test("Содержит слот Popup", () => {
    expect(wrapper.html()).toContain(slots.default);
  });
});
