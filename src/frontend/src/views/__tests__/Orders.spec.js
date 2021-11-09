import {
  createLocalVue,
  enableAutoDestroy,
  shallowMount,
} from "@vue/test-utils";
import Vuex from "vuex";
import Orders from "../Orders";

enableAutoDestroy(afterEach);

const orders = [
  { id: 1, price: 100 },
  { id: 2, price: 200 },
];

const localVue = createLocalVue();
localVue.use(Vuex);

let loadOrders;
let removeOrder;
let loadOrderToCart;
let routerPush;

const factory = (orders, isLoaded = false) => {
  loadOrders = jest.fn();
  removeOrder = jest.fn();
  loadOrderToCart = jest.fn();
  routerPush = jest.fn();

  const store = new Vuex.Store({
    modules: {
      orders: {
        namespaced: true,
        getters: {
          getOrders: () => orders,
        },
        actions: { loadOrders, removeOrder, loadOrderToCart },
      },
      builder: {
        namespaced: true,
        state: {
          isDataLoaded: isLoaded,
        },
        getters: {
          isDataLoaded: (state) => state.isDataLoaded,
        },
      },
    },
  });

  const mocks = {
    $router: {
      push: routerPush,
    },
  };

  return shallowMount(Orders, { localVue, store, mocks });
};

describe("view Orders", () => {
  let wrapper;

  test("Отрисовывает, без истории заказов", async () => {
    wrapper = factory([], false);
    expect(wrapper.html()).toContain(
      '<h1 class="title title--big">История заказов</h1>'
    );
  });

  test("Отрисовывает 2 заказа", async () => {
    wrapper = factory(orders, false);
    const elements = wrapper.findAll("div.order__wrapper");
    expect(elements.length).toBe(2);
  });

  test("Вызывает loadOrders", async () => {
    wrapper = factory([], true);
    await wrapper.vm.$nextTick();

    expect(loadOrders).toHaveBeenCalled();
  });

  test("Не вызывает loadOrders", async () => {
    wrapper = factory([], false);
    await wrapper.vm.$nextTick();

    expect(loadOrders).not.toHaveBeenCalled();
  });
});

describe("view Orders, handleOrderRemove", () => {
  let wrapper;

  test("Вызывает handleOrderRemove", async () => {
    wrapper = factory(orders);
    const spy = jest.spyOn(wrapper.vm, "handleOrderRemove");

    const button = wrapper.find("div.order__wrapper button.button--border");
    await button.trigger("click");

    expect(spy).toHaveBeenLastCalledWith(1);
  });

  test("Вызывает handleOrderRemove", async () => {
    wrapper = factory(orders);
    const spy = jest.spyOn(wrapper.vm, "handleOrderRemove");

    const button = wrapper
      .findAll("div.order__wrapper")
      .at(1)
      .find("button.button--border");
    await button.trigger("click");

    expect(spy).toHaveBeenLastCalledWith(2);
  });

  test("Вызывает removeOrder c параметром 1", async () => {
    wrapper = factory(orders);
    await wrapper.vm.handleOrderRemove(1);

    expect(removeOrder).toHaveBeenCalled();
    expect(removeOrder.mock.calls[0][1]).toBe(1);
  });
});

describe("view Orders, handleOrderRepeat", () => {
  let wrapper;

  test("Вызывает handleOrderRepeat", async () => {
    wrapper = factory(orders);
    const spy = jest.spyOn(wrapper.vm, "handleOrderRepeat");

    const button = wrapper
      .findAll("div.order__wrapper div.order__button")
      .at(1)
      .find("button.button");
    await button.trigger("click");

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenLastCalledWith(1);
  });

  test("Вызывает loadOrderToCart c параметром 1", async () => {
    wrapper = factory(orders);
    await wrapper.vm.handleOrderRepeat(1);

    expect(loadOrderToCart).toHaveBeenCalled();
    expect(loadOrderToCart.mock.calls[0][1]).toBe(1);
  });

  test("Вызывает $router.push", async () => {
    wrapper = factory(orders);

    await wrapper.vm.handleOrderRepeat(1);
    expect(routerPush).toHaveBeenCalledWith("/cart");
  });
});

describe("view Orders, watch.isDataLoaded", () => {
  let wrapper;

  test("Вызывает loadOrder", async () => {
    wrapper = factory(orders);
    wrapper.vm.$store.state.builder.isDataLoaded = true;
    await wrapper.vm.$nextTick();

    expect(loadOrders).toHaveBeenCalled();
  });

  test("Не вызывает loadOrder", async () => {
    wrapper = factory(orders);
    wrapper.vm.$store.state.builder.isDataLoaded = false;
    await wrapper.vm.$nextTick();

    expect(loadOrders).not.toHaveBeenCalled();
  });
});
