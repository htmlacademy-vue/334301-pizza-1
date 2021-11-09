import Crud from "../crud";

import axios from "../../../plugins/axios";

const responseData = { data: { success: true } };

describe("CrudApiService", () => {
  const CrudApiService = new Crud("auth", {});

  test("get", async () => {
    const get = jest.fn(() => responseData);
    axios.get = get;

    const data = await CrudApiService.get();
    expect(get).toHaveBeenCalledWith("auth");
    expect(data).toStrictEqual({ success: true });
  });

  test("post", async () => {
    const post = jest.fn(() => responseData);
    axios.post = post;

    const data = await CrudApiService.post({ id: 1 });
    expect(post).toHaveBeenCalledWith("auth", { id: 1 });
    expect(data).toStrictEqual({ success: true });
  });

  test("put", async () => {
    const put = jest.fn(() => responseData);
    axios.put = put;

    const data = await CrudApiService.put({ id: 100, name: "user" });
    expect(put).toHaveBeenCalledWith("auth/100", { id: 100, name: "user" });
    expect(data).toStrictEqual({ success: true });
  });

  test("delete", async () => {
    const deleteQuery = jest.fn(() => responseData);
    axios.delete = deleteQuery;

    const data = await CrudApiService.delete(2);
    expect(deleteQuery).toHaveBeenCalledWith("auth/2");
    expect(data).toStrictEqual({ success: true });
  });
});
