import resources from "@/common/enums/resources";
import {
  ReadOnlyApiService,
  AuthApiService,
  AddressApiService,
  OrdersApiService,
} from "@/services/api.service";

export const createResources = () => {
  return {
    [resources.MISC]: new ReadOnlyApiService(resources.MISC),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH),
    [resources.INGREDIENTS]: new ReadOnlyApiService(resources.INGREDIENTS),
    [resources.AUTH]: new AuthApiService(),
    [resources.ADDRESS]: new AddressApiService(),
    [resources.ORDERS]: new OrdersApiService(),
  };
};
