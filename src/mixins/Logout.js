const logoutMixin = {
  methods: {
    logout() {
      console.log('logout event');
      this.$auth.destroyToken();
      this.$store.commit('auth/setLogin', false);
      this.$router.push({ name: 'homeURL' });
    },
  },
};

export default logoutMixin;
