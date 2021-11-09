import { Entity } from "../store/modules/auth/const";

const user = async ({ store, nextMiddleware }) => {
  if (!store.state.auth[Entity.IS_AUTHENTICATED]) {
    await store.dispatch("auth/setAuth");
  }

  return nextMiddleware();
};

export default user;
