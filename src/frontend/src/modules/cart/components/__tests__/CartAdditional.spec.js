import { createLocalVue, enableAutoDestroy, mount } from "@vue/test-utils";
import Vuex from "vuex";
import misc from "../../../../static/misc.json";
import CartAdditional from "../CartAdditional";
import { normalizeAdditional } from "../../../../common/utils/helpers/normalize";

enableAutoDestroy(afterEach);

const localVue = createLocalVue();
localVue.use(Vuex);

const increment = jest.fn();
const decrement = jest.fn();
const changeCount = jest.fn();
const additional = misc.map((item) => normalizeAdditional(item));

const factoryStore = () => {
  return {
    modules: {
      cart: {
        namespaced: true,
        actions: { increment, decrement, changeCount },
        getters: {
          getAdditional: () => additional,
        },
      },
    },
  };
};

const factory = () => {
  const mockStore = factoryStore();
  const store = new Vuex.Store(mockStore);

  return mount(CartAdditional, { localVue, store });
};

describe("Компонент CartAdditional", () => {
  let wrapper;

  test("Отображает список из 3 элементов", () => {
    wrapper = factory();

    const listItems = wrapper.findAll("li.additional-list__item");

    expect(listItems.length).toBe(3);
  });

  test("Правильно отображает элементы списка", () => {
    wrapper = factory();

    const additionalNames = wrapper.findAll("p.additional-list__description");

    expect(additionalNames.at(0).text()).toBe("Cola-Cola 0,5 литра");
    expect(additionalNames.at(1).text()).toBe("Острый соус");
    expect(additionalNames.at(2).text()).toBe("Картошка из печи");
  });

  test("Правильно отображает цену", () => {
    wrapper = factory();

    const additionalNames = wrapper.findAll("div.additional-list__price");

    expect(additionalNames.at(0).text()).toBe("56 ₽");
    expect(additionalNames.at(1).text()).toBe("10 ₽");
    expect(additionalNames.at(2).text()).toBe("170 ₽");
  });
});
