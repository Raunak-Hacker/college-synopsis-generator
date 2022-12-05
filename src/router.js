import { createRouter, createWebHistory } from "vue-router";

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
      path: "/why-made",
      component: () => import("./pages/WhyPage.vue"),
    },
    {
      path: "/login",
      component: () => import("./pages/LoginPage.vue"),
    },
    {
      path: "/admin",
      component: () => import("./pages/AdminPage.vue"),
    },
    {
      path: "/:notFound(.*)",
      component: () => import("./pages/NotFound.vue"),
    },


  ],
});

export default router;
