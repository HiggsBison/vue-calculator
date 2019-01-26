<script>
import Vue from 'vue';
import {
  MdField
} from 'vue-material/dist/components';
import CalcPanelKeyboard, {
  FRACT, MULT, MINUS, PLUS
} from './CalcPanelKeyboard.vue';

Vue.use(MdField);

export default {
  components: { CalcPanelKeyboard },
  data: () => ({
    operands: ['0'],
    operator: null
  }),
  computed: {
    displayValue: {
      get() {
        return this.operands.slice(-1)[0];
      },
      set() {
        console.log('setter');
      }
    }
  },
  methods: {
    addDigit(digit) {
      const { operands } = this;
      const cur = this.operator ? 1 : 0;

      operands[cur] = (+operands[cur] || '') + digit;
      this.operands = [...operands];
    },
    onButtonClick(name) {
      switch (name) {
        case FRACT:
        case MULT:
        case MINUS:
        case PLUS:
          this.operator = name;

          break;

        default:
          this.addDigit(name);
      }
    }
  }
};
</script>

<template>
  <div>
    <md-field>
      <md-input v-model="displayValue" />
    </md-field>

    <calc-panel-keyboard :on-button-click="onButtonClick" />
  </div>
</template>
