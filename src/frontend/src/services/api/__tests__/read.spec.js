import Read from "../read";
import axios from "../../../plugins/axios";

describe("ReadApiService", () => {
  const ReadApiService = new Read({});

  test("get", async () => {
    axios.get = jest.fn(() => ({ data: { success: true } }));

    const data = await ReadApiService.get("resource");
    expect(data).toStrictEqual({ success: true });
  });
});
