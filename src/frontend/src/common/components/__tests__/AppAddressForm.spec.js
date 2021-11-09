import {
  createLocalVue,
  enableAutoDestroy,
  mount,
  shallowMount,
} from "@vue/test-utils";
import AppAddressFrom from "../AppAddressForm";
import Vuex from "vuex";
import user from "../../../static/user.json";
import resources from "../../enums/resources";

const address = {
  name: "Тестовый адрес",
  street: "Зеленая",
  building: "10",
  flat: "20",
  comment: "Тест коммент",
};
const api = {
  [resources.ADDRESSES]: {
    put: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
};

const storeFactory = (user) => {
  return new Vuex.Store({
    modules: {
      auth: {
        namespaced: true,
        state: {
          user: user,
        },
        getters: {
          getUser: (state) => state.user,
        },
      },
    },
  });
};
const notifierFactory = () => {
  return {
    error: jest.fn(),
    success: jest.fn(),
  };
};

enableAutoDestroy(afterEach);

describe("Компонент AppAddressForm", () => {
  const findSelectors = (wrapper) => {
    const title = wrapper.find("div.address-form__header > b");
    const inputName = wrapper.find('input[name="name"]');
    const inputStreet = wrapper.find('input[name="street"]');
    const inputHouse = wrapper.find('input[name="house"]');
    const inputApartment = wrapper.find('input[name="apartment"]');
    const inputComment = wrapper.find('input[name="comment"]');

    return {
      title,
      inputName,
      inputStreet,
      inputHouse,
      inputApartment,
      inputComment,
    };
  };
  test("Отрисовывает форму с номером 1 и дефолтным адресом", () => {
    const wrapper = mount(AppAddressFrom, { propsData: { number: 1 } });

    const {
      title,
      inputName,
      inputStreet,
      inputHouse,
      inputApartment,
      inputComment,
    } = findSelectors(wrapper);

    expect(title.text()).toBe("Адрес 1");
    expect(inputName.element.value).toBe("Новый адрес");
    expect(inputStreet.element.value).toBe("");
    expect(inputHouse.element.value).toBe("");
    expect(inputApartment.element.value).toBe(" ");
    expect(inputComment.element.value).toBe("");
  });

  test("Отрисовывает форму с номером 15 и адресом", () => {
    const wrapper = mount(AppAddressFrom, {
      propsData: {
        number: 10,
        address,
      },
    });

    const {
      title,
      inputName,
      inputStreet,
      inputHouse,
      inputApartment,
      inputComment,
    } = findSelectors(wrapper);

    expect(title.text()).toBe("Адрес 10");
    expect(inputName.element.value).toBe(address.name);
    expect(inputStreet.element.value).toBe(address.street);
    expect(inputHouse.element.value).toBe(address.building);
    expect(inputApartment.element.value).toBe(address.flat);
    expect(inputComment.element.value).toBe(address.comment);
  });
});

describe("Компонент AppAddressForm. Новый адрес", () => {
  let wrapper;
  const propsData = { number: 1 };

  const notifier = notifierFactory();

  const mocks = {
    $notifier: notifier,
    $api: api,
  };

  const localVue = createLocalVue();
  localVue.use(Vuex);

  const factory = (user = null) => {
    const store = storeFactory(user);
    return shallowMount(AppAddressFrom, {
      localVue,
      propsData,
      store,
      mocks,
    });
  };

  test("Должен вызвать $notifier.error, если заполнено только поле улица", async () => {
    wrapper = factory(user);
    await wrapper.find('input[name="street"]').setValue("Test street");
    await wrapper.find('button[type="submit"]').trigger("click");

    expect(notifier.error).toBeCalled();
    expect(api[resources.ADDRESSES].post).not.toBeCalled();
  });

  test("Должен вызвать $notifier.error, если не заполнено название", async () => {
    wrapper = factory(user);

    await wrapper.find('input[name="name"]').setValue("");
    await wrapper.find('input[name="street"]').setValue("Test street");
    await wrapper.find('input[name="house"]').setValue("5");
    await wrapper.find('button[type="submit"]').trigger("click");

    expect(notifier.error).toBeCalled();
    expect(api[resources.ADDRESSES].post).not.toBeCalled();
  });

  test("Должен вызвать $api.address.post с нужными параметрами (user установлен)", async () => {
    wrapper = factory(user);
    await wrapper.find('input[name="street"]').setValue("Test street");
    await wrapper.find('input[name="house"]').setValue("5");
    await wrapper.find('button[type="submit"]').trigger("click");

    expect(api[resources.ADDRESSES].post).toHaveBeenLastCalledWith({
      street: "Test street",
      building: "5",
      flat: " ",
      name: "Новый адрес",
      userId: "uuid",
      comment: "",
    });
  });

  test("Должен вызвать $api.address.post с нужными параметрами (user не установлен)", async () => {
    wrapper = factory();

    await wrapper.find('input[name="street"]').setValue("Test street");
    await wrapper.find('input[name="house"]').setValue("5");
    await wrapper.find('button[type="submit"]').trigger("click");

    expect(api[resources.ADDRESSES].post).toHaveBeenLastCalledWith({
      street: "Test street",
      building: "5",
      flat: " ",
      name: "Новый адрес",
      comment: "",
    });
  });

  test("Должен вызвать $emit.closeForm", async () => {
    wrapper = factory();
    await wrapper.find('button[type="submit"]').trigger("click");

    expect(wrapper.emitted("closeForm"));
  });
});

describe("Компонент AppAddressForm. Редактируемый адрес", () => {
  let wrapper;
  let notifier;
  const propsData = { number: 1, address: { ...address, id: 1 } };

  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = storeFactory(user);

  beforeEach(() => {
    notifier = notifierFactory();

    const mocks = {
      $notifier: notifier,
      $api: api,
    };

    wrapper = shallowMount(AppAddressFrom, {
      localVue,
      propsData,
      store,
      mocks,
    });
  });

  test("Должен вызвать $api.address.put", async () => {
    await wrapper.find('input[name="street"]').setValue("Test street");
    await wrapper.find('input[name="house"]').setValue("5");
    await wrapper.find('button[type="submit"]').trigger("click");

    expect(api[resources.ADDRESSES].put).toBeCalled();
  });

  test("Должен вызвать $notifier.success", async () => {
    await wrapper.find('button[type="submit"]').trigger("click");

    expect(notifier.success).toBeCalled();
    expect(notifier.success.mock.calls).toEqual([["Адрес сохранен"]]);
  });

  test("Должен вызвать $emit.closeForm", async () => {
    await wrapper.find('button[type="submit"]').trigger("click");

    expect(wrapper.emitted("closeForm"));
  });
});

describe("Компонент AppAddressForm. Метод remove", () => {
  let wrapper;

  test("Не должен вызвать $api.addresses.delete и закрыть форму", async () => {
    wrapper = shallowMount(AppAddressFrom, {
      propsData: { number: 1 },
      mocks: { $api: api },
    });

    await wrapper
      .find('button[type="button"].button--transparent')
      .trigger("click");

    expect(api[resources.ADDRESSES].delete).not.toBeCalled();
    expect(wrapper.emitted("closeForm"));
  });

  test("Должен вызвать $api.addresses.delete и закрыть форму", async () => {
    wrapper = shallowMount(AppAddressFrom, {
      propsData: { number: 1, address: { id: 1 } },
      mocks: { $api: api },
    });

    await wrapper
      .find('button[type="button"].button--transparent')
      .trigger("click");

    expect(api[resources.ADDRESSES].delete).toBeCalled();
    expect(wrapper.emitted("closeForm"));
  });
});
