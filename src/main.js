import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResourse from 'vue-resource';
import router from './router/index';
import App from './App';

Vue.use(VueRouter);
Vue.use(VueResourse);

Vue.config.productionTip = false;

window.app = new Vue({
  router,
  el: '#app',
  render: createElement => createElement(App),
});
