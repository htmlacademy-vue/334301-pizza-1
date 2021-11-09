import {
  createLocalVue,
  enableAutoDestroy,
  shallowMount,
} from "@vue/test-utils";
import Vuex from "vuex";
import { ingredients } from "../../../../static/pizza.json";
import { normalizeIngredient } from "../../../../common/utils/helpers/normalize";
import BuilderPizzaView from "../BuilderPizzaView";

enableAutoDestroy(afterEach);

const slots = { pizzaName: "Pizza Name", pizzaPrice: "Price 10" };
const setIngredient = jest.fn();
const mockIngredients = ingredients
  .slice(0, 3)
  .map((item) => normalizeIngredient(item));

const factoryIngredient = (count) => ({ ...mockIngredients[0], count });
const factoryStore = (doughName, sauceName) => {
  const dough = { name: doughName ? doughName : "Тонкое" };
  const sauce = { name: sauceName ? sauceName : "Томатный" };
  return {
    modules: {
      builder: {
        namespaced: true,
        actions: {
          setIngredient,
        },
        getters: {
          pizza: () => ({
            dough,
            sauce,
            ingredients: mockIngredients.map((item) => ({ ...item, count: 1 })),
          }),
        },
      },
    },
  };
};

const factory = (doughName = null, sauceName = null) => {
  const mockStore = factoryStore(doughName, sauceName);
  const store = new Vuex.Store(mockStore);
  return shallowMount(BuilderPizzaView, { localVue, store, slots });
};

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Компонент BuilderPizzaView", () => {
  let wrapper;

  test("Правильно отображает", async () => {
    wrapper = factory();

    expect(wrapper.html()).toContain(slots.pizzaName);
    expect(wrapper.html()).toContain(slots.pizzaPrice);
    expect(wrapper.findAll("div.pizza__filling").length).toBe(3);
  });
});

describe("Компонент BuilderPizzaView. Метод getFillingClass", () => {
  let wrapper;

  test("Должен вернуть 'pizza__filling--mushrooms'", () => {
    wrapper = factory();

    const ingredient = factoryIngredient(1);

    const className = wrapper.vm.getFillingClass(ingredient);
    expect(className).toBe("pizza__filling--mushrooms");
  });

  test("Должен вернуть 'pizza__filling--mushrooms pizza__filling--second'", () => {
    wrapper = factory();

    const ingredient = factoryIngredient(2);

    const className = wrapper.vm.getFillingClass(ingredient);
    expect(className).toBe("pizza__filling--mushrooms pizza__filling--second");
  });

  test("Должен вернуть 'pizza__filling--mushrooms pizza__filling--third'", () => {
    wrapper = factory();

    const ingredient = factoryIngredient(3);

    const className = wrapper.vm.getFillingClass(ingredient);
    expect(className).toBe("pizza__filling--mushrooms pizza__filling--third");
  });
});

describe("Компонент BuilderPizzaView. Метод addIngredient", () => {
  let wrapper;

  test("Должен вернуть 'pizza__filling--mushrooms'", () => {
    wrapper = factory();

    const ingredient = factoryIngredient(1);

    wrapper.vm.addIngredient(ingredient);
    expect(setIngredient).toHaveBeenCalled();
    expect(setIngredient.mock.calls[0][1]).toStrictEqual({
      ingredientId: 1,
      count: 2,
    });
  });
});

describe("Компонент BuilderPizzaView. computed.pizzaFoundationClass", () => {
  let wrapper;
  const doughName = "Толстое";
  const sauceName = "Сливочный";

  test("Должен вернуть 'pizza--foundation--small-tomato'", () => {
    wrapper = factory();

    expect(wrapper.vm.pizzaFoundationClass).toBe(
      "pizza--foundation--small-tomato"
    );
  });

  test("Должен вернуть 'pizza--foundation--big-tomato'", () => {
    wrapper = factory("Толстое");

    expect(wrapper.vm.pizzaFoundationClass).toBe(
      "pizza--foundation--big-tomato"
    );
  });

  test("Должен вернуть 'pizza--foundation--small-creamy'", () => {
    wrapper = factory(null, sauceName);

    expect(wrapper.vm.pizzaFoundationClass).toBe(
      "pizza--foundation--small-creamy"
    );
  });

  test("Должен вернуть 'pizza--foundation--big-creamy'", () => {
    wrapper = factory(doughName, sauceName);

    expect(wrapper.vm.pizzaFoundationClass).toBe(
      "pizza--foundation--big-creamy"
    );
  });
});
