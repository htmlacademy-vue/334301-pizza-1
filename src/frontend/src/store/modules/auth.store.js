import { UPDATE_AUTH_STATE, UPDATE_USER_DATA } from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: null,
  },
  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      dispatch("getMe");
    },
    async logout({ commit }, sendRequest = true) {
      if (sendRequest === true) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(UPDATE_AUTH_STATE, false);
      commit(UPDATE_USER_DATA, { user: null });
    },
    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        if (data === null) {
          dispatch("logout", false);

          return;
        }
        commit(UPDATE_AUTH_STATE, true);
        commit(UPDATE_USER_DATA, { user: data });
      } catch {
        dispatch("logout", false);
      }
    },
  },
  mutations: {
    [UPDATE_AUTH_STATE](state, payload) {
      state.isAuthenticated = payload;
    },
    [UPDATE_USER_DATA](state, payload) {
      state.user = { ...payload.user };
    },
  },
};
