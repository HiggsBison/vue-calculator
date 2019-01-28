<script>
import Vue from 'vue';
import { get, post } from 'axios';
import {
  MdProgress, MdDialog, MdDialogAlert, MdList
} from 'vue-material/dist/components';
import CalcHistoryItem from './CalcHistoryItem.vue';

[MdProgress, MdDialog, MdDialogAlert, MdList].map(plugin => Vue.use(plugin));

export default {
  components: { CalcHistoryItem },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      resource: '/history',
      storedItems: null,
      newItems: [],
      showAlert: false,
      alert: null
    };
  },
  inject: ['numberFormat'],
  computed: {
    items() {
      const { newItems, storedItems } = this;

      if (!storedItems) return null;

      return [...newItems, ...storedItems];
    }
  },
  watch: {
    value({
      operator, operands, isPercent, result
    }) {
      if (!operator) return;

      const [l, r] = operands.map(this.numberFormat.format);
      const expression = `${l} ${operator} ${r}${isPercent ? '%' : ''}`;
      const newItem = { expression, result };

      post(this.resource, newItem).catch(this.displayError);

      this.newItems = [{ ...newItem, createdAt: new Date() }, ...this.newItems];
    }
  },
  mounted() {
    get(this.resource, { params: { order: 'created_at.desc' } })
      .then(({ data }) => { this.storedItems = data; })
      .catch(this.displayError);
  },
  methods: {
    displayError({ response: { statusText, data: { message } } }) {
      this.alert = `При запросе произошла ошибка. ${statusText}: ${message}`;
      this.showAlert = true;
    }
  }
};
</script>

<template>
  <div>
    <md-dialog-alert
      :md-active.sync="showAlert"
      :md-content="alert"
      md-confirm-text="OK"
    />

    <md-progress-spinner
      v-if="!items"
      md-mode="indeterminate"
    />

    <md-list
      v-else-if="items.length"
      class="md-double-line"
    >
      <calc-history-item
        v-for="item in items"
        :key="item.id"
        :created-at="item.createdAt || new Date(item.created_at)"
        v-bind="item"
      />
    </md-list>

    <span
      v-else
      class="md-subheading"
    >
      История операций пуста
    </span>
  </div>
</template>
