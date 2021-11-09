import {
  createLocalVue,
  enableAutoDestroy,
  shallowMount,
} from "@vue/test-utils";
import Vuex from "vuex";
import CartOrder from "../CartOrder";
import { DefaultAddress } from "../../../../common/const/common";

enableAutoDestroy(afterEach);

const localVue = createLocalVue();
localVue.use(Vuex);

const setAddress = jest.fn();

const mockUser = { phone: "+7 800 800 80 80" };
const mockAddress = {
  id: 1,
  name: "Address 1",
  street: "Street",
  building: "7",
};

const factoryStore = (address, user) => {
  const store = {
    getters: {
      "orders/getAddress": () => address,
      "auth/getUser": () => user,
      "auth/getUserAddresses": () => [
        { ...mockAddress },
        {
          id: 2,
          name: "My address 2",
          street: "My Street 2",
          building: "2",
          flat: "1",
        },
      ],
    },
    actions: {
      "orders/setAddress": setAddress,
    },
  };

  return new Vuex.Store(store);
};

const factory = (address = null, user = null) => {
  const store = factoryStore(address, user);

  return shallowMount(CartOrder, { localVue, store });
};

describe("Компонент CartOrder", () => {
  let wrapper;

  test("Отображает компонент", () => {
    wrapper = factory();
    expect(wrapper.text()).toContain("Получение заказа:");
  });

  test("Правильно отображает телефон", () => {
    wrapper = factory(null, mockUser);
    expect(wrapper.find('input[name="tel"]').element.value).toBe(
      "+7 800 800 80 80"
    );
  });

  test("Правильно отображает aдрес", () => {
    wrapper = factory(mockAddress);
    expect(wrapper.find('input[name="street"]').element.value).toBe(
      mockAddress.street
    );
  });

  test("Устанавливает select.option 0", async () => {
    wrapper = factory();

    const options = wrapper.find("select.select").findAll("option");
    await options.at(1).setSelected();

    expect(wrapper.find("option:checked").element.value).toBe("0");
  });
});

describe("Компонент CartOrder computed.phone", () => {
  let wrapper;

  test("Должен вернуть null", () => {
    wrapper = factory();
    expect(wrapper.vm.phone).toBeNull();
  });

  test('Должен вернуть "+7 800 800 80 80"', () => {
    wrapper = factory(null, mockUser);
    expect(wrapper.vm.phone).toBe(mockUser.phone);
  });
});

describe("Компонент CartOrder handleChange", () => {
  let wrapper;

  test("Вызывает handleChange", async () => {
    wrapper = factory();

    const options = wrapper.find("select.select").findAll("option");
    await options.at(1).setSelected();

    expect(setAddress).toHaveBeenCalled();
  });

  test("Вызов с новым адресом", async () => {
    wrapper = factory();
    wrapper.vm.handleSelectChange({ target: { value: "0" } });

    expect(wrapper.vm.isNewAddress).toBe(true);
    expect(wrapper.vm.address).toStrictEqual(DefaultAddress);
    expect(setAddress).toHaveBeenCalled();
  });

  test("Вызов со своим адресом", async () => {
    wrapper = factory();
    wrapper.vm.handleSelectChange({ target: { value: "1" } });

    expect(wrapper.vm.isNewAddress).toBe(false);
    expect(wrapper.vm.address).toStrictEqual(mockAddress);
    expect(setAddress).toHaveBeenCalled();
  });
});
