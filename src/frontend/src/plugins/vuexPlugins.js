import JWTService from "@/services/jwt.service";
import { createResources } from "@/common/helpers";

export default function (store) {
  store.$jwt = JWTService;
  store.$api = createResources(store.$notifier);
}
