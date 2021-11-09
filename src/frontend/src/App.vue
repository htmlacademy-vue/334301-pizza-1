<template>
  <div id="app">
    <AppLayout>
      <transition v-if="isShowTransition" :name="transitionName" appear>
        <router-view />
      </transition>
      <router-view v-else />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout";
import { RouteName } from "./common/const/route";
import { Transition } from "./common/const/common";

export default {
  name: "App",
  data() {
    return {
      isShowTransition: true,
      transitionName: Transition.SLIDE,
    };
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch("init"),
      this.$store.dispatch("auth/setAuth"),
    ]);
  },
  components: {
    AppLayout,
  },
  watch: {
    $route(to, from) {
      this.isShowTransition =
        from.name === RouteName.LOGIN_INDEX
          ? false
          : to.name !== RouteName.LOGIN_INDEX;

      this.transitionName =
        to.name === RouteName.LOGIN ? Transition.SLIDE_LOGIN : Transition.SLIDE;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
#app {
  min-height: 100vh;
}
</style>
