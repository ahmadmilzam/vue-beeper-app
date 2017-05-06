<template>
  <ul v-if="beeps && beeps.length > 0" class="c-list-ui c-list-ui--none">
    <li
      v-for="beep in beeps"
      :key="beep"
      class="c-list-ui__item">
        <beep-item :beep="beep"></beep-item>
      </li>
  </ul>
</template>
<script>
  import BeepItem from '@/components/beep/BeepItem';

  export default {
    name: 'beep-list',
    props: {
      beeps: {
        type: Array,
        required: true,
      },
    },
    components: {
      BeepItem,
    },
  };
</script>
