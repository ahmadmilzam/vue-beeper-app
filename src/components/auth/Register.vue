<template>
  <div class="c-panel">
    <div class="c-panel__body">
      <h1 class="u-h3">Register</h1>
      <alert
        :type="alertType"
        :closeBtn="true"
        :show="showAlert"
        @onClosed="alertClosed">
        <p>{{ alertMsg[alertType] }}</p>
      </alert>
      <form ref="form" @submit.prevent="formSubmit" class="o-layout u-margin-top">
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
          <label for="email" class="c-label">Email</label>
          <input
            v-model.trim="formData.email"
            v-validate="'required|email'"
            data-vv-as="email address"
            :class="{'c-input': true, 'is-invalid': errors.has('email')}"
            name="email"
            id="email"
            type="email"></input>
            <span
              v-show="errors.has('email')"
              class="u-text-small u-text-pink">{{ errors.first('email') }}</span>
        </div>
        <div class="o-layout__item u-margin-bottom--small">
          <label for="password" class="c-label">Password</label>
          <input
            v-model.trim="formData.password"
            v-validate="'required|min: 6'"
            :class="{'c-input': true, 'is-invalid': errors.has('password')}"
            name="password"
            id="password"
            type="password"></input>
            <span
              v-show="errors.has('password')"
              class="u-text-small u-text-pink">{{ errors.first('password') }}</span>
        </div>
        <div class="o-layout__item u-margin-bottom--small">
          <label for="cpassword" class="c-label">Confirm Password</label>
          <input
            v-validate="'required|min:6|confirmed:password'"
            data-vv-as="confirmation password"
            :class="{'c-input': true, 'is-invalid': errors.has('cpassword')}"
            name="cpassword"
            id="cpassword"
            type="password"></input>
            <span
              v-show="errors.has('cpassword')"
              class="u-text-small u-text-pink">{{ errors.first('cpassword') }}</span>
        </div>
        <div class="o-layout__item u-margin-bottom--small">
          <button ref="submitBtn" type="submit" class="c-btn c-btn--block c-btn--primary">Login</button>
        </div>
        <div class="o-layout__item u-text-center">
          <p class="u-margin-bottom--small">
            Already have an account?
            <router-link :to="{name: 'loginURL'}">Login here.</router-link>
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
        title: 'Register',
        showAlert: false,
        alertType: 'success',
        alertMsg: {
          success: 'Your account has been registered successfully',
          error: 'There\'s something wrong!',
        },
        formData: {
          username: '',
          email: '',
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
      successResponse() {
        this.alertType = 'success';
        this.showAlert = true;
        this.$refs.form.reset();
      },
      errorResponse(response) {
        // console.log('error', response);
        // console.log('error body', response.body);
        // console.log('error body code', response.body.code);
        this.alertType = 'error';
        this.alertMsg.error = response.body.errors.join(' ');
        this.showAlert = true;
      },
      formSubmit() {
        this.$refs.submitBtn.disabled = true;
        this.$validator.validateAll().then(() => {
          // console.log('form valid and submitted');
          // console.log('form data', this.formData);
          this.$http.post('users', this.formData)
          .then(this.successResponse, this.errorResponse)
          .then(() => {
            this.$refs.submitBtn.disabled = false;
          });
          // .then((data) => {
          //   console.log(data);
          // });
        }).catch(() => {
          this.$refs.submitBtn.disabled = false;
        });
      },
    },
    created() {
      window.document.title = this.title;
      // console.log('this.$route', this.$route);
      // console.log('this.$router', this.$router);
    },
  };
</script>
