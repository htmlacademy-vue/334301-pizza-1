<template>
  <div>
    <transition
      name="view"
      appear
      enter-active-class="animate__animated animate__slideInLeft"
    >
      <slot />
    </transition>
  </div>
</template>

<script>
export default {
  name: "AppLayoutEmpty",
};
</script>
