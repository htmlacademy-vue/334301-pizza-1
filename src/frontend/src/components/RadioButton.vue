<template>
  <label :class="className" @click="onRaidoButtonClick">
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
    className: {
      type: String,
      required: true,
    },
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
    onRaidoButtonClick() {
      this.$emit("radioClick", this.value);
    },
  },
};
</script>
