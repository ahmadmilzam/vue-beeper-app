export default {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: {
    setLogin(state, payload) {
      state.isLoggedIn = payload;
    },
  },
};
