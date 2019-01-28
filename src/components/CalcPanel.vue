<script>
import CalcPanelDisplay from './CalcPanelDisplay.vue';
import CalcPanelKeyboard from './CalcPanelKeyboard.vue';
import {
  CLEAR, SIGN, PERC, DIVID, MULT, MINUS, PLUS, FRACT, EQUAL
} from 'common/operators';

export default {
  components: { CalcPanelDisplay, CalcPanelKeyboard },
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data: () => ({
    operands: [0],
    operator: null,
    result: 0,
    isFraction: false,
    isPercent: false
  }),
  computed: {
    displayValue: {
      get() {
        return this.result.toLocaleString('ru-RU', { maximumFractionDigits: 10 });
      },
      set(value) {
        this.result = value;
      }
    }
  },
  methods: {
    addDigit(digit) {
      const { operator, operands, isFraction } = this;
      const cur = operator ? 1 : 0;
      const operand = operands[cur] || '';
      const value = `${operand}${isFraction ? '.' : ''}${digit}`;
      const floatValue = parseFloat(value);

      operands[cur] = floatValue;
      this.displayValue = floatValue;
    },
    calculate() {
      const { operator, operands: [l, r], isPercent } = this;

      // we could use eval() here, but it's not so interesting )
      switch (operator) {
        case null:
          return l;

        case DIVID:
          return l / (isPercent ? 1 / 100 * r : r);

        case MULT:
          return (isPercent ? l / 100 : l) * r;

        case PLUS:
        case MINUS:
          return l + (operator === PLUS ? r : -r) * (isPercent ? l / 100 : 1);

        default:
          throw new Error(`Unknown operator ${operator}`);
      }
    },
    onButtonClick(name) {
      switch (name) {
        case CLEAR:
          this.operands = [];
          this.operator = null;
          this.displayValue = 0;
          this.$emit('input', null);

          break;
        case SIGN:
          this.displayValue *= -1;

          break;

        case FRACT:
          if (Number.isInteger(this.result)) this.isFraction = true;

          break;

        case PERC:
          this.isPercent = true;

          break;

        case DIVID:
        case MULT:
        case MINUS:
        case PLUS:
        case EQUAL: {
          const value = this.calculate();

          this.operands = [value];
          this.operator = name === EQUAL ? null : name;
          this.displayValue = value;
          this.isFraction = false;

          this.$emit('input', this.displayValue);

          break;
        }

        default:
          this.addDigit(name);
      }
    }
  }
};
</script>

<template>
  <div>
    <calc-panel-display
      :value="displayValue"
      :on-button-click="onButtonClick"
    />
    <calc-panel-keyboard :on-button-click="onButtonClick" />
  </div>
</template>
