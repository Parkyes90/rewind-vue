import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from '@/pages/coaches/CoachDetail';
import CoachesList from '@/pages/coaches/CoachesList';
import CoachRegister from '@/pages/coaches/CoachRegister';
import ContactCoach from '@/pages/requests/ContactCoach';
import RequestReceived from '@/pages/requests/RequestReceived';
import NotFound from '@/pages/NotFound';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },

    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    { path: '/register', component: CoachRegister },
    { path: '/requests', component: RequestReceived },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
