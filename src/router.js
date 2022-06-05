import { createWebHistory, createRouter } from "vue-router";
import Home from './components/Home.vue'
import test from './components/test.vue'
import Write from './components/write.vue'

const routes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/write",
    component: Write,
  },
  {
    path: "/test",
    component: test,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 