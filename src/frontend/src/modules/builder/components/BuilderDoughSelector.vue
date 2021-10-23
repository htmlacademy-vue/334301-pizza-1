<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите тесто</h2>

    <div class="sheet__content dough">
      <RadioButton
        v-for="(dough, doughIndex) in preparedDough"
        :key="`dough-${doughIndex}`"
        :className="`dough__input dough__input--${dough.value}`"
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
import { mapMutations } from "vuex";
import { UPDATE_PIZZA } from "@/store/mutation-types.js";

import pizza from "@/static/pizza.json";

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
  data() {
    return {
      pizza,
    };
  },
  computed: {
    preparedDough() {
      return this.pizza.dough.map((dough) => {
        let value = "";

        switch (dough.name) {
          case "Тонкое":
            value = "light";
            break;
          case "Толстое":
            value = "large";
            break;
          default:
            value = "default";
        }

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
