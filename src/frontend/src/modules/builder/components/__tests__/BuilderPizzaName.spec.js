import {
  createLocalVue,
  enableAutoDestroy,
  mount,
  shallowMount,
} from "@vue/test-utils";
import Vuex from "vuex";
import BuilderPizzaName from "../BuilderPizzaName";

enableAutoDestroy(afterEach);

const setName = jest.fn();

const mockStore = {
  modules: {
    builder: {
      namespaced: true,
      actions: {
        setName,
      },
      getters: {
        pizza: () => ({ name: "Test Pizza" }),
      },
    },
  },
};

const localVue = createLocalVue();
localVue.use(Vuex);
const store = new Vuex.Store(mockStore);

describe("Компонент BuilderPizzaName", () => {
  let wrapper;

  test("Правильно отрисовывает", () => {
    wrapper = mount(BuilderPizzaName, {
      localVue,
      store,
    });

    expect(wrapper.text()).toContain("Название пиццы");
    expect(wrapper.find("input").element.value).toBe("Test Pizza");
  });

  test("Вызывает setCount", async () => {
    wrapper = shallowMount(BuilderPizzaName, {
      localVue,
      store,
    });

    const input = wrapper.find("input");
    await input.setValue("New name");

    expect(setName).toHaveBeenCalled();
    expect(setName.mock.calls[0][1]).toBe("New name");
  });
});
