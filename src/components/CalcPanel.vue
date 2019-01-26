<script>
import Vue from 'vue';
import {
  MdField
} from 'vue-material/dist/components';
import CalcPanelKeyboard, {
  FRACT, MULT, MINUS, PLUS, EQUAL
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
    calculate() {
      const [l, r] = this.operands.map(Number.parseFloat);
      let value;

      // we could use eval() here, but it's not so interesting )
      switch (this.operator) {
        case FRACT:
          value = l / r;
          break;
        case MULT:
          value = l * r;
          break;

        case MINUS:
          value = l - r;
          break;

        case PLUS:
          value = l + r;
          break;

        default:
          return;
      }

      this.operands = [value];
      this.operator = null;
    },
    onButtonClick(name) {
      switch (name) {
        case FRACT:
        case MULT:
        case MINUS:
        case PLUS:
          this.operator = name;

          break;
        case EQUAL:
          this.calculate();

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
