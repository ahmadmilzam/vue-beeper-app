<template>
  <component :is="activeComponent"></component>
</template>

<script>
  import BeepDash from '@/components/beep/BeepDash';
  import BeepPublic from '@/components/beep/BeepPublic';

  export default {
    name: 'home',
    data() {
      return {
        title: 'Public Home Page',
        activeComponent: 'BeepPublic',
        isLoggedIn: false,
      };
    },
    components: {
      BeepDash,
      BeepPublic,
    },
    created() {
      this.isLoggedIn = this.$store.state.auth.isLoggedIn;
      this.activeComponent = this.isLoggedIn ? 'BeepDash' : 'BeepPublic';
    },
  };
</script>
