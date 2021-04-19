import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store';

const CoachDetail = defineAsyncComponent(() =>
  import('./pages/coaches/CoachDetail.vue')
);

const CoachesList = defineAsyncComponent(() =>
  import('./pages/coaches/CoachesList.vue')
);

const CoachRegister = defineAsyncComponent(() =>
  import('./pages/coaches/CoachRegister.vue')
);

const RequestReceived = defineAsyncComponent(() =>
  import('./pages/requests/RequestReceived.vue')
);

const ContactCoach = defineAsyncComponent(() =>
  import('./pages/requests/ContactCoach.vue')
);

const UserAuth = defineAsyncComponent(() =>
  import('./pages/auth/UserAuth.vue')
);

const NotFound = defineAsyncComponent(() => import('./pages/NotFound.vue'));

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
