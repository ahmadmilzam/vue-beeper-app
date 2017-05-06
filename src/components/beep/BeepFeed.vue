<template>
  <div class="c-panel">
    <div class="c-panel__body">
      <h1 class="u-h3">{{ title }}</h1>

      <beep-list :beeps="beeps"></beep-list>
      <div v-show="stillLoadingBeeps" class="u-text-center o-box o-box--small">
        Getting your beeps...
        <span class="fa fa-spin fa-spinner"></span>
      </div>
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
        beeps: [],
        page: {},
        lastScrollTop: 0,
        stillLoadingBeeps: false,
        throttledFunction: null,
      };
    },
    components: {
      BeepList,
    },
    methods: {
      getBeeps(page) {
        const { token } = this.$auth.getToken();
        this.stillLoadingBeeps = true;
        this.$http.get(`beeps?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(this.getSuccess)
        // .catch(this.getFail)
        .then(() => {
          this.stillLoadingBeeps = false;
        });
      },
      getSuccess(res) {
        if (res.body.data.length > 0) {
          this.beeps = this.beeps.concat(res.body.data);
          this.page = { current: res.body.current_page, last: res.body.last_page };
        }
      },
      // getFail(res) {
      //   console.log('get beeps fail', res);
      // },
      handleScroll() {
        const offset = 100;
        const st = window.pageYOffset || document.body.scrollTop;

        // scrolling down
        if (st > this.lastScrollTop && !this.stillLoadingBeeps) {
          if (document.body.scrollTop + window.innerHeight > document.body.scrollHeight - offset) {
            // almost at the bottom
            if (this.page.current < this.page.last) {
              this.getBeeps(this.page.current + 1);
            }
          }
        }
        this.lastScrollTop = st;
      },
    },
    created() {
      this.getBeeps(1);
    },
    mounted() {
      this.lastScrollTop = window.pageYOffset || document.body.scrollTop;
      this.throttledFunction = throttle(this.handleScroll, 200);
      window.addEventListener('scroll', this.throttledFunction);
    },
    destroyed() {
      window.removeEventListener('scroll', this.throttledFunction);
    },
  };
</script>
