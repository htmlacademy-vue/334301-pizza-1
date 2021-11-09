import actions from "../actions";

let dispatch;
let commit;

const setAuthHeader = jest.fn();
const apiLogout = jest.fn();
const apiLogin = jest.fn(() => ({ token: "12345" }));
const apiError = jest.fn().mockRejectedValue(new Error("Api error"));

const mockApi = {
  auth: {
    setAuthHeader,
    logout: apiLogout,
    login: apiLogin,
  },
};

describe("store.modules.auth actions.setAuth", () => {
  actions.$jwt = jest.fn();
  actions.$api = mockApi;

  beforeEach(() => {
    commit = jest.fn();
  });

  test("Возвращает false", async () => {
    actions.$jwt.getToken = jest.fn(() => false);

    const returnedValue = await actions.setAuth({ commit, dispatch });
    expect(returnedValue).toBeFalsy();
  });

  test("Возвращает true", async () => {
    actions.$jwt.getToken = jest.fn(() => "12345");
    dispatch = jest.fn(() => ({ id: 1 }));

    const returnedValue = await actions.setAuth({ commit, dispatch });
    expect(returnedValue).toBeTruthy();
  });

  test("Возвращает вызывает commit", async () => {
    actions.$jwt.getToken = jest.fn(() => "12345");
    dispatch = jest.fn(() => ({ id: 1 }));

    await actions.setAuth({ commit, dispatch });

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      { entity: "isAuthenticated", module: "auth", value: { id: 1 } },
      { root: true }
    );
  });

  test("Возвращает false, если есть недействительный token", async () => {
    actions.$jwt.getToken = jest.fn(() => "12345");
    dispatch = jest.fn(() => null);

    const returnedValue = await actions.setAuth({ commit, dispatch });
    expect(returnedValue).toBeFalsy();
  });
});

describe("store.modules.auth actions.login", () => {
  const saveToken = jest.fn();

  actions.$jwt = jest.fn();
  actions.$api = mockApi;

  beforeEach(() => {
    commit = jest.fn();
    dispatch = jest.fn();
    actions.$jwt.saveToken = saveToken;
  });

  const credentials = {
    email: "test@exapmle.com",
    password: "password",
  };

  test("Вызывает $jwt.saveToken", async () => {
    await actions.login({ commit, dispatch }, credentials);
    expect(saveToken).toHaveBeenCalledWith("12345");
  });

  test("Вызывает $api.auth.setAuthHeader", async () => {
    await actions.login({ commit, dispatch }, credentials);
    expect(setAuthHeader).toHaveBeenCalledWith("12345");
  });

  test("Вызывает commit", async () => {
    await actions.login({ commit, dispatch }, credentials);
    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      { entity: "isAuthenticated", module: "auth", value: true },
      { root: true }
    );
  });

  test("Вызывает dispatch", async () => {
    await actions.login({ commit, dispatch }, credentials);
    expect(dispatch).toHaveBeenCalledWith("getMe");
  });
});

describe("store.modules.auth actions.logout", () => {
  const destroyToken = jest.fn();
  actions.$jwt = jest.fn();

  const setAuthHeader = jest.fn();
  let apiLogout;

  beforeEach(() => {
    apiLogout = jest.fn();

    commit = jest.fn();
    actions.$jwt.destroyToken = destroyToken;
    actions.$api = {
      auth: {
        setAuthHeader,
        logout: apiLogout,
      },
    };
  });

  test("Вызывает $jwt.saveToken", async () => {
    await actions.logout({ commit });
    expect(apiLogout).toHaveBeenCalled();
  });

  test("Не вызывает $jwt.saveToken", async () => {
    await actions.logout({ commit }, false);
    expect(apiLogout).not.toHaveBeenCalled();
  });

  test("Вызывает commit 3 раза", async () => {
    await actions.logout({ commit }, false);
    expect(commit.mock.calls.length).toBe(3);
  });
});

describe("store.modules.auth actions.getMe", () => {
  beforeEach(() => {
    dispatch = jest.fn();
    commit = jest.fn();
  });

  test("Вызывает $api.auth.getMe", async () => {
    const apiGetMe = jest.fn(() => ({ id: 1, name: "user" }));
    actions.$api = {
      auth: { getMe: apiGetMe },
    };

    await actions.getMe({ commit, dispatch });
    expect(apiGetMe).toHaveBeenCalled();
  });

  test("Вызывает commit", async () => {
    const apiGetMe = jest.fn(() => ({ id: 1, name: "user" }));
    actions.$api = {
      auth: { getMe: apiGetMe },
    };

    await actions.getMe({ commit, dispatch });
    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      { entity: "user", module: "auth", value: { id: 1, name: "user" } },
      { root: true }
    );
  });

  test("Возвращает true", async () => {
    const apiGetMe = jest.fn(() => ({ id: 1, name: "user" }));
    actions.$api = {
      auth: { getMe: apiGetMe },
    };

    const returnedValue = await actions.getMe({ commit, dispatch });
    expect(returnedValue).toBeTruthy();
  });

  test("Возвращает false", async () => {
    actions.$api = {
      auth: { getMe: apiError },
    };

    const returnedValue = await actions.getMe({ commit, dispatch });
    expect(returnedValue).toBeFalsy();
  });

  test("Обрабатывает исключение", async () => {
    actions.$api = {
      auth: { getMe: apiError },
    };

    await actions.getMe({ commit, dispatch });
    expect(dispatch).toHaveBeenCalledWith("logout", false);
  });
});

describe("store.modules.auth actions.loadUserAddresses", () => {
  beforeEach(() => {
    dispatch = jest.fn();
    commit = jest.fn();
  });

  test("Вызывает $api.addresses.get", async () => {
    const apiGetAddresses = jest.fn(() => [
      { userId: 1, name: "address 1" },
      { userId: 1, name: "address 3" },
      { userId: 2, name: "address 2" },
    ]);
    actions.$api = {
      addresses: { get: apiGetAddresses },
    };

    const getters = {
      getUser: { id: 1 },
    };

    await actions.loadUserAddresses({ commit, getters });
    expect(commit).toHaveBeenCalledWith(
      "SET_ENTITY",
      {
        entity: "addresses",
        module: "auth",
        value: [
          { name: "address 1", userId: 1 },
          { userId: 1, name: "address 3" },
        ],
      },
      { root: true }
    );
  });

  test("Обрабатывает исключение", async () => {
    jest.spyOn(console, "log").mockImplementation();
    actions.$api = {
      addresses: { get: apiError },
    };
    const getters = jest.fn();

    await actions.loadUserAddresses({ commit, getters });
    expect(console.log).toHaveBeenCalled();
  });
});
