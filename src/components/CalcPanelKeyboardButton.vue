<script>
import Vue from 'vue';
import { MdButton } from 'vue-material/dist/components';

Vue.use(MdButton);

export default {
  props: {
    name: {
      type: String,
      default: null
    },
    colSpan: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: null
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
    <md-button
      :class="`md-raised ${className}`"
      @click="$emit('click', name)"
    >
      <slot />
    </md-button>
  </div>
</template>

<style lang="scss" scoped>
  $buttonMargin: 8px;

  .md-button {
    width: calc(100% - #{$buttonMargin} * 2);
    font-size: 1.5em;
  }
</style>
