// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
import VueAMap from 'vue-amap';

import {
  getCookie,
  setCookie,
  removeCookie
} from './utils/cookie.js';

Vue.config.productionTip = false
Vue.prototype.getCookie = getCookie;
Vue.prototype.setCookie = setCookie;
Vue.prototype.removeCookie = removeCookie;
Vue.use(Mint);
//初始化高德地图组件
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '380d3e2fee8d89a9e236bc8975dc6df9',
  plugin: ['AMap.PlaceSearch', 'AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
