import Login from "../Login";
import { AppRoute } from "../../common/const/route";
import VueRouter from "vue-router";
import { createLocalVue, enableAutoDestroy, mount } from "@vue/test-utils";

enableAutoDestroy(afterEach);

const user = {
  email: "test@example.com",
  password: "123456",
};

describe("view Login", () => {
  const routes = [
    {
      path: AppRoute.MAIN,
      component: { template: "test" },
    },
  ];
  const localVue = createLocalVue();
  localVue.use(VueRouter);

  const router = new VueRouter({ routes });
  const wrapper = mount(Login, {
    localVue,
    router,
  });

  test("Закрыть форму входа и перейти на главную", async () => {
    await wrapper.find("a.close").trigger("click");

    expect(wrapper.vm.$route.path).toBe(AppRoute.MAIN);
  });
});

describe("view Login method login", () => {
  let routerPush;
  let dispatch;
  let wrapper;

  const mocks = {
    $router: {
      push: routerPush,
    },
    $store: {
      dispatch,
    },
  };

  const stubs = ["router-link"];

  beforeEach(() => {
    routerPush = jest.fn();
    dispatch = jest.fn();
    mocks.$router.push = routerPush;
    mocks.$store.dispatch = dispatch;

    wrapper = mount(Login, {
      mocks,
      stubs,
      attachTo: document.body,
    });
  });

  test("Вызывает функцию login", async () => {
    wrapper.vm.login = jest.fn();
    await wrapper.find('button[type="submit"]').trigger("click");

    expect(wrapper.vm.login).toHaveBeenCalled();
  });

  test("Миксин проверки был вызван при отправке формы", async () => {
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    await wrapper.find("form").trigger("submit");

    expect(spyValidateFields).toHaveBeenCalled();
  });

  test("Миксин проверки return undefined", async () => {
    jest.spyOn(wrapper.vm, "$validateFields").mockImplementation(() => false);

    const returnedValue = await wrapper.vm.login();

    expect(returnedValue).toBeUndefined();
  });

  test("Метод login, не вызывает dispatch. Введен не корректный email", async () => {
    wrapper.find('input[type="email"]').setValue("email");
    wrapper.find('input[type="password"]').setValue(user.password);
    await wrapper.find("form").trigger("submit");

    expect(dispatch).not.toHaveBeenCalled();
    expect(routerPush).not.toHaveBeenCalled();
  });

  test("Метод login, не вызывает dispatch. Введен пустой пароль", async () => {
    wrapper.find('input[type="email"]').setValue(user.email);
    wrapper.find('input[type="password"]').setValue("");
    await wrapper.find("form").trigger("submit");

    expect(dispatch).not.toHaveBeenCalled();
    expect(routerPush).not.toHaveBeenCalled();
  });

  test("Вызывает dispatch. Введены корректные данные", async () => {
    wrapper.find('input[type="email"]').setValue(user.email);
    wrapper.find('input[type="password"]').setValue(user.password);
    await wrapper.find("form").trigger("submit");

    expect(dispatch).toHaveBeenCalled();
    expect(routerPush).toHaveBeenCalled();
  });

  test("Перенаправляет на главную страницу", async () => {
    wrapper.find('input[type="email"]').setValue(user.email);
    wrapper.find('input[type="password"]').setValue(user.password);
    await wrapper.find("form").trigger("submit");

    expect(routerPush).toHaveBeenCalledWith(AppRoute.MAIN);
  });
});
