<template>
  <form action="#" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="!items.length" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-else>
          <ul class="cart-list sheet">
            <CartItem
              v-for="product in items"
              :key="product.id"
              :product="product"
            />
          </ul>

          <CartAdditional />

          <CartOrder />
        </template>
      </div>
    </main>

    <template v-if="items.length">
      <CartFooter />
    </template>
  </form>
</template>
<script>
import { mapGetters } from "vuex";
import CartItem from "../modules/cart/components/CartItem";
import CartAdditional from "../modules/cart/components/CartAdditional";
import CartOrder from "../modules/cart/components/CartOrder";
import CartFooter from "../modules/cart/components/CartFooter";

export default {
  components: { CartItem, CartOrder, CartAdditional, CartFooter },
  computed: {
    ...mapGetters("cart", {
      items: "getItems",
    }),
  },
};
</script>
