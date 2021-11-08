import { createLocalVue, enableAutoDestroy, mount } from "@vue/test-utils";
import Vuex from "vuex";
import AppLayoutHeader from "../AppLayoutHeader";
import VueRouter from "vue-router";

const mockUser = {
  name: "Вася Пупкин",
  avatar: "/public/img/users/user.jpg",
};

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const logout = jest.fn();

const factoryStore = ({ isAuthenticated, user }) => {
  const mockStore = {
    modules: {
      Auth: {
        namespaced: true,
        state: {
          isAuthenticated,
          user,
        },
        actions: {
          logout,
        },
      },
      Cart: {
        namespaced: true,
        getters: {
          totalPrice: () => 131,
        },
      },
    },
  };

  return new Vuex.Store(mockStore);
};

const factory = (userStoreData) => {
  const router = new VueRouter({ mode: "abstract" });
  const store = factoryStore(userStoreData);

  return mount(AppLayoutHeader, {
    localVue,
    store,
    router,
  });
};

enableAutoDestroy(afterEach);

describe("layout AppLayoutHeader.spec", () => {
  let wrapper;

  test("Specific header if user is not authenticated", () => {
    wrapper = factory({ isAuthenticated: false, user: null });
    const loginLink = wrapper.find(".header__login");

    expect(loginLink).toBeTruthy();
  });

  test("Specific header if user is not authenticated", () => {
    wrapper = factory({ isAuthenticated: false, user: null });
    const loginLink = wrapper.find(".header__login");

    expect(loginLink).toBeTruthy();
  });

  test("Specific header if user is authenticated with correct user data", () => {
    wrapper = factory({ isAuthenticated: true, user: { ...mockUser } });
    const logoutButton = wrapper.find(".header__logout");
    const profileImage = wrapper.findAll("img").at(1);

    expect(logoutButton).toBeTruthy();
    expect(profileImage).toBeTruthy();
    expect(profileImage.attributes().src).toBe(mockUser.avatar);
    expect(profileImage.attributes().alt).toBe(mockUser.name);
  });

  test("Logout button emits specific action", async () => {
    wrapper = factory({ isAuthenticated: true, user: { ...mockUser } });
    const logoutButton = wrapper.find(".header__logout");

    await logoutButton.trigger("click");

    expect(logout).toHaveBeenCalled();
  });

  test("Cart dispalys correct total price", () => {
    wrapper = factory({ isAuthenticated: false, user: null });
    const cartLink = wrapper.find(".header__cart a");

    expect(cartLink.text()).toBe("131 ₽");
  });
});
