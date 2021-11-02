<template>
  <div>
    <AppLayoutHeader />

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
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutDefault",
  components: {
    AppLayoutHeader,
  },
};
</script>
