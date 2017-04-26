import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const CentralStore = new Vuex.Store({
  modules: {
    auth,
  },
  strict: debug,
});

export default CentralStore;
