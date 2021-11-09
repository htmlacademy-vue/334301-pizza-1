import { createLocalVue, enableAutoDestroy, mount } from "@vue/test-utils";
import { ingredients } from "../../../../static/pizza.json";
import Vuex from "vuex";
import BuilderIngredientsSelector from "../BuilderIngredientsSelector";
import { normalizeIngredient } from "../../../../common/utils/helpers/normalize";

enableAutoDestroy(afterEach);

const setIngredient = jest.fn();

const mockStore = {
  modules: {
    builder: {
      namespaced: true,
      actions: {
        setIngredient,
      },
      getters: {
        pizza: () => ({ dough: { id: 1 } }),
        ingredients: () =>
          ingredients.slice(0, 3).map((item) => normalizeIngredient(item)),
      },
    },
  },
};

const slots = { default: "test slot" };

const localVue = createLocalVue();
localVue.use(Vuex);
const store = new Vuex.Store(mockStore);

const factory = () => {
  return mount(BuilderIngredientsSelector, { localVue, store, slots });
};

describe("Компонент BuilderIngredientsSelector", () => {
  let wrapper;

  test("Правильно отрисовывает слот", () => {
    wrapper = factory();

    expect(wrapper.html()).toContain(slots.default);
  });

  test("Правильно отрисовывает список ингредиентов", () => {
    wrapper = factory();

    const items = wrapper.findAll("li.ingredients__item");
    expect(items.length).toBe(3);
  });

  test("Вызывает setCount", async () => {
    wrapper = factory();

    const buttonPlus = wrapper.find(
      "li.ingredients__item button.counter__button--plus"
    );
    await buttonPlus.trigger("click");

    expect(setIngredient).toHaveBeenCalled();
    expect(setIngredient.mock.calls[0][1]).toStrictEqual({
      count: 1,
      ingredientId: 1,
    });
  });
});
