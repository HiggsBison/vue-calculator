<template>
  <div>
    <md-field>
      <md-input v-model="initial" />
    </md-field>

    <keyboard />
  </div>
</template>

<script>
import Vue from 'vue';
import {
  MdField
} from 'vue-material/dist/components';
import Keyboard from './Keyboard.vue';

Vue.use(MdField);

export default {
  name: 'Calc',
  components: { Keyboard },
  data: () => ({
    initial: 0
  })
};
</script>
