import Auth from "../auth";
import axios from "../../../plugins/axios";

describe("AuthApiService", () => {
  const AuthApiService = new Auth({});

  test("setAuthHeader", () => {
    AuthApiService.setAuthHeader("12345");

    expect(axios.defaults.headers.common["Authorization"]).toBe("Bearer 12345");
  });

  test("setAuthHeader null", () => {
    AuthApiService.setAuthHeader();

    expect(axios.defaults.headers.common).not.toContain("Authorization");
  });

  test("login", async () => {
    const post = jest.fn(() => {
      return { data: { logged: true } };
    });
    axios.post = post;

    const isLogged = await AuthApiService.login({
      email: "email",
      pass: "pass",
    });

    expect(post).toHaveBeenCalledWith("login", {
      email: "email",
      pass: "pass",
    });
    expect(isLogged).toStrictEqual({ logged: true });
  });

  test("logout", async () => {
    const queryDelete = jest.fn(() => {
      return { data: { logged: false } };
    });
    axios.delete = queryDelete;

    const isLogged = await AuthApiService.logout();

    expect(queryDelete).toHaveBeenCalledWith("logout");
    expect(isLogged).toStrictEqual({ logged: false });
  });

  test("getMe", async () => {
    const get = jest.fn(() => {
      return { data: { name: "User" } };
    });
    axios.get = get;

    const iAm = await AuthApiService.getMe();

    expect(get).toHaveBeenCalledWith("whoAmI");
    expect(iAm).toStrictEqual({ name: "User" });
  });
});
