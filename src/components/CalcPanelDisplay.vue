<script>
import Vue from 'vue';

import {
  MdField
} from 'vue-material/dist/components';

Vue.use(MdField);

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    onButtonClick: {
      type: Function,
      required: true
    }
  },
  methods: {
    onKeyUp(e) {
      const { key } = e;

      if (!Number.isNaN(key)) {
        this.onButtonClick(key);
      }
    }
  }
};
</script>

<template>
  <md-field>
    <md-input
      :value="value"
      @keydown.prevent="onKeyUp"
    />
  </md-field>
</template>

<style lang="scss" scoped>
  .md-field .md-input {
    text-align: right;
    padding: 0 8px;
    font-size: 1.5em;
  }
</style>
