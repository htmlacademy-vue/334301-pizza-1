import resources from "../enums/resources";
import {
  AuthApiService,
  ReadApiService,
  CrudApiService,
} from "../../services/api";

export default (notifier) => {
  return {
    fetchData: new ReadApiService(notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.DOUGH]: new ReadApiService(resources.DOUGH, notifier),
    [resources.INGREDIENTS]: new ReadApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.MISC]: new ReadApiService(resources.MISC, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
    [resources.SAUCES]: new ReadApiService(resources.SAUCES, notifier),
    [resources.SIZES]: new ReadApiService(resources.SIZES, notifier),
    [resources.USERS]: new ReadApiService(resources.USERS, notifier),
  };
};
