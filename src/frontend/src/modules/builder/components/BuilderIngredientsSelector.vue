<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите·ингридиенты</h2>

    <div class="sheet__content ingredients">
      <div class="ingredients__sauce">
        <p>Основной соус:</p>

        <RadioButton
          v-for="(sauce, sauceIndex) in preparedSauces"
          :key="`sauce-${sauceIndex}`"
          class="radio ingredients__input"
          name="sauce"
          :value="sauce.value"
          :checked="sauce.value === currentIngredients.sauce.value"
          :spanText="sauce.name"
          @radioClick="onRadioButtonClick"
        />
      </div>

      <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul class="ingredients__list">
          <li
            class="ingredients__item"
            v-for="(
              ingredient, ingredientIndex
            ) in currentIngredients.subIngredients"
            :key="`ingredient-${ingredientIndex}`"
          >
            <span
              :class="ingredientFillingClass(ingredient.image)"
              :draggable="ingredient.value < 3"
              @dragstart="onDragStart(ingredientIndex)"
            >
              {{ ingredient.text }}
            </span>

            <div class="counter counter--orange ingredients__counter">
              <button
                type="button"
                class="counter__button counter__button--minus"
                :class="{ 'counter__button--disabled': ingredient.value <= 0 }"
                @click="onCounterButtonClick(-1, ingredientIndex)"
                :disabled="ingredient.value <= 0"
              >
                <span class="visually-hidden">Меньше</span>
              </button>
              <input
                type="text"
                name="counter"
                class="counter__input"
                :value="ingredient.value"
              />
              <button
                type="button"
                class="counter__button counter__button--plus"
                :class="{ 'counter__button--disabled': ingredient.value >= 3 }"
                @click="onCounterButtonClick(1, ingredientIndex)"
                :disabled="ingredient.value >= 3"
              >
                <span class="visually-hidden">Больше</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  UPDATE_PIZZA_SAUSE,
  UPDATE_PIZZA_SUBINGRIDIENT,
} from "@/store/mutation-types.js";

import pizza from "@/static/pizza.json";

import RadioButton from "@/components/RadioButton.vue";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton,
  },
  props: {
    currentIngredients: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pizza,
    };
  },
  computed: {
    ...mapState("Builder", ["pizzaSchema"]),
    preparedSauces() {
      return this.pizzaSchema.sauces.map((sauce) => {
        const value = sauce.id;

        return {
          ...sauce,
          value,
        };
      });
    },
  },
  methods: {
    ...mapMutations("Builder", {
      handelSauceUpdate: UPDATE_PIZZA_SAUSE,
      handelSubIngridentUpdate: UPDATE_PIZZA_SUBINGRIDIENT,
    }),
    onRadioButtonClick(radioValue) {
      const sauseName = this.currentIngredients.sauce.name;
      this.handelSauceUpdate({ key: sauseName, value: radioValue });
    },
    onCounterButtonClick(delta, ingridientIndex) {
      this.handelSubIngridentUpdate({ ingridientIndex, delta });
    },
    onDragStart(ingridientIndex) {
      this.$emit("ingrideintDragged", ingridientIndex);
    },
    ingredientFillingClass(ingredientImage) {
      const modificator = ingredientImage
        .split("/")
        .find((item) => item.endsWith(".svg") === true)
        .slice(0, -4);

      return `filling filling--${modificator}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

@import "~@/assets/scss/layout/sheet";

@import "~@/assets/scss/blocks/counter";
@import "~@/assets/scss/blocks/filling";
@import "~@/assets/scss/blocks/ingredients";
@import "~@/assets/scss/blocks/title";
</style>
