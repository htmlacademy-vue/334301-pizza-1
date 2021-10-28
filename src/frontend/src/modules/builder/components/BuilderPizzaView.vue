<template>
  <div>
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="currentPizza.title.value"
        @input="onTextInputChange"
      />
    </label>

    <div
      class="content__constructor"
      @drop="onDrop"
      @dragover.prevent
      @dragenter.prevent
    >
      <div class="pizza" :class="foundationModificator">
        <div class="pizza__wrapper">
          <div
            v-for="(ingredient, ingredientIndex) in filteredSubIngredients"
            :key="`pizza-filling-${ingredientIndex}`"
            :class="pizzaFillingClass(ingredient.image, ingredient.value)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { UPDATE_PIZZA } from "@/store/mutation-types.js";

export default {
  name: "BuilderPizzaView",
  props: {
    currentPizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("Builder", ["pizzaSchema"]),
    foundationModificator() {
      const doughName = this.pizzaSchema.dough.find(
        (item) => item.id === this.currentPizza.dough.value
      );
      const sauceName = this.pizzaSchema.sauces.find(
        (item) => item.id === this.currentPizza.ingredients.sauce.value
      );
      const doughModificator = doughName === "Тонкое" ? "small" : "big";
      const sauceModificator = sauceName === "Томатный" ? "tomato" : "creamy";

      return `pizza--foundation--${doughModificator}-${sauceModificator}`;
    },
    filteredSubIngredients() {
      return this.currentPizza.ingredients.subIngredients.filter(
        (ingridient) => {
          return ingridient.value > 0;
        }
      );
    },
  },
  methods: {
    ...mapMutations("Builder", {
      handelPizzaUpdate: UPDATE_PIZZA,
    }),
    onTextInputChange(evt) {
      this.handelPizzaUpdate({
        key: this.currentPizza.title.name,
        value: evt.target.value,
      });
    },
    onDrop() {
      this.$emit("ingridientDropped");
    },
    pizzaFillingClass(ingredientImage, ingridientValue) {
      const firstModificator = ingredientImage
        .split("/")
        .find((item) => item.endsWith(".svg") === true)
        .slice(0, -4);

      let secondModificator = "";
      switch (ingridientValue) {
        case 2:
          secondModificator = " pizza__filling--second";
          break;
        case 3:
          secondModificator = " pizza__filling--third";
          break;
        default:
          secondModificator = "";
          break;
      }

      return `pizza__filling pizza__filling--${firstModificator}${secondModificator}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

@import "~@/assets/scss/layout/content";

@import "~@/assets/scss/blocks/input";
@import "~@/assets/scss/blocks/pizza";
</style>
