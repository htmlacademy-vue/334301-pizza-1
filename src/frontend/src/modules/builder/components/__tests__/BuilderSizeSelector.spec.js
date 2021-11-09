import { createLocalVue, enableAutoDestroy, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { render } from "@vue/server-test-utils";
import BuilderSizeSelector from "../BuilderSizeSelector";

enableAutoDestroy(afterEach);

const localVue = createLocalVue();
localVue.use(Vuex);

const setSize = jest.fn();

const factoryStore = (sizeId) => {
  return {
    modules: {
      builder: {
        namespaced: true,
        actions: {
          setSize,
        },
        getters: {
          pizza: () => ({ size: { id: sizeId } }),
          sizes: () => [
            {
              id: 1,
              name: "23 см",
            },
            {
              id: 2,
              name: "32 см",
            },
            {
              id: 3,
              name: "45 см",
            },
          ],
        },
      },
    },
  };
};

const factory = (sizeId = 1) => {
  const mockStore = factoryStore(sizeId);
  const store = new Vuex.Store(mockStore);

  return mount(BuilderSizeSelector, { localVue, store });
};

describe("Компонент BuilderSizeSelector", () => {
  let wrapper;

  test("Отображает текст 'Выберите размер 23cм 32см 45см'", () => {
    wrapper = factory();

    expect(wrapper.text()).toContain("Выберите размер");
    expect(wrapper.text()).toContain("23 см");
    expect(wrapper.text()).toContain("32 см");
    expect(wrapper.text()).toContain("45 см");
  });

  test("Отображает выбранный размер '23 см'", async () => {
    const mockStore = factoryStore(1);
    const store = new Vuex.Store(mockStore);
    wrapper = await render(BuilderSizeSelector, { localVue, store });

    const radioButton = wrapper.find('input[name="diameter"]');
    expect(radioButton.attr("checked")).toBe("checked");
  });

  test("Вызывает setSize cо значение 32 см", async () => {
    wrapper = factory();

    const radioButtons = wrapper.findAll('input[name="diameter"]');
    await radioButtons.at(1).trigger("change");

    expect(setSize).toHaveBeenCalled();
    expect(setSize.mock.calls[0][1]).toBe("32 см");
  });
});
