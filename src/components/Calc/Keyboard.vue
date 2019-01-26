<template>
  <div class="keyboard">
    <div>
      <div
        v-for="row in 5"
        class="md-layout"
      >
        <calc-button
          v-for="button of buttons.slice((row-1)*4, row*4)"
          :key="button.title"
          :col-span="button.colSpan"
          :color="button.color"
        >
          {{ button.title }}
        </calc-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .keyboard {
  }
</style>

<script>
import CalcButton from './Button.vue';

function* opSeq() {
  let row = 1;

  function* getNumbers() {
    for (let i = 0; i <= 2; i += 1) {
      const num = 10 - row * 3 + i;

      if (num < 0) {
        yield { title: 0, colSpan: 2 };
        break;
      }

      yield { title: num };
    }

    row += 1;
  }

  const accent = { color: 'accent' };
  const primary = { color: 'primary' };

  yield { title: 'AC', color: 'accent', ...accent };
  yield { title: '\u207A', ...accent };
  yield { title: '%', ...accent };
  yield { title: '\u00F7', ...primary };

  yield* getNumbers();
  yield { title: '\u00D7', ...primary };

  yield* getNumbers();
  yield { title: '\uFF0D', ...primary };

  yield* getNumbers();
  yield { title: '\uFF0B', ...primary };

  yield* getNumbers();
  yield { title: ',' };
  yield { title: '\uFF1D', ...primary };
}

export default {
  name: 'Keyboard',
  components: { CalcButton },
  computed: {
    buttons: () => [...opSeq()]
  }
};
</script>
