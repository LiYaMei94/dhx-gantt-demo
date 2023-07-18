import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/gantt",
    name: "About",
    component: () => import("../views/Gantt.vue"),
  },
  {
    path: "/gantt-basic",
    name: "GanttBasic",
    component: () => import("../views/GanttBasic.vue"),
  },
  {
    path: "/gantt-marker",
    name: "GanttMarker",
    component: () => import("../views/GanttMarker.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
