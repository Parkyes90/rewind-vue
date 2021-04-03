import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import TeamMembers from '@/components/teams/TeamMembers';
import TeamsList from '@/components/teams/TeamsList';
import UsersList from '@/components/users/UsersList';
import NotFound from '@/components/nav/NotFound';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/teams',
    },
    {
      path: '/teams',
      component: TeamsList,
      children: [{ path: ':teamId', component: TeamMembers, props: true }],
    },
    {
      path: '/users',
      component: UsersList,
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
});
const app = createApp(App);
app.use(router);
app.mount('#app');
