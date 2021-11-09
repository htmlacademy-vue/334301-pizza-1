<template>
  <Modal>
    <transition appear name="app-popup">
      <div class="popup">
        <a href="#" class="close" @click="handleClose">
          <span class="visually-hidden">Закрыть попап</span>
        </a>
        <div class="popup__title">
          <h2 class="title">Спасибо за заказ</h2>
        </div>
        <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
        <div class="popup__button">
          <a href="#" class="button" @click="handleClose">Отлично, я жду!</a>
        </div>
      </div>
    </transition>
  </Modal>
</template>
<script>
import Modal from "./AppModal";

export default {
  name: "AppPopup",
  components: { Modal },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.app-popup-enter-active {
  animation: fadeInDown 0.5s ease;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(-50%, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
