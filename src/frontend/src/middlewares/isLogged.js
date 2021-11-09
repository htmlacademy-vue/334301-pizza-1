import { AppRoute } from "../common/const/route";

const isLogged = async ({ store, next, nextMiddleware }) => {
  if (store.$jwt.getToken()) {
    next(AppRoute.PROFILE);
  }

  return nextMiddleware();
};

export default isLogged;
