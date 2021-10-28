export default function authRequired({ next, store, nextMiddleware }) {
  if (!store.$jwt.getToken()) {
    next("/sign-in");
  }

  return nextMiddleware();
}
