<template>
  <div>
    <div class="layout__address">
      <div
        class="sheet address-form"
        v-for="(addressInfo, addressIndex) in addressList"
        :key="`address-${addressInfo.id}`"
      >
        <div class="address-form__header">
          <b>{{ `Адрес №${addressIndex + 1}. ${addressInfo.name}` }}</b>
          <div class="address-form__edit">
            <button
              type="button"
              class="icon"
              @click="onEditButtonClick(addressInfo)"
            >
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p>
          {{
            `${addressInfo.street}, ${addressInfo.building}${
              addressInfo.flat ? `, ${addressInfo.flat}` : ""
            }`
          }}
        </p>
        <small v-if="addressInfo.comment && addressInfo.comment.length > 0">{{
          addressInfo.comment
        }}</small>
      </div>
    </div>

    <div class="layout__address" v-if="formStatus !== ''">
      <form
        action="test.html"
        method="post"
        class="address-form address-form--opened sheet"
      >
        <div class="address-form__header">
          <b>{{ `Адрес №${formAddressNumber}` }}</b>
        </div>

        <div class="address-form__wrapper">
          <div class="address-form__input">
            <label class="input">
              <span>Название адреса*</span>
              <input
                type="text"
                name="name"
                placeholder="Введите название адреса"
                required
                v-model="inputs.name"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--normal">
            <label class="input">
              <span>Улица*</span>
              <input
                type="text"
                name="street"
                placeholder="Введите название улицы"
                required
                v-model="inputs.street"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Дом*</span>
              <input
                type="text"
                name="building"
                placeholder="Введите номер дома"
                required
                v-model="inputs.building"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Квартира</span>
              <input
                type="text"
                name="flat"
                placeholder="Введите № квартиры"
                v-model="inputs.flat"
              />
            </label>
          </div>
          <div class="address-form__input">
            <label class="input">
              <span>Комментарий</span>
              <input
                type="text"
                name="comment"
                placeholder="Введите комментарий"
                v-model="inputs.comment"
              />
            </label>
          </div>
        </div>

        <div class="address-form__buttons">
          <button
            type="button"
            class="button button--transparent"
            @click="onDeleteButtonClick"
            :disabled="networking"
          >
            Удалить
          </button>
          <button
            type="submit"
            class="button"
            @click.prevent="onSubmitButtonClick"
            :disabled="submitDisable || networking"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="onAddButtonClick"
        v-if="formStatus === ''"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const FRORM_STATUS = {
  NEW: "new",
  EDIT: "edit",
};

export default {
  name: "ProfileAddress",
  data() {
    return {
      networking: false,
      formStatus: "",
      editableAddressId: "",
      inputs: {
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
    };
  },
  computed: {
    ...mapState("Address", ["addressList"]),
    submitDisable() {
      return (
        this.inputs.name.split(" ").join("").length === 0 ||
        this.inputs.street.split(" ").join("").length === 0 ||
        this.inputs.building.split(" ").join("").length === 0
      );
    },
    formAddressNumber() {
      if (this.editableAddressId) {
        return (
          this.addressList.findIndex(
            (item) => item.id === this.editableAddressId
          ) + 1
        );
      }

      return this.addressList.length + 1;
    },
  },
  methods: {
    ...mapActions("Address", {
      handelAddressDownload: "getAddressList",
      handelAddressAdd: "postAddress",
      handelAddressUpdate: "updateAddress",
      handelAddressDelete: "deleteAddress",
    }),
    handelFormReset() {
      this.formStatus = "";
      this.editableAddressId = "";
      this.inputs = {
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
      this.networking = false;
    },
    onEditButtonClick(addressInfo) {
      this.formStatus = FRORM_STATUS.EDIT;
      this.editableAddressId = addressInfo.id;
      this.inputs = {
        name: addressInfo.name,
        street: addressInfo.street,
        building: addressInfo.building,
        flat: addressInfo.flat,
        comment: addressInfo.comment,
      };
    },
    onAddButtonClick() {
      this.formStatus = FRORM_STATUS.NEW;
    },
    async onDeleteButtonClick() {
      if (this.formStatus === FRORM_STATUS.EDIT) {
        this.networking = true;

        await this.handelAddressDelete(this.editableAddressId);
      }

      this.handelFormReset();
    },
    async onSubmitButtonClick() {
      this.networking = true;

      switch (this.formStatus) {
        case FRORM_STATUS.NEW:
          await this.handelAddressAdd({ ...this.inputs });
          break;
        case FRORM_STATUS.EDIT:
          await this.handelAddressUpdate({
            ...this.inputs,
            id: this.editableAddressId,
          });
          break;
        default:
          break;
      }

      this.handelFormReset();
    },
  },
  async mounted() {
    await this.handelAddressDownload();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

@import "~@/assets/scss/layout/layout";
@import "~@/assets/scss/layout/sheet";

@import "~@/assets/scss/blocks/address-form";
@import "~@/assets/scss/blocks/button";
</style>
