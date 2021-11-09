import getters from "../getters";
import { Entity } from "../const";

describe("store.modules.auth getters", () => {
  test("getUser должен вернуть {id: 1, name: user}", () => {
    const mockUser = { id: 1, name: "user" };
    const state = {
      [Entity.USER]: mockUser,
    };

    expect(getters.getUser(state)).toStrictEqual(mockUser);
  });

  test("getUser должен вернуть null", () => {
    const mockUser = null;
    const state = {
      [Entity.USER]: mockUser,
    };

    expect(getters.getUser(state)).toStrictEqual(mockUser);
  });

  test("getUserAddresses должен вернуть []", () => {
    const mockAddresses = [];
    const state = {
      [Entity.ADDRESSES]: mockAddresses,
    };

    expect(getters.getUserAddresses(state)).toStrictEqual(mockAddresses);
  });

  test("getUserAddresses должен вернуть адреса", () => {
    const mockAddresses = [{ id: 1 }, { id: 2 }];
    const state = {
      [Entity.ADDRESSES]: mockAddresses,
    };

    expect(getters.getUserAddresses(state)).toStrictEqual(mockAddresses);
  });
});
