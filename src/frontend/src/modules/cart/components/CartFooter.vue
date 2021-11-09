<template>
  <section class="footer">
    <div class="footer__more">
      <router-link
        :to="AppRoute.MAIN"
        class="button button--border button--arrow"
      >
        Хочу еще одну
      </router-link>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ cartPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <button type="submit" class="button" @click.prevent="handleSubmit">
        Оформить заказ
      </button>
    </div>

    <transition name="modal">
      <Popup v-if="isShowPopup" @close="handleClose" />
    </transition>
  </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Popup from "../../../common/components/AppPopup";
import { prepareOrder } from "../helpers/prepare-order";
import resources from "../../../common/enums/resources";
import validator from "../../../common/mixins/validator";
import { AddressValidations } from "../../../common/const/validation";
import { getValidationErrorMessage } from "../../../common/utils/helpers/validation";
import { AppRoute } from "../../../common/const/route";

export default {
  name: "CartFooter",
  data() {
    return {
      AppRoute,
      isShowPopup: false,
    };
  },
  mixins: [validator],
  components: { Popup },
  computed: {
    ...mapGetters({
      cartPrice: "cart/price",
      user: "auth/getUser",
    }),
  },
  methods: {
    ...mapActions({
      clearCart: "cart/clearCart",
      clearAddress: "orders/clearAddress",
    }),
    validateAddress(address) {
      if (!address) {
        return true;
      }
      const validations = { ...AddressValidations };
      delete validations.name;
      if (
        !this.$validateFields(
          { street: address.street, building: address.building },
          validations
        )
      ) {
        const errorMessage = getValidationErrorMessage(validations, "АДРЕС");
        this.$notifier.error(errorMessage);
        return false;
      }

      return true;
    },

    async handleSubmit() {
      const storedAddress = this.$store.state.orders.address;
      if (!this.validateAddress(storedAddress)) {
        return;
      }

      const address = storedAddress ? { address: storedAddress } : {};
      const order = {
        ...prepareOrder(this.$store),
        ...address,
      };

      try {
        await this.$api[resources.ORDERS].post(order);
      } catch (e) {
        console.log(e);
      }

      this.isShowPopup = true;
    },

    async handleClose() {
      this.isShowPopup = false;
      const route = this.user ? AppRoute.ORDERS : AppRoute.MAIN;

      setTimeout(async () => {
        await Promise.all([
          this.$router.push(route),
          this.clearCart(),
          this.clearAddress(),
        ]);
      }, 100);
    },
  },
};
</script>
