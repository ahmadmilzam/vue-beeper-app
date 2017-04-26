<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
    name: 'app',
    created() {
      this.$store.commit('auth/setLogin', this.$auth.isLoggedIn());
    },
  };
</script>

<style src="@/assets/scss/main.scss" lang="scss"></style>
