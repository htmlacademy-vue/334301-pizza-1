import {
  INGREDIENT_MAX_COUNT,
  INGREDIENT_MIN_COUNT,
} from "../../../common/const/common";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSize,
} from "../../../common/utils/helpers/normalize";
import { SET_ENTITY, UPDATE_ENTITY } from "../../mutation-types";
import { MODULE, Entity } from "./const";
import resources from "../../../common/enums/resources";

const module = MODULE;

export default {
  async loadData({ dispatch, commit }) {
    await Promise.all([
      dispatch("loadDough"),
      dispatch("loadSizes"),
      dispatch("loadSauces"),
      dispatch("loadedIngredients"),
    ]);

    commit(
      SET_ENTITY,
      { module, entity: Entity.IS_DATA_LOADED, value: true },
      { root: true }
    );
  },

  async loadedIngredients({ commit }) {
    const value = await this.$api.fetchData.get(resources.INGREDIENTS);
    commit(
      SET_ENTITY,
      { entity: Entity.LOADED_INGREDIENTS, module, value },
      { root: true }
    );
  },

  async loadSizes({ commit }) {
    const sizes = await this.$api.fetchData.get(resources.SIZES);
    const value = sizes.slice(0, 3).map((size) => normalizeSize(size));
    commit(SET_ENTITY, { entity: Entity.SIZES, module, value }, { root: true });
  },

  async loadSauces({ commit }) {
    const value = await this.$api.fetchData.get(resources.SAUCES);
    commit(
      SET_ENTITY,
      { entity: Entity.SAUCES, module, value },
      { root: true }
    );
  },

  async loadDough({ commit }) {
    const data = await this.$api.fetchData.get(resources.DOUGH);
    const value = data.slice(0, 2).map((dough) => normalizeDough(dough));
    commit(
      SET_ENTITY,
      { entity: Entity.DOUGHS, module, value },
      { root: true }
    );
  },

  async init({ state, dispatch }, pizza = null) {
    let id, name, dough, sauce, size, count;
    const ingredients = state.loadedIngredients.map((item) =>
      normalizeIngredient(item)
    );

    if (pizza) {
      ({ id, name, dough, sauce, size, count } = pizza);
      pizza.ingredients.forEach((item) => {
        const ingredient = ingredients.find((i) => +i.id === +item.id);
        if (ingredient) {
          ingredient.count = item.count;
        }
      });
    } else {
      id = null;
      name = "";
      dough = state[Entity.DOUGHS][0];
      sauce = state.sauces[0];
      size = state.sizes[0];
      count = 1;
    }
    await dispatch("setEntity", { entity: Entity.PIZZA_ID, value: id });
    await dispatch("setEntity", {
      entity: Entity.INGREDIENTS,
      value: ingredients,
    });
    await dispatch("setName", name);
    await dispatch("setEntity", { entity: Entity.CURRENT_DOUGH, value: dough });
    await dispatch("setEntity", { entity: Entity.CURRENT_DOUGH, value: dough });
    await dispatch("setEntity", { entity: Entity.CURRENT_SAUCE, value: sauce });
    await dispatch("setEntity", { entity: Entity.CURRENT_SIZE, value: size });
    await dispatch("setEntity", { entity: Entity.PIZZA_COUNT, value: count });
  },

  async setEntity({ commit }, data) {
    commit(SET_ENTITY, { module, ...data }, { root: true });
  },

  async setDough({ state, dispatch }, doughName) {
    const dough = state.doughs.find((item) => item.name === doughName);
    dispatch("setEntity", { entity: Entity.CURRENT_DOUGH, value: dough });
  },

  async setSauce({ state, dispatch }, sauceName) {
    const sauce = state.sauces.find((item) => item.name === sauceName);
    dispatch("setEntity", { entity: Entity.CURRENT_SAUCE, value: sauce });
  },

  async setSize({ state, dispatch }, sizeName) {
    const size = state.sizes.find((item) => item.name === sizeName);
    dispatch("setEntity", { entity: Entity.CURRENT_SIZE, value: size });
  },

  async setName({ dispatch }, name) {
    dispatch("setEntity", { entity: Entity.PIZZA_NAME, value: name });
  },

  async setIngredient({ state, commit }, { ingredientId, count }) {
    if (count < INGREDIENT_MIN_COUNT || count > INGREDIENT_MAX_COUNT) {
      return;
    }

    const ingredient = state[Entity.INGREDIENTS].find(
      ({ id }) => +id === +ingredientId
    );
    if (ingredient) {
      const value = { ...ingredient, count };
      commit(
        UPDATE_ENTITY,
        { module, entity: Entity.INGREDIENTS, value },
        { root: true }
      );
    }
  },
};
