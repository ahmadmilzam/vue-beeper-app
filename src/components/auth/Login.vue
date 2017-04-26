<template>
  <div class="c-panel">
    <div class="c-panel__body">
      <h1 class="u-h3">Login</h1>
      <alert
        :type="alertType"
        :closeBtn="true"
        :show="showAlert"
        @onClosed="alertClosed">
        <p>{{ alertMsg }}</p>
      </alert>
      <form @submit.prevent="formSubmit" ref="loginForm" class="o-layout u-margin-top">
        <div class="o-layout__item u-margin-bottom--small">
          <label for="username" class="c-label">Username</label>
          <input
            v-model.trim="formData.username"
            v-validate="'required'"
            :class="{'c-input': true, 'is-invalid': errors.has('username')}"
            name="username"
            id="username"
            type="text"></input>
            <span
              v-show="errors.has('username')"
              class="u-text-small u-text-pink">{{ errors.first('username') }}</span>
        </div>
        <div class="o-layout__item u-margin-bottom--small">
          <label for="passowrd" class="c-label">Password</label>
          <input
            v-model.trim="formData.password"
            v-validate="'required'"
            :class="{'c-input': true, 'is-invalid': errors.has('password')}"
            name="passowrd"
            id="passowrd"
            type="password"></input>
            <span
              v-show="errors.has('passowrd')"
              class="u-text-small u-text-pink">{{ errors.first('passowrd') }}</span>
        </div>
        <div class="o-layout__item u-margin-bottom--small">
          <button
            ref="loginBtn"
            type="submit"
            class="c-btn c-btn--block c-btn--primary">Login</button>
        </div>
        <div class="o-layout__item u-text-center">
          <p class="u-margin-bottom--small">
            Don't have an account?
            <router-link :to="{name: 'registerURL'}">Register here.</router-link>
          </p>
          <p class="u-margin-bottom--none">
            Back to
            <router-link :to="{name: 'homeURL'}">homepage</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Alert from '@/components/alerts/Alert';

  export default {
    name: 'login',
    data() {
      return {
        title: 'Login',
        showAlert: false,
        alertType: 'error',
        alertMsg: '',
        formData: {
          username: '',
          password: '',
        },
      };
    },
    components: {
      Alert,
    },
    methods: {
      alertClosed(param) {
        this.showAlert = param;
      },
      successResponse(response) {
        const referrer = this.$route.query.redirect;
        this.$refs.loginForm.reset();
        this.$auth.setToken(
          response.body.token,
          Date.now() + 14400000,
          { username: this.formData.username },
        );
        this.$store.commit('auth/setLogin', true);
        if (referrer) {
          this.$router.push({ path: referrer });
        } else {
          this.$router.push({ name: 'homeURL' });
        }
      },
      errorResponse(response) {
        // console.log('error body', response.body);
        // console.log('error body code', response.body.code);
        this.alertType = 'error';
        this.alertMsg = response.body.errors.join(' ');
        this.showAlert = true;
      },
      formSubmit() {
        this.$refs.loginBtn.disabled = false;
        this.$validator.validateAll().then(() => {
          this.$http.post('auth', this.formData)
          .then(this.successResponse, this.errorResponse);
        });
        // .catch(() => {
        //   console.log('Correct them errors!');
        //   this.$refs.loginBtn.disabled = false;
        // });
      },
    },
    created() {
      window.document.title = this.title;
    },
    mounted() {
    },
  };
</script>
