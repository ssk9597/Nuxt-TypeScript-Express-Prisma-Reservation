<template>
  <div class="time-header">
    <div class="time-header-left" @click="grandChildPrevSelectDate()">
      <span class="time-header-left-header-arrow">
        <fa icon="chevron-left" />
      </span>
      <p class="time-header-left-text">日付選択</p>
    </div>
    <p class="time-header-middle">{{ dateFormat }}</p>
    <div class="time-header-right"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';

// types
import { ClickChildPrevSelectDate } from './types/TimeHeader.type';

export default defineComponent({
  props: {
    dateFormat: {
      type: String,
    },
    clickChildPrevSelectDate: {
      type: Function as PropType<ClickChildPrevSelectDate>,
    },
  },
  setup(props) {
    const grandChildPrevSelectDate = () => {
      props.clickChildPrevSelectDate();
    };

    return {
      grandChildPrevSelectDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.time-header {
  padding: 10px;
  height: 50px;
  background: #89535a;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-left {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 50px;

    &-text {
      margin-left: 6px;
      font-size: 0.875rem;
    }
  }

  &-middle {
    font-weight: bold;
  }

  &-right {
    width: 50px;
  }
}
</style>