<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <img :src="user.avatar" :alt="user.name" width="72" height="72" />
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>

    <div v-if="addresses.length" class="layout__address">
      <template v-for="(address, index) in addresses">
        <AddressForm
          :key="address.id"
          v-if="editedAddressId === address.id"
          :number="index + 1"
          :address="address"
          @closeForm="closeForm"
        />
        <div v-else :key="address.id" class="sheet address-form">
          <div class="address-form__header">
            <b>{{ address.name }}</b>
            <div class="address-form__edit">
              <button
                type="button"
                class="icon"
                @click="setEditedAddress(address)"
              >
                <span class="visually-hidden">Изменить адрес</span>
              </button>
            </div>
          </div>
          <p>{{ addressToString(address) }}</p>
          <small>{{ address.comment }}</small>
        </div>
      </template>
    </div>

    <div v-if="editedAddressId === newAddressId" class="layout__address">
      <AddressForm :number="addresses.length + 1" @closeForm="closeForm" />
    </div>

    <div v-else class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="editedAddressId = newAddressId"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddressForm from "../common/components/AppAddressForm";
import { AppRoute } from "../common/const/route";

export default {
  data() {
    return {
      newAddressId: "new",
      AppRoute,
      editedAddressId: null,
    };
  },
  components: { AddressForm },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      addresses: "auth/getUserAddresses",
    }),
  },
  methods: {
    ...mapActions({
      setAddresses: "auth/loadUserAddresses",
    }),
    addressToString(address) {
      const apart = +address.flat !== 0 ? `, оф. ${address.flat}` : "";
      return `${address.street}, д. ${address.building}${apart}`;
    },
    setEditedAddress(address) {
      this.editedAddressId = address.id;
    },
    async closeForm() {
      this.editedAddressId = null;
      await this.setAddresses();
    },
  },
};
</script>
