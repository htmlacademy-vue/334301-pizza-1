import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import VuexPlugins from "../plugins/vuex-plugins";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

const state = () => ({
  notifications: [],
});

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  plugins: [VuexPlugins],
});
