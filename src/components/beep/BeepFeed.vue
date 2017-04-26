<template>
  <div class="c-panel">
    <div class="c-panel__body">
      <h1 class="u-h3">{{ title }}</h1>

      <beep-list></beep-list>
    </div>
  </div>
</template>

<script>
  import BeepList from '@/components/beep/BeepList';
  import { throttle } from '@/helpers/util';

  export default {
    name: 'beep-feed',
    data() {
      return {
        title: 'Beep Feed',
      };
    },
    components: {
      BeepList,
    },
    methods: {
      onScrolledBottom() {
        const offset = 100;
        if (document.body.scrollTop + window.innerHeight > document.body.clientHeight - offset) {
          console.log('near bottom!');
        }
      },
    },
    mounted() {
      window.addEventListener('scroll', throttle(this.onScrolledBottom, 100));
    },
  };
</script>
