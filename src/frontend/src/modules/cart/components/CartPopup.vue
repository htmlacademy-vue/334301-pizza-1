<template>
  <div class="popup" v-if="popupActive === true">
    <a href="#" class="close" @click.prevent="onPopupButtonClick">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a href="#" class="button" @click.prevent="onPopupButtonClick"
        >Отлично, я жду!</a
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { RESET_PIZZA, RESET_CART } from "@/store/mutation-types.js";

export default {
  name: "CartPopup",
  computed: {
    ...mapState("Cart", ["popupActive"]),
  },
  methods: {
    ...mapMutations("Builder", {
      handelBuilderReset: RESET_PIZZA,
    }),
    ...mapMutations("Cart", {
      handelCartReset: RESET_CART,
    }),
    onPopupButtonClick() {
      this.$router.push({ path: "/orders" });

      this.handelBuilderReset();
      this.handelCartReset();
    },
  },
};
</script>
