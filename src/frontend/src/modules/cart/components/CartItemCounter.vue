<template>
  <CartButtonCounter
    class="cart-list__counter"
    :id="id"
    :count="count"
    @increment="increment"
    @decrement="decrement"
    @change="changeCount"
  />
</template>
<script>
import { mapActions } from "vuex";
import CartButtonCounter from "./CartButtonCounter";

export default {
  name: "CartItemCounter",
  components: { CartButtonCounter },
  props: {
    count: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions("cart", {
      increment: "incrementItems",
      decrement: "decrementItems",
      changeCount: "changeItemsCount",
    }),
  },
};
</script>
