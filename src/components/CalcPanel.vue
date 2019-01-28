<script>
import {
  CLEAR, SIGN, PERC, DIVID, MULT, MINUS, PLUS, FRACT, EQUAL
} from 'common/operators';
import CalcPanelDisplay from './CalcPanelDisplay.vue';
import CalcPanelKeyboard from './CalcPanelKeyboard.vue';

export default {
  components: { CalcPanelDisplay, CalcPanelKeyboard },
  props: {
    value: {
      type: Object,
      required: true
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
        return this.numberFormat.format(this.result);
      },
      set(value) {
        this.result = value;
      }
    }
  },
  inject: ['numberFormat'],
  methods: {
    resetStateTo(value = 0) {
      const { operator, operands, isPercent } = this;

      this.operator = null;
      this.operands = [value];
      this.isFraction = false;
      this.isPercent = false;
      this.displayValue = value;

      if (operands.length > 1) {
        this.$emit('input', {
          operator, operands, isPercent, result: value
        });
      }
    },
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
          this.resetStateTo(0);

          break;
        case SIGN:
          this.displayValue *= -1;
          this.operands[this.operands.length - 1] *= -1;

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
          this.resetStateTo(this.calculate());

          if (name === EQUAL) {
            this.operands = [0];
          } else {
            this.operator = name;
          }

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
