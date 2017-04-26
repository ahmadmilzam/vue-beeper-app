<template>
  <ul v-if="beeps.data && beeps.data.length > 0" class="c-list-ui c-list-ui--none">
    <li
      v-for="beep in beeps.data"
      :key="beep"
      class="c-list-ui__item">
        <beep-item :beep="beep"></beep-item>
      </li>
  </ul>
  <p v-else>
    Sorry you have no Beeps yet.
  </p>
</template>
<script>
  import BeepItem from '@/components/beep/BeepItem';

  export default {
    name: 'beep-list',
    data() {
      return {
        beeps: {},
      };
    },
    components: {
      BeepItem,
    },
    methods: {
      getBeeps() {
        const { token } = this.$auth.getToken();
        this.$http.get('beeps', { headers: {
          Authorization: `Bearer ${token}`,
        } }).then(this.getSuccess, this.getFail);
      },
      getSuccess(res) {
        console.log('get beeps success', res);
        this.beeps = res.body;
        console.log('all beeps', this.beeps);
      },
      getFail(res) {
        console.log('get beeps fail', res);
      },
    },
    created() {
      this.getBeeps();
    },
  };
</script>
