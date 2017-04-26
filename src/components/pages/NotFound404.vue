<template>
  <div class="o-layout">
    <div class="o-layout__item">
      <div class="c-panel">
        <div class="c-panel__body">
          <h1 class="u-h3 u-text-center">{{ title }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        title: '404 Not Found',
      };
    },
    created() {
      window.document.title = this.title;
    },
  };
</script>
