import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResourse from 'vue-resource';
import VeeValidate from 'vee-validate';
import Auth from './plugins/Auth';
import router from './router';
import store from './store';
import App from './App';

Vue.use(VueRouter);
Vue.use(VueResourse);
Vue.use(VeeValidate);
Vue.use(Auth);

Vue.config.productionTip = false;
Vue.http.options.root = 'http://localhost:9000';

window.app = new Vue({
  router,
  store,
  el: '#app',
  render: createElement => createElement(App),
});
