<template>
  <div class="sign-form">
    <a href="#" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="test.html" method="post">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input type="email" name="email" placeholder="example@mail.ru" />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input type="password" name="pass" placeholder="***********" />
        </label>
      </div>
      <router-link to="/profile" tag="button" class="button">
        Авторизоваться
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>
