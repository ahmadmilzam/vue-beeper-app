<template>
  <div class="c-navbar">
    <div class="o-wrapper">
      <div class="c-navbar__left">
        <router-link class="c-navbar__title" :to="{ name: 'homeURL' }" exact active-class="">
          <img src="../../assets/logo.png" class="c-navbar__logo"></img>{{ title }}
        </router-link>
        <ul class="c-navbar__menu">
          <router-link class="c-navbar__item" tag="li" :to="{ name: 'homeURL' }" exact active-class="is-active">
            <a class="c-navbar__link">Home</a>
          </router-link>
          <router-link class="c-navbar__item" tag="li" :to="{ name: 'aboutURL' }" active-class="is-active">
            <a class="c-navbar__link">About</a>
          </router-link>
        </ul>
      </div>
      <div class="c-navbar__right">
        <ul class="c-navbar__menu">
          <router-link class="c-navbar__item" tag="li" :to="{ name: 'loginURL' }" active-class="is-active">
            <a class="c-navbar__link">Login</a>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Mini Vue App',
      };
    },
  };
</script>
