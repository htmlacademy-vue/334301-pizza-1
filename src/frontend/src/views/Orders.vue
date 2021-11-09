<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <section v-for="order in orders" :key="order.id" class="sheet order">
      <div class="order__wrapper">
        <div class="order__number">
          <b>Заказ #{{ order.id }}</b>
        </div>

        <div class="order__sum">
          <span>Сумма заказа: {{ order.price }} ₽</span>
        </div>

        <div class="order__button">
          <button
            type="button"
            class="button button--border"
            @click="handleOrderRemove(order.id)"
          >
            Удалить
          </button>
        </div>
        <div class="order__button">
          <button
            type="button"
            class="button"
            @click="handleOrderRepeat(order.id)"
          >
            Повторить
          </button>
        </div>
      </div>

      <ul class="order__list">
        <OrderPizzaItem
          v-for="(pizza, index) in order.pizzas"
          :key="`${index}-${pizza.price}`"
          :pizza="pizza"
        />
      </ul>

      <ul class="order__additional">
        <OrderAdditionalItem
          v-for="product in order.additional"
          :key="product.id"
          :product="product"
        />
      </ul>

      <p v-if="order.address" class="order__address">
        Адрес доставки: {{ printAddress(order.address) }}
      </p>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import OrderPizzaItem from "../modules/orders/components/OrderPizzaItem";
import OrderAdditionalItem from "../modules/orders/components/OrderAdditionalItem";
import { printAddress } from "../common/utils/helpers/common";
import { AppRoute } from "../common/const/route";

export default {
  components: { OrderAdditionalItem, OrderPizzaItem },
  computed: {
    ...mapGetters({
      orders: "orders/getOrders",
      isDataLoaded: "builder/isDataLoaded",
    }),
  },
  watch: {
    async isDataLoaded(newValue) {
      if (newValue) {
        await this.loadOrders();
      }
    },
  },
  methods: {
    ...mapActions({
      loadOrders: "orders/loadOrders",
      removeOrder: "orders/removeOrder",
      loadOrderToCart: "orders/loadOrderToCart",
    }),
    printAddress,
    async handleOrderRemove(id) {
      await this.removeOrder(id);
    },
    async handleOrderRepeat(id) {
      await this.loadOrderToCart(id);
      await this.$router.push(AppRoute.CART);
    },
  },
  async mounted() {
    if (this.isDataLoaded) {
      await this.loadOrders();
    }
  },
};
</script>
