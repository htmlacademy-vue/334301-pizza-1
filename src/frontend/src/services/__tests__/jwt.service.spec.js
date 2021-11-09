import jwt from "../jwt.service";

const key = "token";

describe("services jwt", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("getToken null", () => {
    expect(jwt.getToken()).toBe(null);
  });

  test("getToken 12345", () => {
    window.localStorage.setItem(key, "12345");
    expect(jwt.getToken()).toBe("12345");
  });

  test("saveToken 12345", () => {
    jwt.saveToken("12345");
    expect(window.localStorage.getItem(key)).toBe("12345");
  });

  test("destroyToken", () => {
    window.localStorage.setItem(key, "12345");
    jwt.destroyToken();
    expect(window.localStorage.getItem(key)).toBe(null);
  });
});
