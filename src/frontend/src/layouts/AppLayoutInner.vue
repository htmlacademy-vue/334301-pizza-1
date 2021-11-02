<template>
  <div>
    <AppLayoutHeader />

    <main class="layout">
      <AppLayoutInnerSidebar />

      <transition
        name="view"
        appear
        enter-active-class="animate__animated animate__slideInLeft"
      >
        <slot />
      </transition>
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
