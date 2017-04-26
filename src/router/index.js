import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
    return { x: 0, y: 0 };
  },
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  if (requiresAuth) {
    if (!Vue.auth.isLoggedIn()) {
      next({
        name: 'loginURL',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else if (requiresGuest) {
    if (Vue.auth.isLoggedIn()) {
      next({
        name: 'homeURL',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
