import { createLocalVue, mount } from "@vue/test-utils";
import AppSideBar from "../AppSideBar";
import VueRouter from "vue-router";
import { AppRoute, RouteName } from "../../const/route";

const routes = [
  {
    path: AppRoute.MAIN,
    name: RouteName.HOME,
  },
  {
    path: AppRoute.PROFILE,
    name: RouteName.PROFILE,
  },
  {
    path: AppRoute.ORDERS,
    name: RouteName.ORDERS,
  },
];
const router = new VueRouter({ mode: "history", routes });

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("Компонент AppSideBar", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AppSideBar, {
      localVue,
      router,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("Успешно отрисовывается", () => {
    expect(wrapper.find("img").exists()).toBeTruthy();
    expect(wrapper.text()).toContain("История заказов");
    expect(wrapper.text()).toContain("Мои данные");
  });

  test("Вызывает Главная страница", async () => {
    await wrapper.findAll("a").at(0).trigger("click");
    const activeLink = wrapper.find(".router-link-active");
    const img = activeLink.find("img");

    expect(img.attributes("alt")).toBe("V!U!E! Pizza logo");
  });

  test("Вызывает История заказов", async () => {
    await wrapper.findAll("a").at(1).trigger("click");
    const activeLink = wrapper.find(".layout__link--active");

    expect(activeLink.text()).toBe("История заказов");
  });

  test("Вызывает Мои данные", async () => {
    await wrapper.findAll("a").at(2).trigger("click");
    const activeLink = wrapper.find(".layout__link--active");

    expect(activeLink.text()).toBe("Мои данные");
  });
});
