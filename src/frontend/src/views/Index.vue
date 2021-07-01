<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">
                <label
                  v-for="(dough, id) in preparedDough"
                  :key="`dough-${id}`"
                  class="dough__input"
                  :class="{
                    'dough__input--light': dough.name === 'Тонкое',
                    'dough__input--large': dough.name === 'Толстое',
                  }"
                >
                  <input
                    type="radio"
                    name="dought"
                    class="visually-hidden"
                    :checked="id === 0"
                    :value="dough.value"
                  />
                  <b>{{ dough.name }}</b>
                  <span>{{ dough.description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  v-for="(size, id) in preparedSizes"
                  :key="`size-${id}`"
                  class="diameter__input"
                  :class="{
                    'diameter__input--small': size.multiplier === '1',
                    'diameter__input--normal': size.multiplier === '2',
                    'diameter__input--big': size.multiplier === '3',
                  }"
                >
                  <input
                    class="visually-hidden"
                    type="radio"
                    name="diameter"
                    :value="size.value"
                    :checked="id === 0"
                  />
                  <span>{{ size.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingridients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингридиенты
              </h2>

              <div class="sheet__content ingridients">
                <div class="ingridients__sauce">
                  <p>Основной соус:</p>

                  <label
                    class="radio ingridients__input"
                    v-for="(sauce, id) in preparedSauces"
                    :key="`sauce-${id}`"
                  >
                    <input
                      type="radio"
                      name="sauce"
                      :value="sauce.value"
                      :checked="id === 0"
                    />
                    <span>{{ sauce.name }}</span>
                  </label>
                </div>

                <div class="ingridients__filling">
                  <p>Начинка:</p>

                  <ul class="ingridients__list">
                    <li
                      class="ingridients__item"
                      v-for="(ingredient, id) in pizza.ingredients"
                      :key="`ingredient-${id}`"
                    >
                      <span
                        class="filling"
                        :class="{
                          'filling--mushrooms': ingredient.name === 'Грибы',
                          'filling--cheddar': ingredient.name === 'Чеддер',
                          'filling--salami': ingredient.name === 'Салями',
                          'filling--ham': ingredient.name === 'Ветчина',
                          'filling--ananas': ingredient.name === 'Ананас',
                          'filling--bacon': ingredient.name === 'Бекон',
                          'filling--onion': ingredient.name === 'Лук',
                          'filling--chile': ingredient.name === 'Чили',
                          'filling--jalapeno': ingredient.name === 'Халапеньо',
                          'filling--olives': ingredient.name === 'Маслины',
                          'filling--tomatoes': ingredient.name === 'Томаты',
                          'filling--salmon': ingredient.name === 'Лосось',
                          'filling--mozzarella':
                            ingredient.name === 'Моцарелла',
                          'filling--parmesan': ingredient.name === 'Пармезан',
                          'filling--blue_cheese': ingredient.name === 'Блю чиз',
                        }"
                      >
                        {{ ingredient.name }}
                      </span>

                      <div class="counter counter--orange ingridients__counter">
                        <button
                          type="button"
                          class="
                            counter__button
                            counter__button--disabled
                            counter__button--minus
                          "
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button button--disabled" disabled>
                Готовьте!
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";

export default {
  name: "Index",
  data() {
    return {
      misc,
      pizza,
      user,
    };
  },
  computed: {
    preparedDough() {
      return this.pizza.dough.map((dough) => {
        let value = "";

        switch (dough.name) {
          case "Тонкое":
            value = "light";
            break;
          case "Толстое":
            value = "large";
            break;
          default:
            value = "default";
        }

        return {
          ...dough,
          value,
        };
      });
    },
    preparedSizes() {
      return this.pizza.sizes.map((size) => {
        let value = "";

        switch (size.multiplier) {
          case 1:
            value = "small";
            break;
          case 2:
            value = "normal";
            break;
          case 3:
            value = "big";
            break;
          default:
            value = "default";
        }

        return {
          ...size,
          value,
        };
      });
    },
    preparedSauces() {
      return this.pizza.sauces.map((sauce) => {
        let value = "";

        switch (sauce.name) {
          case "Томатный":
            value = "tomato";
            break;
          case "Сливочный":
            value = "creamy";
            break;
          default:
            value = "default";
        }

        return {
          ...sauce,
          value,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";
@import "~@/assets/scss/layout/content";
@import "~@/assets/scss/layout/header";
@import "~@/assets/scss/layout/sheet";

@import "~@/assets/scss/blocks/button";
@import "~@/assets/scss/blocks/counter";
@import "~@/assets/scss/blocks/diameter";
@import "~@/assets/scss/blocks/dough";
@import "~@/assets/scss/blocks/filling";
@import "~@/assets/scss/blocks/ingridients";
@import "~@/assets/scss/blocks/pizza";
@import "~@/assets/scss/blocks/title";
</style>
