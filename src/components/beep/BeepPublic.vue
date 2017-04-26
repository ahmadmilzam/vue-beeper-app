<template>
  <div class="o-layout" v-else>
    <div class="o-layout__item">
      <div class="c-panel">
        <div class="c-panel__body">
          <h1 class="u-h3">{{ title }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'beep-public',
    data() {
      return {
        title: 'Public Beep Page',
      };
    },
    created() {
      window.document.title = this.title;
    },
  };
</script>
