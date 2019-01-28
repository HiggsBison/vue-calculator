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
          this.$emit('input', { result: null });

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
          const { operator, operands, isPercent } = this;
          const isEqual = name === EQUAL;

          this.operands = [isEqual ? 0 : value];
          this.operator = isEqual ? null : name;
          this.displayValue = value;
          this.isFraction = false;

          if (operands.length > 1) {
            this.$emit('input', {
              operator, operands, isPercent, result: value
            });
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
