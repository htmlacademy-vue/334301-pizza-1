import Vue from "vue";
import JWTService from "../services/jwt.service";
import Notifier from "./notifier";
import store from "../store";
import createResources from "../common/utils/create-resources";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JWTService,
        $notifier: () => new Notifier(store),
        $api() {
          return createResources(this.$notifier);
        },
      },
    });
  },
};

Vue.use(plugins);
