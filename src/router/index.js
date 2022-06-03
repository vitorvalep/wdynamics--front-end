import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "upload",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/UploadView.vue"),
    },
    {
      path: "/graphs",
      name: "graphs",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/GraphsView.vue"),
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.resultData) {
          next(); // <-- everything good, proceed
        } else {
          next({ name: "upload" }); // <-- redirect to setup
        }
      },
    },
  ],
});

export default router;
