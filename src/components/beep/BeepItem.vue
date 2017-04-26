<template>
  <div class="o-box o-box--small">
    <div class="o-flag u-margin-bottom">
      <div class="o-flag__head">
        <router-link
          class="c-avatar c-avatar--large"
          :title="`@${beep.author.username}`"
          :to="{name: 'profileURL', params: {username: beep.author.username}}">
          <img class="c-avatar__img" :src="beep.author.avatar"/>
        </router-link>
      </div>
      <div class="o-flag__body">
        <div class="u-margin-bottom--small">
          <router-link
            class="u-text-black u-h5"
            :title="`@${beep.author.username}`"
            :to="{name: 'profileURL', params: {username: beep.author.username}}">
            @{{ beep.author.username }}
          </router-link>
          <span>said:</span>
        </div>
        <p
          :class="{
            'u-h4': beep.text.length <= 50,
            'u-h6': beep.text.length >= 51,
            'u-small': beep.text.length >= 101,
        }">
          {{ beep.text }}
        </p>
      </div>
    </div>
    <div class="o-layout">
      <div class="o-layout__item u-3of12">
        <button
          type="button"
          :class="{'c-btn--primary': beep.liked}"
          class="c-btn">
          <span
            class="fa"
            :class="[beep.liked ? 'fa-heart' : 'fa-heart-o']"></span>
          {{ beep.likes }} like{{ beep.likes > 1 ? 's' : ''}}
        </button>
      </div>
      <div class="o-layout__item u-9of12 u-text-right u-padding-top--tiny">
        <div class="o-list o-list--inline u-text-gray">
          <li class="o-list__item u-margin-right--tiny">
            <span class="fa fa-calendar-o"></span>
            {{ beep.created_at | dateFormat}}
          </li>
          <li class="o-list__item">
            <span class="fa fa-clock-o"></span>
            {{ beep.created_at | hourFormat}}
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment';

  export default {
    name: 'beep-item',
    props: {
      beep: {
        type: Object,
        required: true,
      },
    },
    filters: {
      dateFormat(timestamp) {
        return moment(timestamp * 1000).format('DD-MM-YYYY');
      },
      hourFormat(timestamp) {
        return moment(timestamp * 1000).format('HH:mm');
      },
    },
    methods: {
      likeBeep() {
        console.log('liked');
      },
    },
  };
</script>
