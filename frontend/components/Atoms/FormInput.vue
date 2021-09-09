<template>
  <div>
    <input
      class="form-input"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';

// type
import { Type } from './types/FormInput.type';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<Type>,
      default: 'text',
    },
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.form-input {
  display: block;
  width: 100%;
  padding: 10px 10px;
  margin: 10px 0;
  color: #333;
  border: solid 1px #ccc;
  border-radius: 6px;
  outline: 0;
  transition: 0.3s;

  &:focus {
    border: 1px solid #7e954e;
  }
}
</style>
