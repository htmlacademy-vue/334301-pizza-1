import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import store from "../index";

describe("store", () => {
  test("Начальное состояние notifications = []", () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    expect(store.state.notifications).toStrictEqual([]);
  });
});
