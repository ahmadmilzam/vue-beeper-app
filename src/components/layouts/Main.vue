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
  import Navbar from './partials/Navbar';

  export default {
    name: 'main',
    components: {
      Navbar,
    },
  };
</script>
