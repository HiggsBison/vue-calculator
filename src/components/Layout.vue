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
          <md-list-item
            v-for="tab in tabs"
            :key="tab.name"
            @click="currentTab = tab.name"
          >
            <md-icon>{{ tab.icon }}</md-icon>
            <span class="md-list-item-text">
              {{ tab.title }}
            </span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <component :is="currentTab" />
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
  .md-app {
    border: 1px solid rgba(#000, .12);
  }

   .md-drawer {
     width: 150px;
     max-width: calc(100vw - 125px);
   }
</style>

<script>
import Vue from 'vue';
import {
  MdApp, MdToolbar, MdDrawer, MdList, MdIcon, MdContent
} from 'vue-material/dist/components';
import Calc from './Calc';
import History from './History.vue';

[MdApp, MdToolbar, MdDrawer, MdList, MdIcon, MdContent].map(plugin => Vue.use(plugin));

const tabs = [
  { name: 'Calc', icon: 'keyboard', title: 'Расчет' },
  { name: 'History', icon: 'history', title: 'История' }
];

export default {
  name: 'Layout',
  components: { Calc, History },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tabs,
      currentTab: tabs[0].name
    };
  }
};
</script>
