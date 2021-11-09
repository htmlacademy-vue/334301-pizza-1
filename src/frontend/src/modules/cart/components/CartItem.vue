<template>
  <li class="cart-list__item">
    <ProductListItem :product="product" class="product cart-list__product" />

    <CartItemCounter :id="+product.id" :count="+product.count" />

    <div class="cart-list__price">
      <b>{{ product.price * product.count }} ₽</b>
    </div>

    <div class="cart-list__button">
      <CartButtonChange :id="+product.id" />
    </div>
  </li>
</template>
<script>
import CartItemCounter from "./CartItemCounter";
import CartButtonChange from "./CartButtonChange";
import ProductListItem from "../../../common/components/AppProductListItem";

export default {
  name: "CartItem",
  components: { CartItemCounter, CartButtonChange, ProductListItem },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
