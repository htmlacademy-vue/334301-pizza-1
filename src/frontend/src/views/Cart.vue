<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <CartSheet />

        <CartAdditional />

        <CartForm />
      </div>
    </main>

    <CartFooter />

    <CartPopup />
  </form>
</template>

<script>
import CartSheet from "@/modules/cart/components/CartSheet.vue";
import CartAdditional from "@/modules/cart/components/CartAdditional.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import CartPopup from "@/modules/cart/components/CartPopup.vue";

export default {
  name: "Cart",
  components: {
    CartSheet,
    CartAdditional,
    CartForm,
    CartFooter,
    CartPopup,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

@import "~@/assets/scss/layout/layout-form";
@import "~@/assets/scss/layout/container";
@import "~@/assets/scss/layout/content";

@import "~@/assets/scss/blocks/title";
@import "~@/assets/scss/blocks/cart";
</style>
