<template>
  <div class="c-panel">
    <div class="c-panel__body">
      <alert
        :type="alertType"
        :closeBtn="true"
        :show="showAlert"
        @onClosed="alertClosed">
        <p>{{ alertMsg }}</p>
      </alert>
      <router-link
        class="o-flag"
        :to="{name: 'profileURL', params: { username: user.username }}">
        <div class="o-flag__head">
          <span class="c-avatar c-avatar--large">
            <img class="c-avatar__img" :src="user.avatar"/>
          </span>
        </div>
        <div class="o-flag__body">
          <strong class="u-text-black u-h5">
            @{{ user.username }}
          </strong>
        </div>
      </router-link>
      <hr>
      <form @submit.prevent="formSubmit" class="o-layout u-margin-bottom--small">
        <div class="o-layout__item u-margin-bottom--small">
          <textarea
            class="c-input"
            :class="{
              'c-input': true,
              'is-invalid': errors.has('message')
            }"
            ref="message"
            name="message"
            v-validate="'required|max:160'"
            v-model="data.text"
            rows="6"
            placeholder="Start writting you beep here!"
            data-maxlength="160"></textarea>
          <div
            v-show="errors.has('message')"
            class="u-text-center u-text-small u-text-pink">{{ errors.first('message') }}</div>
          <div class="u-text-center u-text-small u-text-gray">{{ characterCounter }}</div>
        </div>
        <div class="o-layout__item">
          <button
            class="c-btn c-btn--primary c-btn--block"
            ref="submitBtn"
            :disabled="data.text.length <= 0 || data.text.length > maxlength"
            type="submit">Beep Now!</button>
        </div>
      </form>
    </div>
    <div class="c-panel__footer">
      <div class="o-layout">
        <div class="o-layout__item u-6of12">
          <router-link :to="{path: '/settings'}">
            <span class="fa fa-cog"></span> Settings
          </router-link>
        </div>
        <div class="o-layout__item u-6of12 u-text-right">
          <router-link :to="{name: 'logoutURL'}">
            <span class="fa fa-power-off"></span> Logout
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Alert from '@/components/alerts/Alert';

  export default {
    name: 'beep-form',
    data() {
      return {
        user: {
          username: '',
        },
        maxlength: null,
        data: {
          text: '',
        },
        showAlert: false,
        alertType: 'error',
        alertMsg: 'Alert message template',
      };
    },
    components: {
      Alert,
    },
    computed: {
      characterCounter() {
        const remaining = this.maxlength - this.data.text.length;
        const prural = remaining > 1 ? 's' : '';
        return `${remaining} character${prural} remaining.`;
      },
    },
    methods: {
      getUserInfo() {
        const userData = this.$auth.getUserData();
        console.log(userData);
        // this.user =
        // console.log(userData, userData.username);
        this.$http.get(`users/${userData.username}`)
        .then(this.requestSuccess, this.requestFailed);
      },
      requestSuccess(res) {
        console.log('req success', res);
        this.user = res.body;
      },
      requestFailed(res) {
        console.log('req fail', res);
      },
      postBeep() {
        const { token } = this.$auth.getToken();
        this.$http.post('beeps', this.data, { headers: {
          Authorization: `Bearer ${token}`,
        } }).then(this.postSuccess, this.postFail);
      },
      postSuccess(res) {
        console.log('post beeps success', res);
        this.data.text = '';
        this.alertType = 'success';
        // this.alertMsg = response.body.errors.join(' ');
        this.showAlert = true;
      },
      postFail(res) {
        console.log('post beeps fail', res);
        this.alertType = 'error';
        // this.alertMsg = response.body.errors.join(' ');
        this.showAlert = true;
      },
      alertClosed(param) {
        this.showAlert = param;
      },
      formSubmit() {
        this.$refs.submitBtn.disabled = false;
        this.$validator.validateAll().then(() => {
          this.postBeep();
        });
        // .catch(() => {
        //   console.log('Correct them errors!');
        //   this.$refs.submitBtn.disabled = false;
        // });
      },
    },
    mounted() {
      this.getUserInfo();
      this.maxlength = parseInt(this.$refs.message.dataset.maxlength, 10);
    },
  };
</script>
