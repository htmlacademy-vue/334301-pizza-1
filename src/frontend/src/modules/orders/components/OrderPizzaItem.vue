<template>
  <li class="order__item">
    <ProductListItem :product="pizza" class="product" />

    <p class="order__price">{{ getStringProductPrice(pizza) }} ₽</p>
  </li>
</template>

<script>
import ProductListItem from "../../../common/components/AppProductListItem";
import { getStringProductPrice } from "../../../common/utils/helpers/common";

export default {
  name: "OrderPizzaItem",
  components: { ProductListItem },
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  methods: { getStringProductPrice },
};
</script>
