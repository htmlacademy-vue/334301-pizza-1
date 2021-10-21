import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import Cart from "../views/Cart.vue";
import Orders from "../views/Orders.vue";
import Profile from "../views/Profile.vue";

export default [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: { layout: "AppLayoutDefault" },
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { layout: "AppLayoutDefault" },
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    meta: { layout: "AppLayoutInner" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { layout: "AppLayoutInner" },
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: Login,
    meta: { layout: "AppLayoutEmpty" },
  },
];
