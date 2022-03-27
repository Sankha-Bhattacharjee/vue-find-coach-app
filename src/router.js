import { createRouter, createWebHistory } from 'vue-router';

import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      props:true,
      component: CoachDetails,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    { path: '/register', component: CoachRegistration, meta: { reqAuth: true } },
    { path: '/requests', component: RequestsReceived, meta: { reqAuth: true } },
    {path:'/auth', component: UserAuth, meta: { reqUnAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function(to, from, next){
  if(to.meta.reqAuth && !store.getters.getIsAuthenticated){
    next('/auth');
  }else if(to.meta.reqUnAuth && store.getters.getIsAuthenticated){
    next('/coaches');
  }else{
    next();
  }
});

export default router;
