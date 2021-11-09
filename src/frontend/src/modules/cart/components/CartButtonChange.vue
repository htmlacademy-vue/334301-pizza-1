<template>
  <button type="button" class="cart-list__edit" @click="handleClick">
    Изменить
  </button>
</template>
<script>
import { mapActions } from "vuex";
import { AppRoute } from "../../../common/const/route";

export default {
  name: "CartButtonChange",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions("cart", ["changePizza"]),
    handleClick() {
      this.changePizza(this.id);
      this.$router.push(AppRoute.MAIN);
    },
  },
};
</script>
