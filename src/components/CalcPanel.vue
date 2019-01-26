<script>
import Vue from 'vue';
import {
  MdField
} from 'vue-material/dist/components';
import CalcPanelKeyboard from './CalcPanelKeyboard.vue';

Vue.use(MdField);

export default {
  components: { CalcPanelKeyboard },
  data: () => ({
    initial: 0
  })
};
</script>

<template>
  <div>
    <md-field>
      <md-input v-model="initial" />
    </md-field>

    <calc-panel-keyboard />
  </div>
</template>
