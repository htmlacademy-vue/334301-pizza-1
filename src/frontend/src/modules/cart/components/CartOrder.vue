<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select class="select" @change="handleSelectChange">
          <option :selected="!address" value="null">Заберу сам</option>
          <option value="0">Новый адрес</option>
          <option
            v-for="addressItem in addresses"
            :key="addressItem.id"
            :value="addressItem.id"
            :selected="address && address.name === addressItem.name"
          >
            {{ addressItem.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          :value="phone"
        />
      </label>

      <div v-if="address" class="cart-form__address">
        <span class="cart-form__label">{{ address.name }}</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              v-model="address.street"
              :disabled="!isNewAddress"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              v-model="address.building"
              :disabled="!isNewAddress"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              v-model="address.flat"
              :disabled="!isNewAddress"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DefaultAddress } from "../../../common/const/common";

export default {
  name: "CartOrder",
  data() {
    return {
      isNewAddress: false,
      address: null,
    };
  },
  created() {
    this.address = this.$store.getters["orders/getAddress"];
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      addresses: "auth/getUserAddresses",
    }),
    phone() {
      return this.user?.phone || null;
    },
  },
  watch: {
    address() {
      this.setAddress(this.address);
    },
  },
  methods: {
    handleSelectChange(evt) {
      const { value } = evt.target;

      if (value === "0") {
        this.isNewAddress = true;
        this.address = { ...DefaultAddress };
      } else {
        this.address = this.addresses.find((item) => item.id === +value);
        this.isNewAddress = false;
      }
    },
    ...mapActions({
      setAddress: "orders/setAddress",
    }),
  },
};
</script>
