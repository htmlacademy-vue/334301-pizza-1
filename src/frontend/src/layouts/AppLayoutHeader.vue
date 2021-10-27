<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ totalPrice }} ₽</router-link>
    </div>
    <div class="header__user" v-if="isAuthenticated === false">
      <router-link to="/login" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
    <div class="header__user" v-else>
      <router-link to="/profile">
        <img :src="user.avatar" :alt="user.name" width="32" height="32" />
        <span>{{ user.name }}</span>
      </router-link>
      <a href="#" class="header__logout" @click.prevent="onLogoutClick">
        <span>Выйти</span>
      </a>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapState("Auth", ["isAuthenticated", "user"]),
    ...mapGetters("Cart", ["totalPrice"]),
  },
  methods: {
    ...mapActions("Auth", {
      handelLogout: "logout",
    }),
    onLogoutClick() {
      this.handelLogout();
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";
@import "~@/assets/scss/layout/header";
</style>
