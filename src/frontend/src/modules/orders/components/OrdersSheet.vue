<template>
  <div>
    <section
      class="sheet order"
      v-for="orderInfo in ordersList"
      :key="`order-${orderInfo.id}`"
    >
      <div class="order__wrapper">
        <div class="order__number">
          <b>{{ `Заказ #${orderInfo.id}` }}</b>
        </div>

        <div class="order__sum">
          <span>{{ `Сумма заказа: ${getOrderPrice(orderInfo.id)} ₽` }}</span>
        </div>

        <div class="order__button">
          <button
            type="button"
            class="button button--border"
            @click="onDeleteButtonClick(orderInfo.id)"
          >
            Удалить
          </button>
        </div>
        <div class="order__button">
          <button
            type="button"
            class="button"
            @click="onRepeatButtonClick(orderInfo)"
          >
            Повторить
          </button>
        </div>
      </div>

      <ul class="order__list">
        <li
          class="order__item"
          v-for="orderPizza in orderInfo.orderPizzas"
          :key="`order-pizza-${orderPizza.id}`"
        >
          <div class="product">
            <img
              src="@/assets/img/product.svg"
              class="product__img"
              width="56"
              height="56"
              :alt="orderPizza.name"
            />
            <div class="product__text">
              <h2>{{ orderPizza.name }}</h2>
              <ul>
                <li>
                  {{
                    `${getPizzaSize(orderPizza.sizeId)}, ${getPizzaDough(
                      orderPizza.doughId
                    )}`
                  }}
                </li>
                <li>
                  {{ `Соус: ${getPizzaSauce(orderPizza.sauceId)}` }}
                </li>
                <li>
                  {{
                    `Начинка: ${getPizzaIngredients(orderPizza.ingredients)}`
                  }}
                </li>
              </ul>
            </div>
          </div>

          <p class="order__price">
            {{
              `${
                orderPizza.quantity > 1 ? `${orderPizza.quantity}x` : ""
              }${getPizzaPrice(orderPizza)} ₽`
            }}
          </p>
        </li>
      </ul>

      <ul class="order__additional">
        <li
          v-for="orderMisc in orderInfo.orderMisc"
          :key="`order-misc-${orderMisc.id}`"
        >
          <img
            :src="getMisc(orderMisc).image || ''"
            width="20"
            height="30"
            :alt="getMisc(orderMisc).name || ''"
          />
          <p>
            <span>{{ getMisc(orderMisc).name }}</span>
            <b>{{
              `${orderMisc.quantity > 1 ? `${orderMisc.quantity}x` : ""}${
                getMisc(orderMisc).price || ""
              } ₽`
            }}</b>
          </p>
        </li>
      </ul>

      <p class="order__address" v-if="orderInfo.orderAddress">
        {{
          `Адрес доставки: ${orderInfo.orderAddress.street}, ${
            orderInfo.orderAddress.building
          }${
            orderInfo.orderAddress.flat
              ? `, ${orderInfo.orderAddress.flat}`
              : ""
          }`
        }}
      </p>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "OrdersSheet",
  computed: {
    ...mapState("Orders", ["ordersList"]),
    ...mapGetters("Orders", [
      "getOrderPrice",
      "getPizzaIngredients",
      "getPizzaSize",
      "getPizzaDough",
      "getPizzaSauce",
      "getPizzaPrice",
      "getMisc",
    ]),
  },
  methods: {
    ...mapActions("Orders", {
      handelOrdersDownload: "fetchOrdersList",
      handelOrderDelete: "deleteOrder",
      handelOrderRepeat: "repeatOrder",
    }),
    onDeleteButtonClick(orderId) {
      this.handelOrderDelete(orderId);
    },
    onRepeatButtonClick(order) {
      this.handelOrderRepeat({ order });
      this.$router.push({ path: "/cart" });
    },
  },
  mounted() {
    this.handelOrdersDownload();
  },
};
</script>
