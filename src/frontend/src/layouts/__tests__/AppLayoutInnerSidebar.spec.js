import { createLocalVue, mount } from "@vue/test-utils";
import VueRouter from "vue-router";
import AppLayoutInnerSidebar from "../AppLayoutInnerSidebar";

const routes = [
  {
    path: "/orders",
    name: "Orders",
  },
  {
    path: "/profile",
    name: "Profile",
  },
];

const router = new VueRouter({ mode: "history", routes });

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("Layout AppLayoutInnerSidebar", () => {
  const wrapper = mount(AppLayoutInnerSidebar, {
    localVue,
    router,
  });

  test("Opened Orders", async () => {
    await wrapper.findAll("a").at(1).trigger("click");
    const activeLink = wrapper.find(".layout__link--active");

    expect(activeLink.text()).toBe("История заказов");
  });

  test("Opened Profile", async () => {
    await wrapper.findAll("a").at(2).trigger("click");
    const activeLink = wrapper.find(".layout__link--active");

    expect(activeLink.text()).toBe("Мои данные");
  });
});
