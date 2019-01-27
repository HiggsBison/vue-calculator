<script>
import CalcPanelKeyboardButton from './CalcPanelKeyboardButton.vue';

export const SIGN = '+/-';
export const CLEAR = 'AC';
export const PERC = '%';
export const DIVID = '/';
export const MULT = '*';
export const MINUS = '-';
export const PLUS = '+';
export const EQUAL = '=';
export const FRACT = ',';

export default {
  components: { CalcPanelKeyboardButton },
  props: {
    onButtonClick: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    row: 1
  }),
  computed: {
    buttons() {
      return [...this.opSeq()];
    }
  },
  methods: {
    * numSeq() {
      for (let i = 0; i <= 2; i += 1) {
        const num = 10 - this.row * 3 + i;

        if (num < 0) {
          yield { name: '0', colSpan: 2 };
          break;
        }

        yield { name: num.toString() };
      }

      this.row += 1;
    },
    * opSeq() {
      const { numSeq } = this;
      const accent = { color: 'accent' };
      const primary = { color: 'primary' };

      yield { name: CLEAR, ...accent };
      yield { name: SIGN, ...accent };
      yield { name: PERC, ...accent };
      yield { name: DIVID, title: '\u00F7', ...primary };

      yield* numSeq();
      yield { name: MULT, title: '\u00D7', ...primary };

      yield* numSeq();
      yield { name: MINUS, title: '\uFF0D', ...primary };

      yield* numSeq();
      yield { name: PLUS, title: '\uFF0B', ...primary };

      yield* numSeq();
      yield { name: FRACT };
      yield { name: EQUAL, title: '\uFF1D', ...primary };
    }
  }
};
</script>

<template>
  <div>
    <div>
      <!-- iterate over 5 rows -->
      <div
        v-for="row in 5"
        :key="row"
        class="md-layout"
      >
        <!-- iterate over row buttons -->
        <calc-panel-keyboard-button
          v-for="button of buttons.slice((row-1)*4, row*4)"
          :key="button.name"
          v-bind="button"
          @click="onButtonClick"
        >
          {{ button.title || button.name }}
        </calc-panel-keyboard-button>
      </div>
    </div>
  </div>
</template>
