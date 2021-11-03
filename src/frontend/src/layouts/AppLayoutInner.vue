<template>
  <div>
    <AppLayoutHeader v-slot:header />

    <main class="layout">
      <AppLayoutInnerSidebar />

      <slot />
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppLayoutInnerSidebar from "@/layouts/AppLayoutInnerSidebar";

export default {
  name: "AppLayoutInner",
  components: {
    AppLayoutHeader,
    AppLayoutInnerSidebar,
  },
};
</script>
