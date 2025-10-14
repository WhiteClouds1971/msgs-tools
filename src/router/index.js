import { createWebHistory, createRouter } from 'vue-router';

import constantRoutes from './routes';

console.log('constantRoutes', constantRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  console.log('form', from);
  console.log('to', to);
  next();
});
export default router;
