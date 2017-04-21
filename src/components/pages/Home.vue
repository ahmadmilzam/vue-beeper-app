<template>
  <div class="o-layout">
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
    name: 'home',
    data() {
      return {
        title: 'Homepage',
      };
    },
    created() {
      window.document.title = this.title;
    },
  };
</script>
