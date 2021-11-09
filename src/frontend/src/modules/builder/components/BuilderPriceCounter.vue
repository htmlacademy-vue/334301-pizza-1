<template>
  <div class="content__result">
    <p>Итого: {{ pizza.price }} ₽</p>
    <button
      type="button"
      class="button"
      :class="isDisabled ? 'button--disabled' : ''"
      :disabled="isDisabled"
      @click="addToCart"
    >
      Готовьте!
    </button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { Message } from "../../../common/const/common";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("builder", {
      pizza: "pizza",
      addedIngredients: "addedIngredients",
    }),
    isDisabled() {
      return (
        !this.pizza.name.length ||
        !this.pizza.price ||
        !this.addedIngredients.length
      );
    },
  },
  methods: {
    ...mapActions("cart", ["addPizza"]),
    ...mapActions("builder", { pizzaInit: "init" }),
    async addToCart() {
      await Promise.all([this.addPizza(), this.pizzaInit()]);
      this.$notifier.success(Message.PIZZA_ADD_CART);
    },
  },
};
</script>
