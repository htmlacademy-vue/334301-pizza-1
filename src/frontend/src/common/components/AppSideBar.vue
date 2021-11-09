<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <router-link :to="AppRoute.MAIN" class="logo layout__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>

      <router-link
        :to="AppRoute.ORDERS"
        class="layout__link"
        active-class="layout__link--active"
      >
        История заказов
      </router-link>
      <router-link
        :to="AppRoute.PROFILE"
        class="layout__link"
        active-class="layout__link--active"
      >
        Мои данные
      </router-link>
    </div>
    <slot />
  </main>
</template>

<script>
import { AppRoute } from "../const/route";

export default {
  name: "AppSideBar",
  data() {
    return {
      AppRoute,
    };
  },
};
</script>
