<template>
  <div class="heading-container">
    <h2 class="heading-content">{{ content }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.heading {
  &-container {
    padding-top: 80px;
  }
  &-content {
    margin-left: 30px;
    padding-left: 0.5em;
    font-size: 1.2rem;
    color: #333;
    border-left: 4px solid #89535a;
  }
}
</style>
