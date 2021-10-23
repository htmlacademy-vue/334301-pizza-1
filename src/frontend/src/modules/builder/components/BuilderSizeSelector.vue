<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите размер</h2>

    <div class="sheet__content diameter">
      <RadioButton
        v-for="(size, sizeIndex) in preparedSizes"
        :key="`size-${sizeIndex}`"
        :className="`diameter__input diameter__input--${size.value}`"
        name="diameter"
        :value="size.value"
        :checked="size.value === currentSize.value"
        :spanText="size.name"
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
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  props: {
    currentSize: {
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
    preparedSizes() {
      return this.pizza.sizes.map((size) => {
        let value = "";

        switch (size.multiplier) {
          case 1:
            value = "small";
            break;
          case 2:
            value = "normal";
            break;
          case 3:
            value = "big";
            break;
          default:
            value = "default";
        }

        return {
          ...size,
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
      this.handelPizzaUpdate({ key: this.currentSize.name, value: radioValue });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

@import "~@/assets/scss/layout/sheet";

@import "~@/assets/scss/blocks/title";
@import "~@/assets/scss/blocks/diameter";
</style>
