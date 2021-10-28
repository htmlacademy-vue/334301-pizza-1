<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <OrdersSheet />
  </div>
</template>

<script>
import OrdersSheet from "@/modules/orders/components/OrdersSheet";

export default {
  name: "Orders",
  components: {
    OrdersSheet,
  },
};
</script>
