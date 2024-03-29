import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Order from "../views/Order.vue";
import Profile from "../views/Profile.vue";
import Product from "../views/Product.vue"
import { authGuard } from "../auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: '/products/:id',
      name: 'product',
      component: Product,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      beforeEnter: authGuard
    },
    {
      path: "/order",
      name: "order",
      component: Order,
      beforeEnter: authGuard
    },
  ]
});

export default router;

  