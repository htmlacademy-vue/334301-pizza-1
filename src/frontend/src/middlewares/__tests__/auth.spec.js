import auth from "../auth";
import { enableAutoDestroy } from "@vue/test-utils";

enableAutoDestroy(afterEach);

let nextMiddleware;
let next;

const factoryStore = (isAuth, setAuth) => ({
  state: { auth: { isAuthenticated: isAuth } },
  dispatch: setAuth,
});

describe("middleware auth", () => {
  beforeEach(() => {
    nextMiddleware = jest.fn();
    next = jest.fn();
  });

  test("Пользователь аутентифицирован", async () => {
    const setAuth = jest.fn();
    const store = factoryStore(true, setAuth);

    await auth({ next, store, nextMiddleware });
    expect(setAuth).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(nextMiddleware).toHaveBeenCalled();
  });

  test("Пользователь не аутентифицирован, аутентификация успех", async () => {
    const setAuth = jest.fn(() => true);
    const store = factoryStore(false, setAuth);

    await auth({ next, store, nextMiddleware });
    expect(setAuth).toHaveBeenCalledWith("auth/setAuth");
    expect(next).not.toHaveBeenCalled();
    expect(nextMiddleware).toHaveBeenCalled();
  });

  test("Пользователь не аутентифицирован, аутентификация неудача", async () => {
    const setAuth = jest.fn(() => false);
    const store = factoryStore(false, setAuth);

    await auth({ next, store, nextMiddleware });
    expect(setAuth).toHaveBeenCalledWith("auth/setAuth");
    expect(next).toHaveBeenCalledWith("/login");
  });
});
