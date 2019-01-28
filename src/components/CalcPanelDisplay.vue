<script>
import Vue from 'vue';

import {
  MdField
} from 'vue-material/dist/components';

import {
  CLEAR, SIGN, PERC, DIVID, MULT, MINUS, PLUS, FRACT, EQUAL
} from './CalcPanelKeyboard.vue';

Vue.use(MdField);
Vue.directive('focus', { inserted: el => el.focus() });

const keyMap = {
  Delete: CLEAR,
  Backspace: CLEAR,
  '!': SIGN,
  '%': PERC,
  '/': DIVID,
  '*': MULT,
  '-': MINUS,
  '+': PLUS,
  ',': FRACT,
  '.': FRACT,
  '=': EQUAL,
  Enter: EQUAL
};

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
    onInput(e) {
      const { key } = e;
      let prevent = true;

      // numeric key pressed and key is not space
      if (!Number.isNaN(+key) && key !== ' ') {
        this.onButtonClick(key);
      // op key is pressed
      } else if (key in keyMap) {
        this.onButtonClick(keyMap[key]);
      // check for alt, shift, F keys and others
      } else if (key.length > 1) {
        prevent = false;
      }

      if (prevent) e.preventDefault();
    }
  }
};
</script>

<template>
  <md-field>
    <md-input
      v-focus
      :value="value"
      @keydown="onInput"
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
