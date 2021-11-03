<template>
  <transition
    name="ingredient-view"
    enter-active-class="animate__animated animate__bounceInDown"
  >
    <div v-if="value > 0"></div>
  </transition>
</template>

<script>
export default {
  name: "BuilderIngredient",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
};
</script>
