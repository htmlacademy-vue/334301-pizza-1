<template>
  <AppLayoutDefault>
    <AppSideBar>
      <slot />
    </AppSideBar>
  </AppLayoutDefault>
</template>
<script>
import AppLayoutDefault from "./AppLayoutDefault";
export default {
  components: { AppLayoutDefault },
};
</script>
