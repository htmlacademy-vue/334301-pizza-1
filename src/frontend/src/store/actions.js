import { uniqueId } from "lodash";
import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from "./mutation-types";
import { MESSAGE_LIVE_TIME } from "../common/const/common";

export default {
  async init({ dispatch }) {
    await dispatch("cart/loadData");
    await dispatch("builder/loadData");
    await dispatch("builder/init");
    await dispatch("cart/init");
  },

  async createNotification({ commit }, { ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: uniqueId(),
    };
    commit(ADD_NOTIFICATION, uniqueNotification);
    setTimeout(
      () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },
};
