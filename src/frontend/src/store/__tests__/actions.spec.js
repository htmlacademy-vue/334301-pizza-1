import actions from "../actions";
jest.mock("lodash", () => ({
  uniqueId: () => 100,
}));

describe("actions.init", () => {
  test("init dispatch был вызван 4 раза", async () => {
    const dispatch = jest.fn();

    await actions.init({ dispatch });

    expect(dispatch.mock.calls.length).toBe(4);
  });

  test("init dispatch был вызван с параметрами", async () => {
    const dispatch = jest.fn();

    await actions.init({ dispatch });

    expect(dispatch.mock.calls[0][0]).toBe("cart/loadData");
    expect(dispatch.mock.calls[1][0]).toBe("builder/loadData");
    expect(dispatch.mock.calls[2][0]).toBe("builder/init");

    expect(dispatch).toHaveBeenLastCalledWith("cart/init");
  });
});

describe("actions.createNotification", () => {
  const notification = { text: "text", type: "info" };

  test("commit был вызван", async () => {
    const commit = jest.fn();
    await actions.createNotification({ commit }, notification);

    expect(commit).toHaveBeenCalledWith("ADD_NOTIFICATION", {
      id: 100,
      text: "text",
      type: "info",
    });
  });

  test("setTimeout был вызван", async () => {
    const commit = jest.fn();

    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");

    await actions.createNotification({ commit }, notification);

    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  test("setTimeout вызывает commit DELETE_NOTIFICATION", async () => {
    const commit = jest.fn();
    jest.spyOn(global, "setTimeout");

    await actions.createNotification({ commit }, notification);
    jest.runAllTimers();

    expect(commit).toHaveBeenLastCalledWith("DELETE_NOTIFICATION", 100);
  });
});
