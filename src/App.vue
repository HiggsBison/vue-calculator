<script>
import { defaults } from 'axios';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import TheLayout from './components/TheLayout.vue';

export default {
  components: { TheLayout },
  data() {
    return process.env;
  },
  provide() {
    const { VUE_APP_LOCALE: locale } = this;

    return {
      numberFormat: Intl.NumberFormat([locale], { maximumFractionDigits: 10 }),
      dateFormat: Intl.DateTimeFormat([locale], {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
    };
  },
  created() {
    defaults.baseURL = this.VUE_APP_API_URL;
  }
};
</script>

<template>
  <div id="app">
    <the-layout :title="VUE_APP_TITLE" />
  </div>
</template>

<style lang="scss">
  @import "~vue-material/dist/theme/engine";

  @include md-register-theme("default", (
    primary: md-get-palette-color(orange, A200),
    accent: md-get-palette-color(gray, 300)
  ));

  @import "~vue-material/dist/theme/all";
</style>
