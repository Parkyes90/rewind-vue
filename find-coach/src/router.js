import { createRouter, createWebHistory } from 'vue-router';
import store from './store';

const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');

const CoachesList = () => import('./pages/coaches/CoachesList.vue');

const CoachRegister = () => import('./pages/coaches/CoachRegister.vue');

const RequestReceived = () => import('./pages/requests/RequestReceived.vue');

const ContactCoach = () => import('./pages/requests/ContactCoach.vue');

const UserAuth = () => import('./pages/auth/UserAuth.vue');

const NotFound = () => import('./pages/NotFound.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },

    {
      path: '/coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    {
      path: '/register',
      component: CoachRegister,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestReceived,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  const { requiresAuth, requiresUnAuth } = to.meta;
  if (requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (requiresUnAuth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
