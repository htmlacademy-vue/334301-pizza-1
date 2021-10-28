<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="test"
          class="select"
          @change="onSelectChange"
          v-if="this.isAuthenticated === false"
        >
          <option
            value="pickup"
            :selected="form.activeDeliveryOption === 'pickup'"
          >
            Заберу сам
          </option>
          <option value="new" :selected="form.activeDeliveryOption === 'new'">
            Адрес
          </option>
        </select>

        <select name="test" class="select" @change="onSelectChange" v-else>
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
            v-for="addressInfo in addressList"
            :key="`form-address-${addressInfo.id}`"
            :value="addressInfo.id"
            :selected="form.activeDeliveryOption === addressInfo.id"
          >
            {{ addressInfo.name }}
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
              :disabled="form.activeDeliveryOption !== 'new'"
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
              :disabled="form.activeDeliveryOption !== 'new'"
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
              :disabled="form.activeDeliveryOption !== 'new'"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { UPDATE_CART_FORM } from "@/store/mutation-types.js";

export default {
  name: "CartForm",
  data() {
    return {
      activeDeliveryOption: "pickup",
      addressListLoaded: false,
    };
  },
  computed: {
    ...mapState("Auth", ["user", "isAuthenticated"]),
    ...mapState("Cart", ["form"]),
    ...mapState("Address", ["addressList"]),
  },
  methods: {
    ...mapActions("Address", {
      handelAddressDownload: "getAddressList",
    }),
    ...mapMutations("Cart", {
      handelCartFormUpdate: UPDATE_CART_FORM,
    }),
    onSelectChange(evt) {
      const { value } = evt.target;
      this.handelCartFormUpdate({ key: "activeDeliveryOption", value });

      if (value !== "new" && value !== "pickup") {
        const selectedAddress = this.addressList.find(
          (item) => item.id === parseInt(value, 10)
        );

        this.handelCartFormUpdate({
          key: "street",
          value: selectedAddress.street,
        });
        this.handelCartFormUpdate({
          key: "house",
          value: selectedAddress.building,
        });
        this.handelCartFormUpdate({
          key: "apartment",
          value: selectedAddress.flat,
        });
      }
    },
    onInputChange(evt) {
      const { name, value } = evt.target;
      this.handelCartFormUpdate({ key: name, value });
    },
    prepareUserAddresses() {
      if (this.isAuthenticated === true && this.addressListLoaded === false) {
        this.addressListLoaded = true;
        this.handelCartFormUpdate({
          key: "tel",
          value: this.user.phone,
        });

        this.handelAddressDownload();
      }
    },
  },
  updated() {
    this.prepareUserAddresses();
  },
  mounted() {
    this.prepareUserAddresses();
  },
};
</script>
