<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  methods: {
    ...mapActions({
      handelStoreInit: "init",
    }),
  },
  created() {
    this.handelStoreInit();
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
