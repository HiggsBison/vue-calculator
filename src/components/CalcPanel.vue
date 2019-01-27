<script>
import Vue from 'vue';
import {
  MdField
} from 'vue-material/dist/components';
import CalcPanelKeyboard, {
  CLEAR, SIGN, PERC, DIVID, MULT, MINUS, PLUS, FRACT, EQUAL
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
    isPercent: false,
    displayValue: '0'
  }),
  watch: {
    value(value) {
      this.displayValue = value.toLocaleString('ru-RU', { maximumFractionDigits: 10 });
    },
    displayValue(value) {
      if (!this.needChangeValue) {
        this.needChangeValue = true;

        return;
      }

      this.setValue(value.replace(/[^\d,.]/g, ''));
    }
  },
  methods: {
    setValue(value) {
      const { operator, operands } = this;
      const cur = operator ? 1 : 0;
      const floatValue = parseFloat(value);

      operands[cur] = floatValue;
      this.value = floatValue;
    },
    addDigit(digit) {
      const { operator, operands, isFraction } = this;
      const operand = operands[operator ? 1 : 0] || '';
      const value = `${operand}${isFraction ? '.' : ''}${digit}`;

      this.setValue(value);
      this.isFraction = false;
    },
    calculate() {
      const { operator, operands: [l, r], isPercent } = this;
      let value;

      // we could use eval() here, but it's not so interesting )
      switch (operator) {
        case DIVID:
          value = l / (isPercent ? 1 / 100 * r : r);
          break;

        case MULT:
          value = (isPercent ? l / 100 : l) * r;
          break;

        case PLUS:
        case MINUS:
          value = l + (operator === PLUS ? r : -r) * (isPercent ? l / 100 : 1);
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

        case PERC:
          this.isPercent = true;

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
