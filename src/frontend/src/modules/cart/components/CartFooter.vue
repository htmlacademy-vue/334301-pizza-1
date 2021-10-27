<template>
  <section class="footer">
    <div class="footer__more">
      <router-link to="/" class="button button--border button--arrow">
        Хочу еще одну
      </router-link>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ totalPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <button
        type="submit"
        class="button"
        @click.prevent="onSubmitButtonClick"
        :disabled="!canSubmit"
      >
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "CartFooter",
  computed: {
    ...mapState("Cart", ["pizzas", "form"]),
    ...mapGetters("Cart", ["totalPrice"]),
    canSubmit() {
      let canSubmit = true;
      if (this.pizzas.length === 0) {
        return false;
      }

      this.pizzas.forEach((pizza) => {
        if (pizza.counter === 0) {
          canSubmit = false;
        }
      });

      if (
        this.form.activeDeliveryOption === "pickup" &&
        this.form.tel.split(" ").join("").length === 0
      ) {
        canSubmit = false;
      }

      if (
        this.form.activeDeliveryOption !== "pickup" &&
        (this.form.tel.split(" ").join("").length === 0 ||
          this.form.street.split(" ").join("").length === 0 ||
          this.form.house.split(" ").join("").length === 0)
      ) {
        canSubmit = false;
      }

      return canSubmit;
    },
  },
  methods: {
    ...mapActions("Cart", {
      handelFormSubmit: "submitForm",
    }),
    onSubmitButtonClick() {
      this.handelFormSubmit();
    },
  },
};
</script>
