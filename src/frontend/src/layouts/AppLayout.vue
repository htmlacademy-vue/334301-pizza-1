<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import { LayoutName } from "../common/const/common";

export default {
  computed: {
    layout() {
      const layout = this.$route.meta.layout || LayoutName.DEFAULT;
      return () => import(`./${layout}.vue`);
    },
  },
};
</script>
