import addresses from "../addresses";

const loadAddresses = jest.fn();
const nextMiddleware = jest.fn();

const factoryStore = (isAuth) => ({
  state: { auth: { isAuthenticated: isAuth } },
  dispatch: loadAddresses,
});

describe("middlewares addresses", () => {
  test("Не вызывает loadUserAddresses", async () => {
    const store = factoryStore(false);
    await addresses({ store, nextMiddleware });
    expect(loadAddresses).not.toHaveBeenCalled();
    expect(nextMiddleware).toHaveBeenCalled();
  });

  test("Вызывает loadUserAddresses", async () => {
    const store = factoryStore(true);
    await addresses({ store, nextMiddleware });
    expect(loadAddresses).toHaveBeenCalledWith("auth/loadUserAddresses");
    expect(nextMiddleware).toHaveBeenCalled();
  });
});
