import { setAuth } from "@/common/helpers";

export default function auth({ next, store, nextMiddleware }) {
  if (store.state.Auth.isAuthenticated === false) {
    const token = store.$jwt.getToken();

    if (token) {
      setAuth(store);
    }
  }
  return nextMiddleware();
}
