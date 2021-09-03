<template>
  <div class="form-label">
    <div class="form-label-ttl">{{ title }}</div>
    <div class="form-label-op" :style="styles">{{ option }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api';

// type
import { Option, Props } from './types/FormLabel.type';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    option: {
      type: String as PropType<Option>,
      default: '必須',
      validator: function(value) {
        return ['必須', '任意'].indexOf(value) !== -1;
      },
    },
  },
  setup(props: Props) {
    const styles = computed(() => {
      if (props.option === '必須') {
        return {
          backgroundColor: '#7E954E',
          color: '#fff',
        };
      } else {
        return {
          backgroundColor: '#757171',
          color: '#e0e0e0',
        };
      }
    });

    return {
      styles,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-label {
  margin-top: 10px;
  display: flex;
  align-items: center;

  &-ttl {
    font-size: 0.8rem;
    font-weight: bold;
    color: #333;
    margin-left: 10px;
  }

  &-op {
    font-size: 0.2rem;
    margin-left: 8px;
    padding: 2px 8px;
    border-radius: 6px;
  }
}
</style>
