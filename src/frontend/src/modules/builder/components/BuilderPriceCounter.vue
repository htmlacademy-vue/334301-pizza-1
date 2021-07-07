<template>
  <div class="content__result">
    <p>{{ `Итого: ${currentPrice} ₽` }}</p>
    <button type="button" class="button button--disabled" disabled>
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    currentPrice: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

@import "~@/assets/scss/layout/content";

@import "~@/assets/scss/blocks/button";
</style>
