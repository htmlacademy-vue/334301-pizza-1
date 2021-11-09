import { createLocalVue, enableAutoDestroy, mount } from "@vue/test-utils";
import Vuex from "vuex";
import BuilderSauceSelector from "../BuilderSauceSelector";
import { render } from "@vue/server-test-utils";

enableAutoDestroy(afterEach);

const localVue = createLocalVue();
localVue.use(Vuex);

const setSauce = jest.fn();

const factoryStore = (sauceId) => {
  return {
    modules: {
      builder: {
        namespaced: true,
        actions: {
          setSauce,
        },
        getters: {
          pizza: () => ({ sauce: { id: sauceId } }),
          sauces: () => [
            {
              id: 1,
              name: "Томатный",
            },
            {
              id: 2,
              name: "Сливочный",
            },
          ],
        },
      },
    },
  };
};

const factory = (sauceId = 1) => {
  const mockStore = factoryStore(sauceId);
  const store = new Vuex.Store(mockStore);

  return mount(BuilderSauceSelector, { localVue, store });
};

describe("Компонент BuilderSauceSelector", () => {
  let wrapper;

  test("Отображает текст 'Основной соус: Томатный Сливочный'", () => {
    wrapper = factory();

    expect(wrapper.text()).toContain("Основной соус:");
    expect(wrapper.text()).toContain("Томатный");
    expect(wrapper.text()).toContain("Сливочный");
  });

  test("Отображает выбранный соус 'Сливочный'", async () => {
    const mockStore = factoryStore(1);
    const store = new Vuex.Store(mockStore);
    wrapper = await render(BuilderSauceSelector, { localVue, store });

    const radioButton = wrapper.find('input[name="sauce"]');
    expect(radioButton.attr("checked")).toBe("checked");
  });

  test("Вызывает setSauce cо значение Сливочный", async () => {
    wrapper = factory();

    const radioButtons = wrapper.findAll('input[name="sauce"]');
    await radioButtons.at(1).trigger("change");

    expect(setSauce).toHaveBeenCalled();
    expect(setSauce.mock.calls[0][1]).toBe("Сливочный");
  });
});
