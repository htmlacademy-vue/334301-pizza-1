import {
  createLocalVue,
  enableAutoDestroy,
  shallowMount,
  mount,
} from "@vue/test-utils";
import Vuex from "vuex";
import Profile from "../Profile";

enableAutoDestroy(afterEach);

const mockUser = {
  name: "User",
  phone: "222-333",
  avatar: "avatar.jpg",
};
const mockAddresses = [
  { id: 1, street: "Street 1", building: "1", flat: "1" },
  { id: 2, street: "Street 2", building: "2", flat: "" },
];

let loadUserAddresses;

const localVue = createLocalVue();
localVue.use(Vuex);

const factory = (addresses = [], isShallow = true) => {
  loadUserAddresses = jest.fn();

  const store = new Vuex.Store({
    modules: {
      auth: {
        namespaced: true,
        getters: {
          getUser: () => mockUser,
          getUserAddresses: () => addresses,
        },
        actions: {
          loadUserAddresses,
        },
      },
    },
  });

  return isShallow
    ? shallowMount(Profile, { localVue, store })
    : mount(Profile, { localVue, store });
};

describe("view Profile", () => {
  let wrapper;

  test("Отрисовывает", () => {
    wrapper = factory();
    expect(wrapper.text()).toContain("Добавить новый адрес");
  });

  test("Показывает имя", () => {
    wrapper = factory();
    expect(wrapper.find(".user__name").text()).toBe("User");
  });

  test("Показывает телефон", () => {
    wrapper = factory();
    expect(wrapper.find("p.user__phone").text()).toBe(
      "Контактный телефон: 222-333"
    );
  });

  test("Показывает 2 адреса", () => {
    wrapper = factory(mockAddresses);
    expect(wrapper.findAll("div.sheet.address-form").length).toBe(2);
  });
});

describe("view Profile, метод addressToString", () => {
  let wrapper;

  test("Должен вернуть 'Street 1, д. 1, оф. 1'", () => {
    wrapper = factory();
    const addressStr = wrapper.vm.addressToString(mockAddresses[0]);

    expect(addressStr).toBe("Street 1, д. 1, оф. 1");
  });

  test("Должен вернуть 'Street 2, д. 2'", () => {
    wrapper = factory();
    const addressStr = wrapper.vm.addressToString(mockAddresses[1]);

    expect(addressStr).toBe("Street 2, д. 2");
  });
});

describe("view Profile, Кнопка редактирования адреса открывает форму", () => {
  let wrapper;

  test("Отображает форму редактирования адреса 1", async () => {
    wrapper = factory(mockAddresses, false);

    const button = wrapper.find("div.address-form__edit button.icon");
    await button.trigger("click");

    const form = wrapper.find("form.address-form.address-form--opened.sheet");

    expect(form.text()).toContain("Адрес 1");
    expect(form.find('input[name="street"]').element.value).toBe("Street 1");
  });

  test("Отображает форму редактирования адреса 2", async () => {
    wrapper = factory(mockAddresses, false);

    const button = wrapper
      .findAll("div.address-form__edit")
      .at(1)
      .find("button.icon");
    await button.trigger("click");

    const form = wrapper.find("form.address-form.address-form--opened.sheet");

    expect(form.text()).toContain("Адрес 2");
    expect(form.find('input[name="street"]').element.value).toBe("Street 2");
  });
});

describe("view Profile, метод closeForm", () => {
  let wrapper;

  test("Устанавливает editedAddressId null", async () => {
    wrapper = factory();
    await wrapper.vm.closeForm();

    expect(wrapper.vm.editedAddressId).toBeNull();
  });

  test("Устанавливает setEditedAddress", async () => {
    wrapper = factory();
    await wrapper.vm.closeForm();

    expect(loadUserAddresses).toHaveBeenCalled();
  });
});
