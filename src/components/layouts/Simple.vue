<template>
  <div id="root-app" class="c-intro">
    <div class="c-intro__content">
      <div class="o-layout o-layout--center">
        <div class="o-layout__item u-6of12-medium u-4of12-large u-padding-top u-padding-bottom">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
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
