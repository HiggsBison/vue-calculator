<script>
import {
  CLEAR, SIGN, PERC, DIVID, MULT, MINUS, PLUS, FRACT, EQUAL
} from 'common/operators';
import CalcPanelKeyboardButton from './CalcPanelKeyboardButton.vue';

export default {
  components: { CalcPanelKeyboardButton },
  props: {
    onButtonClick: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    row: 3
  }),
  computed: {
    buttons() {
      return [...this.opSeq()];
    }
  },
  methods: {
    /**
     * get numeric button sequence row by row
     */
    * numSeq() {
      for (let i = 3; i; i -= 1) {
        const num = this.row * 3 - i + 1;

        if (num < 0) {
          yield { name: '0', colSpan: 2 };
          break;
        }

        yield { name: num.toString() };
      }

      this.row -= 1;
    },
    /**
     * get buttons sequence from left to right, from top to bottom
     */
    * opSeq() {
      const { numSeq } = this;
      const accent = { color: 'accent' };
      const primary = { color: 'primary' };

      yield { name: CLEAR, ...accent };
      yield { name: SIGN, ...accent };
      yield { name: PERC, ...accent };
      yield { name: DIVID, ...primary };
      yield* numSeq();
      yield { name: MULT, ...primary };
      yield* numSeq();
      yield { name: MINUS, ...primary };
      yield* numSeq();
      yield { name: PLUS, ...primary };
      yield* numSeq();
      yield { name: FRACT };
      yield { name: EQUAL, ...primary };
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
          {{ button.name }}
        </calc-panel-keyboard-button>
      </div>
    </div>
  </div>
</template>
