<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите·ингридиенты</h2>

    <div class="sheet__content ingridients">
      <div class="ingridients__sauce">
        <p>Основной соус:</p>

        <RadioButton
          v-for="(sauce, sauceIndex) in preparedSauces"
          :key="`sauce-${sauceIndex}`"
          className="radio ingridients__input"
          name="sauce"
          :value="sauce.value"
          :checked="sauce.value === currentIngridients.sauce.value"
          :spanText="sauce.name"
          @radioClick="onRadioButtonClick"
        />
      </div>

      <div class="ingridients__filling">
        <p>Начинка:</p>

        <ul class="ingridients__list">
          <li
            class="ingridients__item"
            v-for="(
              ingredient, ingredientIndex
            ) in currentIngridients.subIngridients"
            :key="`ingredient-${ingredientIndex}`"
          >
            <span
              class="filling"
              :class="`filling--${ingredient.image
                .split('/')
                .find((item) => item.endsWith('.svg') === true)
                .slice(0, -4)}`"
              :draggable="ingredient.value < 3"
              @dragstart="onDragStart($event, ingredientIndex)"
            >
              {{ ingredient.text }}
            </span>

            <div class="counter counter--orange ingridients__counter">
              <button
                type="button"
                class="
                  counter__button
                  counter__button--disabled
                  counter__button--minus
                "
                @click="onCounterButtonClick($event, -1, ingredientIndex)"
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
                @click="onCounterButtonClick($event, 1, ingredientIndex)"
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
    currentIngridients: {
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
      const sauseName = this.currentIngridients.sauce.name;
      this.handelSauceUpdate({ key: sauseName, value: radioValue });
    },
    onCounterButtonClick(evt, delta, ingridientIndex) {
      this.handelSubIngridentUpdate({ ingridientIndex, delta });
    },
    onDragStart(evt, ingridientIndex) {
      this.$emit("ingrideintDragged", ingridientIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

@import "~@/assets/scss/layout/sheet";

@import "~@/assets/scss/blocks/counter";
@import "~@/assets/scss/blocks/filling";
@import "~@/assets/scss/blocks/ingridients";
@import "~@/assets/scss/blocks/title";
</style>
