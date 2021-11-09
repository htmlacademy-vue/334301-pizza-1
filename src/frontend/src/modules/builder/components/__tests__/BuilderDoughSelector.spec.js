import { createLocalVue, enableAutoDestroy, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { dough } from "../../../../static/pizza.json";
import BuilderDoughSelector from "../BuilderDoughSelector";
import { render } from "@vue/server-test-utils";

enableAutoDestroy(afterEach);

const setDough = jest.fn();

const mockStore = {
  modules: {
    builder: {
      namespaced: true,
      actions: {
        setDough,
      },
      getters: {
        pizza: () => ({ dough: { id: 1 } }),
        doughs: () => dough,
      },
    },
  },
};

const localVue = createLocalVue();
localVue.use(Vuex);
const store = new Vuex.Store(mockStore);

const factory = () => {
  return mount(BuilderDoughSelector, { localVue, store });
};

describe("Компонент BuilderDoughSelector", () => {
  let wrapper;

  test("Отрисовывает 2 кнопки", () => {
    wrapper = factory();
    const buttons = wrapper.findAll('input[name="dough"]');

    expect(buttons.length).toBe(2);
  });

  test("По умолчанию выбрана 1 кнопка", async () => {
    wrapper = await render(BuilderDoughSelector, { localVue, store });
    const button = wrapper.find('input[name="dough"]');

    expect(button.attr("checked")).toBe("checked");
    expect(button.attr("value")).toBe("Тонкое");
  });

  test("Вызывает action 'builder/setDough'", async () => {
    wrapper = factory();
    const button = wrapper.find("label:nth-child(2) input");
    await button.trigger("change");

    expect(setDough).toHaveBeenCalled();
    expect(setDough.mock.calls[0][1]).toBe("Толстое");
  });
});
