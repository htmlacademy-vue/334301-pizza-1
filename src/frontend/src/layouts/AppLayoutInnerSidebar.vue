<template>
  <div class="layout__sidebar sidebar">
    <router-link to="/" class="logo layout__logo">
      <img
        src="@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <router-link
      class="layout__link"
      active-class="layout__link--active"
      to="/orders"
    >
      История заказов
    </router-link>
    <router-link
      class="layout__link"
      active-class="layout__link--active"
      to="/profile"
    >
      Мои данные
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AppLayoutInnerSidebar",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

@import "~@/assets/scss/layout/layout";
@import "~@/assets/scss/layout/sidebar";
</style>
