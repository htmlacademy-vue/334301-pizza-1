<template>
  <div style="width: 100%; height: 100vh">
    <div class="sign-form">
      <router-link to="/" class="close close--white">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </router-link>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form action="test.html" method="post">
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              placeholder="example@mail.ru"
              v-model="email"
              @input="
                () => {
                  this.errorText = '';
                }
              "
            />
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>
            <input
              type="password"
              name="pass"
              placeholder="***********"
              v-model="password"
              @input="
                () => {
                  this.errorText = '';
                }
              "
            />
          </label>
        </div>
        <button
          type="submit"
          class="button"
          @click.prevent="onSubmitButtonClick"
        >
          Авторизоваться
        </button>
        <p v-if="errorText.length > 0">{{ errorText }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorText: "",
    };
  },
  methods: {
    ...mapActions("Auth", {
      handelLogin: "login",
    }),
    async onSubmitButtonClick() {
      let canSubmit = true;

      if (EMAIL_PATTERN.test(this.email) === false) {
        canSubmit = false;
        this.errorText = "Введите корректный email";
      }

      if (this.password.split(" ").join("").length === 0) {
        canSubmit = false;
        this.errorText +=
          this.errorText !== "" ? ". Введите пароль" : "Введите пароль";
      }

      if (canSubmit === true) {
        await this.handelLogin({
          email: this.email,
          password: this.password,
        });

        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

@import "~@/assets/scss/visually-hidden";

@import "~@/assets/scss/layout/sign-form";
</style>
