<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="product in additional"
        :key="product.id"
        class="additional-list__item sheet"
      >
        <p class="additional-list__description">
          <img
            :src="product.image"
            width="39"
            height="60"
            :alt="product.name"
          />
          <span>{{ product.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <CartButtonCounter
            class="additional-list__counter"
            :id="product.id"
            :count="product.count"
            @increment="increment"
            @decrement="decrement"
            @change="changeCount"
          />

          <div class="additional-list__price">
            <b>{{ product.price * product.count }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CartButtonCounter from "./CartButtonCounter";

export default {
  name: "CartAdditional",
  components: { CartButtonCounter },
  computed: {
    ...mapGetters("cart", {
      additional: "getAdditional",
    }),
  },
  methods: {
    ...mapActions("cart", {
      increment: "incrementAdditional",
      decrement: "decrementAdditional",
      changeCount: "changeCountAdditional",
    }),
  },
};
</script>
