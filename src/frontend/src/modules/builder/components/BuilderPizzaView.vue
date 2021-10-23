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
            class="pizza__filling"
            v-for="(ingredient, ingredientIndex) in filteredSubIngridients"
            :key="`pizza-filling-${ingredientIndex}`"
            :class="`pizza__filling--${ingredient.name}`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
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
    foundationModificator() {
      const doughModificator =
        this.currentPizza.dough.value === "light" ? "small" : "big";

      return `pizza--foundation--${doughModificator}-${this.currentPizza.ingredients.sauce.value}`;
    },
    filteredSubIngridients() {
      return this.currentPizza.ingredients.subIngridients.filter(
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
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

@import "~@/assets/scss/layout/content";

@import "~@/assets/scss/blocks/input";
@import "~@/assets/scss/blocks/pizza";
</style>
