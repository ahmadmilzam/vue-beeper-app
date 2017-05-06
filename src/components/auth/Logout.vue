<template></template>
<script>
  export default {
    name: 'logout',
    created() {
      this.$auth.destroyToken();
      this.$auth.destroyData();
      this.$store.commit('auth/setLogin', false);
      this.$router.push({ name: 'homeURL' });
    },
  };
</script>
