// client/src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ProfileView from "../views/ProfileView.vue";
import ProductsView from "../views/ProductsView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegisterView },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: "/products",
    name: "Products",
    component: ProductsView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
