import JWTService from "../services/jwt.service";
import Notifier from "./notifier";
import createResources from "../common/utils/create-resources";

export default (store) => {
  store.$jwt = JWTService;
  store.$notifier = new Notifier(store);
  store.$api = createResources(store.$notifier);
};
