import { enableAutoDestroy, shallowMount } from "@vue/test-utils";
import AppNotifications from "../AppNotifications";

const mocks = {
  $store: {
    state: {
      notifications: [],
    },
  },
};

const factory = () => {
  return shallowMount(AppNotifications, { mocks });
};

enableAutoDestroy(afterEach);

describe("Компонент AppNotifications", () => {
  let wrapper;

  afterEach(() => {
    wrapper.destroy();
    mocks.$store.state.notifications = [];
  });

  test("Компонент не отображается", () => {
    wrapper = factory();

    expect(wrapper.html()).toBeFalsy();
  });

  test("Показывает успешное сообщение", () => {
    mocks.$store.state.notifications = [{ text: "Test", type: "success" }];
    wrapper = factory();

    expect(wrapper.html()).toContain("notification--success");
    expect(wrapper.text()).toBe("Test");
  });

  test("Показывает сообщение об ошибке", () => {
    mocks.$store.state.notifications = [{ text: "Ошибка", type: "error" }];
    wrapper = factory();

    expect(wrapper.html()).toContain("notification--error");
    expect(wrapper.text()).toBe("Ошибка");
  });
});
