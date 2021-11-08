<template>
  <label @click="onRadioButtonClick">
    <input
      type="radio"
      :name="name"
      class="visually-hidden"
      :checked="checked"
      :value="value"
    />
    <b v-if="boldText.length">{{ boldText }}</b>
    <span v-if="spanText.length">{{ spanText }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
    boldText: {
      type: String,
      required: false,
      default: "",
    },
    spanText: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    onRadioButtonClick() {
      this.$emit("radioClick", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

@import "~@/assets/scss/blocks/dough";
@import "~@/assets/scss/blocks/filling";
</style>
