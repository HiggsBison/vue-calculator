<script>
import Vue from 'vue';
import {
  MdField
} from 'vue-material/dist/components';
import CalcPanelKeyboard, {
  CLEAR, SIGN, DIVID, MULT, MINUS, PLUS, FRACT, EQUAL
} from './CalcPanelKeyboard.vue';

Vue.use(MdField);

export default {
  components: { CalcPanelKeyboard },
  data: () => ({
    operands: [],
    operator: null,
    value: 0,
    needChangeValue: true,
    isFraction: false,
    displayValue: '0'
  }),
  watch: {
    value(value) {
      this.displayValue = value.toLocaleString('ru-RU', { maximumFractionDigits: 10 });

      if (!this.needChangeValue) {
        this.needChangeValue = true;

        return;
      }

      this.setOperand(value);
    }
  },
  methods: {
    setOperand(value) {
      const { operator, operands } = this;
      const cur = operator ? 1 : 0;

      operands[cur] = value;
    },
    addDigit(digit) {
      const { operator, operands } = this;
      const operand = operands[operator ? 1 : 0] || '';
      const value = parseFloat(`${operand}${this.isFraction ? '.' : ''}${digit}`, 10);

      console.log({ value });

      this.setOperand(value);
      this.value = value;
      this.isFraction = false;
    },
    calculate() {
      const [l, r] = this.operands;
      let value;

      // we could use eval() here, but it's not so interesting )
      switch (this.operator) {
        case DIVID:
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
      this.value = value;
      this.isFraction = false;
    },
    onButtonClick(name) {
      this.needChangeValue = false;

      switch (name) {
        case CLEAR:
          this.operands = [];
          this.operator = null;
          this.value = 0;

          break;
        case SIGN:
          this.needChangeValue = true;
          this.value *= -1;

          break;

        case FRACT:
          if (Number.isInteger(this.value)) this.isFraction = true;

          break;

        case DIVID:
        case MULT:
        case MINUS:
        case PLUS:
        case EQUAL:
          if (this.operands.length === 2) this.calculate();

          if (name !== EQUAL) this.operator = name;

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
