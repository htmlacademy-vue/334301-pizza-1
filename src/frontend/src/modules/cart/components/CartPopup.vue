<template>
  <transition
    name="cart-popup"
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
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
  </transition>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { RESET_PIZZA, RESET_CART } from "@/store/mutation-types.js";

export default {
  name: "CartPopup",
  computed: {
    ...mapState("Cart", ["popupActive"]),
    ...mapState("Auth", ["isAuthenticated"]),
  },
  methods: {
    ...mapMutations("Builder", {
      handelBuilderReset: RESET_PIZZA,
    }),
    ...mapMutations("Cart", {
      handelCartReset: RESET_CART,
    }),
    onPopupButtonClick() {
      this.handelCartReset();
      this.handelBuilderReset();

      setTimeout(() => {
        if (this.isAuthenticated === true) {
          this.$router.push({ path: "/orders" });
        } else {
          this.$router.push({ path: "/" });
        }
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

@import "~@/assets/scss/layout/popup";
</style>
