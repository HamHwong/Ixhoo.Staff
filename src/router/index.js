import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import {getCookie} from '@/utils/cookie.js';

Vue.use(Router)
// Vue.use(getCookie)

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
        // query: {
        //   redirect: to.fullPath
        // } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})
export default router
