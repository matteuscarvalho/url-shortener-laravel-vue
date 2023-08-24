import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      meta: {
        title: 'Autenticação'
      },
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      meta: {
        title: 'Cadastro'
      },
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      meta: {
        title: 'Dashboard'
      },
      name: "dashboard",
      path: "/dashboard",
      component: DashboardLayout,
      children: [
        {
          name: "dashboard",
          path: "",
          component: () => import("../views/DashboardView.vue"),
        },
      ],
    },
    {
      meta: {
        title: 'Redirecionando...'
      },
      name: "redirect",
      path: "/:code",
      component: () => import("../views/RedirectView.vue"),
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

router.beforeEach(async (to) => {
  if (["/"].includes(to.path)) {
    router.push("/dashboard");
  }

  const publicPages = ["/login", "/register"];
  const store = useAuthStore();

  if (!publicPages.includes(to.path) && !store.isLoggedIn) return "/login";
});

export default router;
