<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите тесто</h2>

    <div class="sheet__content dough">
      <RadioButton
        v-for="(dough, doughIndex) in preparedDough"
        :key="`dough-${doughIndex}`"
        :class="prepareRadioClass(dough.name)"
        name="dough"
        :value="dough.value"
        :checked="dough.value === currentDough.value"
        :boldText="dough.name"
        :spanText="dough.description"
        @radioClick="onRadioButtonClick"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { UPDATE_PIZZA } from "@/store/mutation-types.js";

import RadioButton from "@/components/RadioButton.vue";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  props: {
    currentDough: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("Builder", ["pizzaSchema"]),
    preparedDough() {
      return this.pizzaSchema.dough.map((dough) => {
        let value = dough.id;

        return {
          ...dough,
          value,
        };
      });
    },
  },
  methods: {
    ...mapMutations("Builder", {
      handelPizzaUpdate: UPDATE_PIZZA,
    }),
    onRadioButtonClick(radioValue) {
      this.handelPizzaUpdate({
        key: this.currentDough.name,
        value: radioValue,
      });
    },
    prepareRadioClass(doughName) {
      const modificator = doughName === "Тонкое" ? "light" : "large";

      return `dough__input dough__input--${modificator}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

@import "~@/assets/scss/layout/content";
@import "~@/assets/scss/layout/sheet";

@import "~@/assets/scss/blocks/title";
@import "~@/assets/scss/blocks/dough";
</style>
