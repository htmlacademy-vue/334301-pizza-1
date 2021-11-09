import isLogged from "../isLogged";
import { enableAutoDestroy } from "@vue/test-utils";

enableAutoDestroy(afterEach);
let next;
let nextMiddleware;

const factoryStore = (getToken) => {
  return {
    $jwt: { getToken },
  };
};

describe("middleware isLogged", () => {
  beforeEach(() => {
    next = jest.fn();
    nextMiddleware = jest.fn();
  });

  test("Переaдресация на /profile", async () => {
    const store = factoryStore(() => true);
    await isLogged({ store, next, nextMiddleware });
    expect(next).toHaveBeenCalledWith("/profile");
    expect(nextMiddleware).toHaveBeenCalled();
  });

  test("jwt нет, nextMiddleware", async () => {
    const store = factoryStore(() => false);
    await isLogged({ store, next, nextMiddleware });
    expect(next).not.toHaveBeenCalled();
    expect(nextMiddleware).toHaveBeenCalled();
  });
});
