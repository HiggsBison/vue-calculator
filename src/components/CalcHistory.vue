<script>
import Vue from 'vue';
import { get } from 'axios';
import { MdProgress, MdList } from 'vue-material/dist/components';
import CalcHistoryItem from './CalcHistoryItem.vue';

[MdProgress, MdList].map(plugin => Vue.use(plugin));


export default {
  components: { CalcHistoryItem },
  data() {
    return {
      items: null
    };
  },
  mounted() {
    get('/history').then(({ data }) => { this.items = data; });
  }
};
</script>

<template>
  <div>
    <md-progress-spinner
      v-if="!items"
      md-mode="indeterminate"
    />

    <md-list
      v-else
      class="md-double-line"
    >
      <calc-history-item
        v-for="item in items"
        :key="item.id"
        v-bind="item"
        :created-at="new Date(item.created_at)"
      />
    </md-list>
  </div>
</template>
