import { createLocalVue, enableAutoDestroy, mount } from "@vue/test-utils";
import Vuex from "vuex";
import AppHeader from "../AppHeader";
import VueRouter from "vue-router";
import { AppRoute } from "../../const/route";

const routes = [
  {
    path: AppRoute.MAIN,
  },
  {
    path: AppRoute.CART,
  },
  {
    path: AppRoute.LOGIN,
  },
  {
    path: AppRoute.LOGIN_INDEX,
  },
  {
    path: AppRoute.PROFILE,
  },
];

const user = {
  name: "Вася Пупкин",
  avatar: "/public/img/users/user.jpg",
};

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const factoryStore = (user) => {
  const mockStore = {
    modules: {
      auth: {
        namespaced: true,
        getters: {
          getUser: () => user,
        },
      },
      cart: {
        namespaced: true,
        getters: {
          price: () => 0,
        },
      },
    },
  };

  return new Vuex.Store(mockStore);
};

const factory = (user) => {
  const router = new VueRouter({ routes, mode: "abstract" });
  const store = factoryStore(user);

  return mount(AppHeader, {
    localVue,
    store,
    router,
  });
};

enableAutoDestroy(afterEach);

describe("Компонент AppHeader", () => {
  let wrapper;

  test("Правильно отрисовывает, если пользователь не вошел в систему", () => {
    wrapper = factory(null);
    const links = wrapper.findAll("a");

    expect(links.length).toBe(3);
    expect(links.at(1).text()).toBe("0 ₽");
    expect(links.at(2).text()).toBe("Войти");
  });

  test("Правильно отрисовывает, если пользователь вошел в систему", () => {
    wrapper = factory(user);

    const links = wrapper.findAll("a");

    expect(links.length).toBe(4);
    expect(links.at(2).text()).toBe(user.name);
    expect(links.at(2).html()).toContain("img");
  });
});

describe("Компонент AppHeader. Маршруты", () => {
  let wrapper;

  test("Переходит в Profile", async () => {
    wrapper = factory(user);

    const link = wrapper.find("div.header__user a");
    await link.trigger("click");

    expect(wrapper.vm.$route.path).toBe(AppRoute.PROFILE);
  });

  test("Ссылка на вход должна указывать на 'login-index'", async () => {
    wrapper = factory(null);

    const link = wrapper.find("a.header__login");
    expect(link.attributes("href")).toBe(`/${AppRoute.LOGIN_INDEX}`);
  });

  test("Ссылка на вход должна указывать на 'login'", async () => {
    wrapper = factory(null);
    const linkCart = wrapper.find("div.header__cart a");
    await linkCart.trigger("click");

    const link = wrapper.find("a.header__login");

    expect(link.attributes("href")).toBe(AppRoute.LOGIN);
  });

  test("Маршрут /cart, ссылка должна быть заблокирована", async () => {
    wrapper = factory(null);

    const link = wrapper.find("div.header__cart a");
    await link.trigger("click");

    expect(link.classes()).toContain("disabled");
  });

  test("Маршрут /, ссылка на корзину должна быть разблокирована", async () => {
    wrapper = factory(null);
    const link = wrapper.find("div.header__cart a");

    expect(link.classes()).not.toContain("disabled");
  });
});
