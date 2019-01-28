<script>
import Vue from 'vue';
import {
  MdApp, MdToolbar, MdDrawer, MdList, MdIcon, MdContent
} from 'vue-material/dist/components';
import CalcPanel from './CalcPanel.vue';
import CalcHistory from './CalcHistory.vue';

[MdApp, MdToolbar, MdDrawer, MdList, MdIcon, MdContent].map(plugin => Vue.use(plugin));

export default {
  components: { CalcPanel, CalcHistory },
  data() {
    return {
      tabs: {
        panel: {
          icon: 'keyboard',
          title: 'Расчет',
          component: 'CalcPanel'
        },
        history: {
          icon: 'history',
          title: 'История',
          component: 'CalcHistory'
        }
      },
      // currentTab: 'panel',
      currentTab: 'history',
      result: null
    };
  },
  computed: {
    currentComponent() {
      return this.tabs[this.currentTab].component;
    },
    title() {
      const { result } = this;

      if (this.currentTab === 'panel') {
        return result ? `Результат: ${result}` : 'Введите данные';
      }

      return 'История операций';
    }
  }
};
</script>

<template>
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
          v-for="(tab, name) in tabs"
          :key="name"
          @click="currentTab = name"
        >
          <md-icon>{{ tab.icon }}</md-icon>
          <span class="md-list-item-text">
            {{ tab.title }}
          </span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content>
      <component
        :is="currentComponent"
        v-model="result"
      />
    </md-app-content>
  </md-app>
</template>

<style lang="scss" scoped>
  $appWidth: 600px;
  $appHeight: 400px;

  .md-app {
    border: 1px solid rgba(#000, .12);
    width: $appWidth;
    height: $appHeight;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -$appWidth/2;
    margin-top: -$appHeight/2;
  }

  .md-drawer {
    width: 150px;
    max-width: calc(100vw - 125px);
  }
</style>
