<template>
  <component :is="layout">
    <slot name="header" />
    <transition name="view" appear :enter-active-class="animation">
      <slot />
    </transition>
  </component>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  data() {
    return {
      previousPath: "",
    };
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
    animation() {
      let animation = "";
      if (this.$route.path !== "/login" && this.previousPath !== "/login") {
        animation = "animate__animated animate__slideInLeft";
      }

      if (this.$route.path === "/orders" || this.$route.path === "/profile") {
        animation = "animate__animated animate__slideInRight";
      }

      return animation;
    },
  },
  mounted() {
    this.previousPath = this.$route.path;
  },
  updated() {
    this.previousPath =
      this.previousPath === "/login" && this.$route.path === "/"
        ? this.previousPath
        : this.$route.path;
  },
};
</script>
