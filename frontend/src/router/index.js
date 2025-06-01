import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import ChargerListingView from "../views/ChargerListingView.vue";
import MapViewPage from "../views/MapViewPage.vue";
import Register from "@/components/Register.vue";
import ChargerForm from "@/components/ChargerForm.vue";

const routes = [
   { path: "/", redirect: "/login" },
   { path: "/login", name: "Login", component: LoginView },
   { path: "/register", name: "Register", component: Register },
   {
      path: "/chargers",
      name: "ChargerListing",
      component: ChargerListingView,
      meta: { requiresAuth: true },
   },
   {
      path: "/map",
      name: "MapView",
      component: MapViewPage,
      meta: { requiresAuth: true },
   },
   {
      path: "/charger-form/:id?",
      name: "ChargerForm",
      component: ChargerForm,
      props: true,
      meta: { requiresAuth: true },
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

// 🔒 Global navigation guard
router.beforeEach((to, from, next) => {
   const isLoggedIn = !!localStorage.getItem("accessToken"); 

   if (to.meta.requiresAuth && !isLoggedIn) {
      next("/login");
   } else {
      next();
   }
});

export default router;
