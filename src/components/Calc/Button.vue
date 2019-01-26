<script>
import Vue from 'vue';
import { MdButton } from 'vue-material/dist/components';

Vue.use(MdButton);

export default {
  name: 'CalcButton',
  props: {
    colSpan: {
      type: Number,
      default: 1
    },
    color: {
      type: String
    }
  },
  computed: {
    className() {
      const { color } = this;

      return color && `md-${color}`;
    }
  }
};
</script>

<template>
  <div :class="`md-layout-item md-size-${colSpan * 25}`">
    <md-button :class="`md-raised md-size-50 ${className}`">
      <slot />
    </md-button>
  </div>
</template>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";

  $buttonMargin: 8px;

  .md-button {
    width: calc(100% - #{$buttonMargin} * 2);

    .button-gray {
      background-color: #000;
    }
  }
</style>
