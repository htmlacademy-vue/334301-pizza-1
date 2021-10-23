<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="test" class="select" @change="onSelectChange">
          <option
            value="pickup"
            :selected="form.activeDeliveryOption === 'pickup'"
          >
            Заберу сам
          </option>
          <option value="new" :selected="form.activeDeliveryOption === 'new'">
            Новый адрес
          </option>
          <option
            value="addressId"
            :selected="form.activeDeliveryOption === 'addressId'"
          >
            Дом
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          :value="form.tel"
          @input="onInputChange"
        />
      </label>

      <div
        class="cart-form__address"
        v-if="form.activeDeliveryOption !== 'pickup'"
      >
        <span class="cart-form__label"
          >{{
            form.activeDeliveryOption === "new" ? "Новый адрес" : "Адрес"
          }}:</span
        >

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              :value="form.street"
              @input="onInputChange"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              :value="form.house"
              @input="onInputChange"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              :value="form.apartment"
              @input="onInputChange"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { UPDATE_CART_FORM } from "@/store/mutation-types.js";

export default {
  name: "CartForm",
  data() {
    return {
      activeDeliveryOption: "pickup",
    };
  },
  computed: {
    ...mapState("Cart", ["form"]),
  },
  methods: {
    ...mapMutations("Cart", {
      handelCartFormUpdate: UPDATE_CART_FORM,
    }),
    onSelectChange(evt) {
      const { value } = evt.target;
      this.handelCartFormUpdate({ key: "activeDeliveryOption", value });
    },
    onInputChange(evt) {
      const { name, value } = evt.target;
      this.handelCartFormUpdate({ key: name, value });
    },
  },
};
</script>
