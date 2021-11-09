import { Entity } from "../store/modules/auth/const";

const addresses = async ({ store, nextMiddleware }) => {
  if (store.state.auth[Entity.IS_AUTHENTICATED]) {
    await store.dispatch("auth/loadUserAddresses");
  }

  return nextMiddleware();
};

export default addresses;
