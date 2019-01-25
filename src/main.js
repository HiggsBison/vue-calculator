import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  data: {
    title: process.env.VUE_APP_TITLE
  },
  render: h => h(App)
}).$mount('#app');
