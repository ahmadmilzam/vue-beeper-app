<template>
  <div class="c-navbar">
    <div class="o-wrapper">
      <div class="c-navbar__left">
        <router-link class="c-navbar__title" :to="{ name: 'homeURL' }" exact active-class="">
          <img src="../../../assets/img/logo.png" class="c-navbar__logo"></img>{{ title }}
        </router-link>
        <ul class="c-navbar__menu">
          <router-link class="c-navbar__item" tag="li" :to="{ name: 'homeURL' }" exact active-class="is-active">
            <a class="c-navbar__link" title="Home">Home</a>
          </router-link>
          <router-link class="c-navbar__item" tag="li" :to="{ name: 'aboutURL' }" active-class="is-active">
            <a class="c-navbar__link" title="About">About</a>
          </router-link>
        </ul>
      </div>
      <div class="c-navbar__right">
        <ul class="c-navbar__menu" v-if="isLoggedIn">
          <router-link
            class="c-navbar__item"
            tag="li"
            :to="{ name: 'logoutURL' }" active-class="is-active">
            <a class="c-navbar__link" title="Logout">Logout</a>
          </router-link>
        </ul>
        <ul class="c-navbar__menu" v-else>
          <router-link
            class="c-navbar__item"
            tag="li"
            :to="{ name: 'loginURL' }" active-class="is-active">
            <a class="c-navbar__link" title="Login">Login</a>
          </router-link>
          <router-link
            class="c-navbar__item"
            tag="li"
            :to="{ name: 'registerURL' }" active-class="is-active">
            <a class="c-navbar__link" title="Register">Register</a>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navbar',
    data() {
      return {
        title: 'Mini Vue App',
        isLoggedIn: null,
      };
    },
    created() {
      this.isLoggedIn = this.$store.state.auth.isLoggedIn;
    },
  };
</script>
