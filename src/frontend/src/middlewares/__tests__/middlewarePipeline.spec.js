import middlewarePipeline from "../middlewarePipeline";

describe("middleware pipeline", () => {
  test("return context.next", () => {
    const context = { next: "next middleware" };
    const middlewares = [];

    const value = middlewarePipeline(context, middlewares, 1);
    expect(value).toBe("next middleware");
  });

  test("return nextMiddleware", () => {
    const context = { next: "next middleware" };
    const middlewares = ["one", "two"];

    const value = middlewarePipeline(context, middlewares, 0);
    expect(value).toBeInstanceOf(Function);
  });
});
