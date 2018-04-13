import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import index from '@/components/index'
import {
  getCookie,
  setCookie,
  removeCookie
} from '../utils/cookie.js';

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/',
      name: 'Index',
      component: index,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    var token = null;
    if (token = getCookie("token")) {
      next();
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next();
  }
})
export default router
