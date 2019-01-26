<script>
import CalcPanelKeyboardButton from './CalcPanelKeyboardButton.vue';

export const FRACT = '/';
export const MULT = '*';
export const MINUS = '-';
export const PLUS = '+';

function* opSeq() {
  let row = 1;

  function* getNumbers() {
    for (let i = 0; i <= 2; i += 1) {
      const num = 10 - row * 3 + i;

      if (num < 0) {
        yield { title: 0, colSpan: 2 };
        break;
      }

      yield { name: num.toString(), title: num };
    }

    row += 1;
  }

  const accent = { color: 'accent' };
  const primary = { color: 'primary' };

  yield { title: 'AC', color: 'accent', ...accent };
  yield { title: '+/-', ...accent };
  yield { title: '%', ...accent };
  yield { name: FRACT, title: '\u00F7', ...primary };

  yield* getNumbers();
  yield { name: MULT, title: '\u00D7', ...primary };

  yield* getNumbers();
  yield { name: MINUS, title: '\uFF0D', ...primary };

  yield* getNumbers();
  yield { name: PLUS, title: '\uFF0B', ...primary };

  yield* getNumbers();
  yield { title: ',' };
  yield { title: '\uFF1D', ...primary };
}

export default {
  components: { CalcPanelKeyboardButton },
  props: {
    onButtonClick: {
      type: Function,
      required: true
    }
  },
  computed: {
    buttons: () => [...opSeq()]
  }
};
</script>

<template>
  <div>
    <div>
      <div
        v-for="row in 5"
        :key="row"
        class="md-layout"
      >
        <calc-panel-keyboard-button
          v-for="button of buttons.slice((row-1)*4, row*4)"
          :key="button.title"
          :name="button.name"
          :col-span="button.colSpan"
          :color="button.color"
          @click="onButtonClick"
        >
          {{ button.title }}
        </calc-panel-keyboard-button>
      </div>
    </div>
  </div>
</template>
