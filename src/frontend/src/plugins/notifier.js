import notificationTypes from "../common/enums/notifications";

export default class Notifier {
  constructor(store) {
    this._store = store;
  }

  _store;

  info(text) {
    this._store.dispatch("createNotification", {
      text,
      type: notificationTypes.INFO,
    });
  }

  success(text) {
    this._store.dispatch("createNotification", {
      text,
      type: notificationTypes.SUCCESS,
    });
  }

  error(text) {
    this._store.dispatch("createNotification", {
      text,
      type: notificationTypes.ERROR,
    });
  }

  warning(text) {
    this._store.dispatch("createNotification", {
      text,
      type: notificationTypes.WARNING,
    });
  }
}
