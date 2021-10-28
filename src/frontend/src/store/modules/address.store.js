import { SET_ADDRESS_LIST } from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    addressList: [],
  },
  actions: {
    async getAddressList({ commit }) {
      try {
        const data = await this.$api.address.get();
        commit(SET_ADDRESS_LIST, data);
      } catch {
        console.log("Addresss get error");
        commit(SET_ADDRESS_LIST, []);
      }
    },
    async postAddress({ dispatch, rootState }, addressData) {
      try {
        const postData = {
          ...addressData,
          userId: rootState.Auth.user.id,
        };
        await this.$api.address.post(postData);
        await dispatch("getAddressList");
      } catch {
        console.log("Addresss post error");
      }
    },
    async updateAddress({ dispatch, rootState }, addressData) {
      try {
        const updateData = {
          ...addressData,
          userId: rootState.Auth.user.id,
        };
        await this.$api.address.put(updateData);
        await dispatch("getAddressList");
      } catch {
        console.log("Addresss put error");
      }
    },
    async deleteAddress({ dispatch }, addressId) {
      try {
        await this.$api.address.delete(addressId);
        await dispatch("getAddressList");
      } catch {
        console.log("Addresss delete error");
      }
    },
  },
  mutations: {
    [SET_ADDRESS_LIST](state, payload) {
      state.addressList = [...payload];
    },
  },
};
