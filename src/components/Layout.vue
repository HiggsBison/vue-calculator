<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">
          {{ title }}
        </span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar
          class="md-transparent"
          md-elevation="0"
        >
          Навигация
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>keyboard</md-icon>
            <span class="md-list-item-text">
              Расчет
            </span>
          </md-list-item>

          <md-list-item>
            <md-icon>history</md-icon>
            <span class="md-list-item-text">
              История
            </span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        foobar
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
  .md-app {
    max-height: 400px;
    border: 1px solid rgba(#000, .12);
  }

   .md-drawer {
     width: 230px;
     max-width: calc(100vw - 125px);
   }
</style>

<script>
import Vue from 'vue';
import {
  MdApp, MdToolbar, MdDrawer, MdList, MdIcon, MdContent
} from 'vue-material/dist/components';

[MdApp, MdToolbar, MdDrawer, MdList, MdIcon, MdContent].map(plugin => Vue.use(plugin));

export default {
  name: 'Layout',
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>
