import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from '@/pages/TeamsList';
import TeamsFooter from '@/pages/TeamsFooter';
import TeamMembers from '@/components/teams/TeamMembers';
import UsersList from '@/pages/UsersList';
import UsersFooter from '@/pages/UsersFooter';
import NotFound from '@/pages/NotFound';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/teams',
    },
    {
      name: 'teams',
      path: '/teams',
      meta: { needsAuth: true },
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      beforeEnter(to, from, next) {
        console.log(to, from);
        next();
      },
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
  // scrollBehavior(to, from, savedPosition) {
  // console.log(to, from, savedPosition);
  // },
});
router.beforeEach((to, from, next) => {
  console.log(to, from, next);
  if (to.meta.needsAuth) {
    console.log('Needs auth');
  }
  next();
});

router.afterEach((to, from) => {
  console.log(to, from);
  console.log('after each');
});

export default router;
