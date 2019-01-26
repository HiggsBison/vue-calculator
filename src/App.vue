<template>
  <div id="app">
    <Layout :title="$root.title" />
  </div>
</template>

<script>
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css'
import Layout from './components/Layout.vue';

export default {
  name: 'app',
  components: {
    Layout
  }
};
</script>

<style lang="scss">
  @import "~vue-material/dist/theme/engine";

  @include md-register-theme("default", (
    primary: md-get-palette-color(orange, A200),
    accent: md-get-palette-color(gray, 300)
  ));

  @import "~vue-material/dist/theme/all";

  $appWidth: 600px;
  $appHeight: 400px;

  #app {
    width: $appWidth;
    height: $appHeight;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -$appWidth/2;
    margin-top: -$appHeight/2;
  }
</style>
