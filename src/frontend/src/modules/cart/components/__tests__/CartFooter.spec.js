import {
  createLocalVue,
  enableAutoDestroy,
  mount,
  shallowMount,
} from "@vue/test-utils";
import Vuex from "vuex";
import CartFooter from "../CartFooter";
import { AppRoute } from "../../../../common/const/route";

jest.mock("../../helpers/prepare-order", () => ({
  prepareOrder: () => ({ order: 1 }),
}));

enableAutoDestroy(afterEach);

const localVue = createLocalVue();
localVue.use(Vuex);

const clearCart = jest.fn();
const clearAddress = jest.fn();
const routerPush = jest.fn();
const notifierError = jest.fn();

const factoryStore = (price, user) => {
  return new Vuex.Store({
    modules: {
      cart: {
        namespaced: true,
        getters: {
          price: () => price,
        },
        actions: {
          clearCart,
        },
      },
      auth: {
        namespaced: true,
        getters: {
          getUser: () => user,
        },
      },
      orders: {
        namespaced: true,
        actions: {
          clearAddress,
        },
      },
    },
  });
};

const factory = (price = 1000, user = null) => {
  const store = factoryStore(price, user);
  const stubs = ["router-link"];
  const mocks = {
    $router: {
      push: routerPush,
    },
    $notifier: {
      error: notifierError,
    },
  };

  return shallowMount(CartFooter, { localVue, store, stubs, mocks });
};

describe("Компонент CartFooter", () => {
  let wrapper;

  test("Правильно отображает", () => {
    wrapper = factory();

    expect(wrapper.find(".button.button--border").text()).toBe("Хочу еще одну");

    const footerTextElement = wrapper.find("p.footer__text");
    expect(footerTextElement.text()).toContain("Перейти к конструктору");
    expect(footerTextElement.text()).toContain("чтоб собрать ещё одну пиццу");

    expect(wrapper.find(".footer__price").text()).toBe("Итого: 1000 ₽");
  });

  test("Вызывает handleSubmit", async () => {
    wrapper = factory();
    const mockHandler = jest.fn();
    wrapper.vm.handleSubmit = mockHandler;

    await wrapper.find(".footer__submit button.button").trigger("click");

    expect(mockHandler).toBeCalled();
  });

  test("Вызывает handleClose", async () => {
    const store = factoryStore(1000, null);
    const stubs = ["router-link"];

    wrapper = mount(CartFooter, {
      localVue,
      store,
      stubs,
    });

    const mockHandler = jest.fn();
    wrapper.vm.handleClose = mockHandler;

    await wrapper.setData({ isShowPopup: true });
    await wrapper.find(".popup__button a.button").trigger("click");

    expect(mockHandler).toBeCalled();
  });
});

describe("Компонент CartFooter. Метод handleClose", () => {
  let wrapper;

  test("Сбрасывает isShowPopup", async () => {
    wrapper = factory();
    await wrapper.vm.handleClose();
    expect(wrapper.vm.isShowPopup).toBe(false);
  });

  test("Вызывает setTimout", async () => {
    jest.spyOn(global, "setTimeout");

    wrapper = factory();
    await wrapper.vm.handleClose();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
  });

  test("Вызывает $router.push c параметром / ", async () => {
    jest.useFakeTimers();

    wrapper = factory();
    await wrapper.vm.handleClose();

    jest.runAllTimers();

    expect(routerPush).toBeCalledWith(AppRoute.MAIN);
  });

  test("Вызывает $router.push c параметром /orders ", async () => {
    wrapper = factory(1000, { id: 1 });
    await wrapper.vm.handleClose();

    setTimeout(() => {
      expect(routerPush).toBeCalledWith(AppRoute.ORDERS);
    }, 200);
  });

  test("Вызывает clearCart ", async () => {
    wrapper = factory();
    await wrapper.vm.handleClose();

    setTimeout(() => {
      expect(clearCart).toBeCalled();
    }, 200);
  });

  test("Вызывает clearAddress ", async () => {
    wrapper = factory();
    await wrapper.vm.handleClose();

    setTimeout(() => {
      expect(clearCart).toBeCalled();
    }, 200);
  });
});

describe("Компонент CartFooter. Метод handleSubmit", () => {
  let wrapper;

  const apiPost = jest.fn();

  const factory = (address) => {
    const mocks = {
      $store: {
        state: {
          orders: { address },
        },
        getters: {
          "cart/price": jest.fn(),
        },
      },
      $api: {
        orders: { post: apiPost },
      },
    };

    const stubs = ["router-link"];

    return shallowMount(CartFooter, { mocks, stubs });
  };

  test("Не вызывает api post, не устанавливает isShowPopup ", async () => {
    wrapper = factory({ id: 1 });
    jest.spyOn(wrapper.vm, "validateAddress").mockImplementation(() => false);

    await wrapper.vm.handleSubmit();

    expect(apiPost).not.toBeCalledWith();
    expect(wrapper.vm.isShowPopup).toBeFalsy();
  });

  test("Вызывает api post с адресом { id: 1 } ", async () => {
    wrapper = factory({ id: 1 });
    jest.spyOn(wrapper.vm, "validateAddress").mockImplementation(() => true);

    await wrapper.vm.handleSubmit();

    expect(apiPost).toBeCalledWith({ address: { id: 1 }, order: 1 });
  });

  test("Вызывает api post без адреса и устанавливает isShowPopup", async () => {
    wrapper = factory();
    jest.spyOn(wrapper.vm, "validateAddress").mockImplementation(() => true);

    await wrapper.vm.handleSubmit();
    expect(apiPost).toBeCalledWith({ order: 1 });
    expect(wrapper.vm.isShowPopup).toBeTruthy();
  });
});

describe("Компонент CartFooter. Метод validateAddress", () => {
  let wrapper;

  test("return true, если не адреса", () => {
    wrapper = factory();

    expect(wrapper.vm.validateAddress(null)).toBe(true);
  });

  test("Возвращает true, если адрес правильный", () => {
    wrapper = factory();

    const address = { name: "name", street: "street", building: "2" };

    expect(wrapper.vm.validateAddress(address)).toBe(true);
    expect(notifierError).not.toHaveBeenCalled();
  });

  test("Вызывает $notifier с АДРЕС", () => {
    wrapper = factory();

    const address = { name: "name", street: "street" };
    wrapper.vm.validateAddress(address);

    expect(notifierError).toHaveBeenLastCalledWith(
      "АДРЕС<br>Дом - поле обязательно для заполнения"
    );
  });

  test("return false", () => {
    wrapper = factory();

    const address = { name: "name" };

    expect(wrapper.vm.validateAddress(address)).toBe(false);
  });
});
