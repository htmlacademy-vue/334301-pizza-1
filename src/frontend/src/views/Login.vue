<template>
  <div class="sign-form">
    <router-link :to="AppRoute.MAIN" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="#" method="post" @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            v-model="email"
            placeholder="example@mail.ru"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            type="password"
            name="password"
            v-model="password"
            placeholder="***********"
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import validator from "../common/mixins/validator";
import { LoginValidations } from "../common/const/validation";
import { getValidationErrorMessage } from "../common/utils/helpers/validation";
import { AppRoute } from "../common/const/route";

export default {
  mixins: [validator],
  data() {
    return {
      email: "",
      password: "",
      AppRoute,
      validations: { ...LoginValidations },
    };
  },
  watch: {
    email() {
      this.$clearValidationErrors(this.validations);
    },
    password() {
      this.$clearValidationErrors(this.validations);
    },
  },
  methods: {
    async login() {
      try {
        if (
          !this.$validateFields(
            { email: this.email, password: this.password },
            this.validations
          )
        ) {
          const errorMessage = getValidationErrorMessage(this.validations);
          this.$notifier.error(errorMessage);
          return;
        }

        await this.$store.dispatch("auth/login", {
          email: this.email,
          password: this.password,
        });
        await this.$router.push(AppRoute.MAIN);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
  },
};
</script>
