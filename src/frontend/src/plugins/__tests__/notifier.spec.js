import Notifier from "../notifier";

describe("plugins notifier", () => {
  const paramCreate = "createNotification";
  const dispatch = jest.fn();
  const store = { dispatch };
  const notifier = new Notifier(store);

  test("info", () => {
    notifier.info("text info");
    expect(dispatch).toHaveBeenCalledWith(paramCreate, {
      text: "text info",
      type: "info",
    });
  });

  test("success", () => {
    notifier.success("text success");
    expect(dispatch).toHaveBeenCalledWith(paramCreate, {
      text: "text success",
      type: "success",
    });
  });

  test("error", () => {
    notifier.error("text error");
    expect(dispatch).toHaveBeenCalledWith(paramCreate, {
      text: "text error",
      type: "error",
    });
  });

  test("warning", () => {
    notifier.warning("text warning");
    expect(dispatch).toHaveBeenCalledWith(paramCreate, {
      text: "text warning",
      type: "warning",
    });
  });
});
