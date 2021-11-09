import user from "../user";
import { enableAutoDestroy } from "@vue/test-utils";

enableAutoDestroy(afterEach);

let nextMiddleware;

const factoryStore = (isAuth, setAuth) => ({
  state: { auth: { isAuthenticated: isAuth } },
  dispatch: setAuth,
});

describe("middleware user", () => {
  beforeEach(() => {
    nextMiddleware = jest.fn();
  });

  test("Пользователь аутентифицирован. Не вызывает setAuth", async () => {
    const setAuth = jest.fn();
    const store = factoryStore(true, setAuth);
    await user({ store, nextMiddleware });

    expect(setAuth).not.toHaveBeenCalled();
    expect(nextMiddleware).toHaveBeenCalled();
  });

  test("Пользователь не аутентифицирован. Вызывает setAuth", async () => {
    const setAuth = jest.fn();
    const store = factoryStore(false, setAuth);
    await user({ store, nextMiddleware });

    expect(setAuth).toHaveBeenCalledWith("auth/setAuth");
    expect(nextMiddleware).toHaveBeenCalled();
  });
});
