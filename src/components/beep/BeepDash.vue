<template>
  <div class="o-layout">
    <div class="o-layout__item u-6of12-medium u-4of12-large">
      <beep-form></beep-form>
    </div>
    <div class="o-layout__item u-6of12-medium u-8of12-large">
      <beep-feed></beep-feed>
    </div>
  </div>
</template>

<script>
  import BeepFeed from '@/components/beep/BeepFeed';
  import BeepForm from '@/components/beep/BeepForm';

  export default {
    name: 'beep-dash',
    data() {
      return {
        title: 'Beep Dash',
      };
    },
    components: {
      BeepFeed,
      BeepForm,
    },
    created() {
      window.document.title = this.title;
    },
  };
</script>
