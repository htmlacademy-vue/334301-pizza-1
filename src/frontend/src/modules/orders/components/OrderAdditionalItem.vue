<template>
  <li>
    <img :src="product.image" width="20" height="30" :alt="product.name" />
    <p>
      <span>{{ product.name }}</span>
      <b>{{ getStringProductPrice(product) }} ₽</b>
    </p>
  </li>
</template>

<script>
import { getStringProductPrice } from "../../../common/utils/helpers/common";

export default {
  name: "OrderAdditionalItem",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: { getStringProductPrice },
};
</script>
