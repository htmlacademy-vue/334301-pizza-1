import logout from "../logout";
import { enableAutoDestroy, shallowMount } from "@vue/test-utils";
import { Message } from "../../const/common";

const routePush = jest.fn();
const notifierSuccess = jest.fn();
const dispatch = jest.fn();

enableAutoDestroy(afterEach);

describe("Тест миксин $logout", () => {
  let wrapper;

  const Component = {
    render() {},
    mixins: [logout],
  };

  const mocks = {
    $router: {
      push: routePush,
    },
    $notifier: {
      success: notifierSuccess,
    },
    $store: {
      dispatch,
    },
  };

  beforeEach(() => {
    wrapper = shallowMount(Component, { mocks });
  });

  test("Вызван $route.push", async () => {
    await wrapper.vm.$logout();

    expect(routePush).toHaveBeenCalledWith("/");
  });

  test("Вызван $store.dispatch", async () => {
    await wrapper.vm.$logout();

    expect(dispatch).toHaveBeenCalledWith("auth/logout");
  });

  test("Вызван $notifier", async () => {
    await wrapper.vm.$logout();

    expect(notifierSuccess).toHaveBeenCalledWith(Message.LOGOUT_SUCCESS);
  });
});
