<script>
export default {
  props: {
    expression: {
      type: String,
      required: true
    },
    result: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    }
  },
  computed: {
    formattedDate() {
      return this.dateFormat.format(this.createdAt);
    },
    text() {
      const { expression, result, numberFormat: { format } } = this;

      return `${expression} \uFF1D ${format(result)}`;
    }
  },
  inject: ['numberFormat', 'dateFormat']
};
</script>

<template>
  <md-list-item>
    <md-icon class="md-primary">
      done
    </md-icon>

    <div class="md-list-item-text">
      <span>{{ text }}</span>
      <span>{{ formattedDate }}</span>
    </div>
  </md-list-item>
</template>
