import { createRouter, createWebHistory } from "vue-router";
import store from "./store.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./pages/HomePage.vue"),
    },
    {
      path: "/teams",
      component: () => import("./pages/AllTeams.vue"),
    },
    {
      path: "/help",
      component: () => import("./pages/HelpPage.vue"),
    },
    {
      path: "/help/:id",
      component: () => import("./pages/HelpQuery.vue"),
      props: true,
    },
    {
      path: "/why-made",
      component: () => import("./pages/WhyPage.vue"),
    },
    {
      path: "/login",
      component: () => import("./pages/LoginPage.vue"),
      meta: {
        requiresUnauth: true,
      },
    },
    {
      path: "/admin",
      component: () => import("./pages/AdminPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/:notFound(.*)",
      component: () => import("./pages/NotFound.vue"),
    },
  ],
});
router.beforeEach((to, _, next) => {
  if (to.meta.requiresUnauth && store.getters.isAuth) {
    next("/admin");
  } else if (to.meta.requiresAuth && !store.getters.isAuth) {
    next("/login");
  } else {
    next();
  }
});

export default router;
