<template>
  <div class="sheet cart__empty" v-if="pizzas.length === 0">
    <p>В корзине нет ни одного товара</p>
  </div>

  <ul class="cart-list sheet" v-else>
    <li
      class="cart-list__item"
      v-for="(pizza, pizzaIndex) in pizzas"
      :key="`ingredient-${pizzaIndex}`"
    >
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="pizza.title.value"
        />
        <div class="product__text">
          <h2>{{ pizza.title.value }}</h2>
          <ul>
            <li>
              {{ getPizzaSize(pizzaIndex) }} см, на
              {{ getPizzaDough(pizzaIndex) }} тесте
            </li>
            <li>Соус: {{ getPizzaSauce(pizzaIndex) }}</li>
            <li>Начинка: {{ getPizzaSubIngredients(pizzaIndex) }}</li>
          </ul>
        </div>
      </div>

      <div class="counter cart-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          @click="onCounterButtonClick($event, -1, pizzaIndex)"
          :disabled="pizza.counter <= 0"
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="pizza.counter"
        />
        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          @click="onCounterButtonClick($event, 1, pizzaIndex)"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="cart-list__price">
        <b>{{ pizza.price }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          @click="onEditButtonClick($event, pizzaIndex)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { UPDATE_PIZZA_CART_COUNTER } from "@/store/mutation-types.js";

export default {
  name: "CartSheet",
  computed: {
    ...mapState("Cart", ["pizzas"]),
    ...mapGetters("Cart", [
      "getPizzaSize",
      "getPizzaDough",
      "getPizzaSauce",
      "getPizzaSubIngredients",
    ]),
  },
  methods: {
    ...mapActions("Cart", {
      handelPizzaEdit: "editPizza",
    }),
    ...mapMutations("Cart", {
      handelPizzaCounterUpdate: UPDATE_PIZZA_CART_COUNTER,
    }),
    onCounterButtonClick(evt, delta, index) {
      this.handelPizzaCounterUpdate({ pizzaIndex: index, delta });
    },
    onEditButtonClick(evt, pizzaIndex) {
      this.handelPizzaEdit(pizzaIndex);
      this.$router.push({ path: "/" });
    },
  },
};
</script>
