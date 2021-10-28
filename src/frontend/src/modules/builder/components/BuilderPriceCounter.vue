<template>
  <div class="content__result">
    <p>{{ `Итого: ${calculatedPrice} ₽` }}</p>
    <button
      type="button"
      class="button"
      :class="{ 'button--disabled': canOrderPizza === false }"
      :disabled="canOrderPizza === false"
      @click="onSubmitButtonClick"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("Builder", ["calculatedPrice", "canOrderPizza"]),
  },
  methods: {
    ...mapActions("Builder", {
      handelAddToCart: "addToCart",
    }),
    onSubmitButtonClick() {
      this.handelAddToCart();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

@import "~@/assets/scss/layout/content";

@import "~@/assets/scss/blocks/button";
</style>
