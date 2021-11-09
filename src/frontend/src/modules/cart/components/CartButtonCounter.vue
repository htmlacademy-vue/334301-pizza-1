<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="handleDecrement"
      :disabled="isDisabled"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="count"
      @change="handleChange"
    />
    <button
      type="button"
      class="counter__button counter__button--plus counter__button--orange"
      @click="handleIncrement"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
<script>
import { INGREDIENT_MIN_COUNT } from "../../../common/const/common";

export default {
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
  computed: {
    isDisabled() {
      return this.count === INGREDIENT_MIN_COUNT;
    },
  },
  methods: {
    handleIncrement() {
      this.$emit("increment", this.id);
    },

    handleDecrement() {
      this.$emit("decrement", this.id);
    },

    handleChange(event) {
      const { value } = event.target;
      const count = parseInt(value, 10);
      this.$emit("change", { id: this.id, count });
    },
  },
};
</script>
