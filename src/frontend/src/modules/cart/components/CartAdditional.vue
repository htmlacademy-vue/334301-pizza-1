<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        class="additional-list__item sheet"
        v-for="(miscItem, miscIndex) in misc"
        :key="`misc-${miscIndex}`"
      >
        <p class="additional-list__description">
          <img
            :src="miscItem.image"
            width="39"
            height="60"
            :alt="miscItem.name"
          />
          <span>{{ miscItem.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <div class="counter additional-list__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
              :class="{ 'counter__button--disabled': miscItem.counter <= 0 }"
              @click="onCounterButtonClick(-1, miscIndex)"
              :disabled="miscItem.counter <= 0"
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              :value="miscItem.counter"
            />
            <button
              type="button"
              class="
                counter__button counter__button--plus counter__button--orange
              "
              @click="onCounterButtonClick(1, miscIndex)"
            >
              <span class="visually-hidden">Больше</span>
            </button>
          </div>

          <div class="additional-list__price">
            <b>{{ miscItem.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { UPDATE_CART_MISC_COUNTER } from "@/store/mutation-types.js";

export default {
  name: "CartAdditional",
  computed: {
    ...mapState("Cart", ["misc"]),
  },
  methods: {
    ...mapMutations("Cart", {
      handelMiscCounterUpdate: UPDATE_CART_MISC_COUNTER,
    }),
    onCounterButtonClick(delta, index) {
      this.handelMiscCounterUpdate({ miscIndex: index, delta });
    },
  },
};
</script>
