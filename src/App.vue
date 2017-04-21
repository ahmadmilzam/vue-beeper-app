<template>
  <div id="root-app">
    <navbar></navbar>
    <div class="o-wrapper u-padding-top u-padding-bottom">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/layouts/Navbar';

  export default {
    name: 'app',
    components: {
      Navbar,
    },
  };
</script>

<style src="./scss/main.scss" lang="scss"></style>
