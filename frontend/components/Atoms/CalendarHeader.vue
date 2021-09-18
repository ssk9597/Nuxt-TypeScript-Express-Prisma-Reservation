<template>
  <div class="calendar-header">
    <div
      class="calendar-header-left"
      v-if="compareToday.yearMonth < compareCurrentDate.yearMonth"
      @click="grandChildPrevMonth()"
    >
      <span><fa icon="chevron-left" area-hidden="true" /></span>
      <p class="calendar-header-left-text">前月</p>
    </div>
    <div class="calendar-header-left empty" v-else></div>
    <p class="calendar-header-center">{{ getYearMonthToday }}</p>
    <div class="calendar-header-right" @click="grandChildNextMonth()">
      <p class="calendar-header-right-text">翌月</p>
      <span><fa icon="chevron-right" area-hidden="true" /></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';

// types
import {
  CompareToday,
  CompareCurrentDate,
  ClickChildPrevMonth,
  ClickChildNextMonth,
  Props,
} from './types/CalendarHeader.type';

export default defineComponent({
  props: {
    compareToday: {
      type: Object as PropType<CompareToday>,
    },
    compareCurrentDate: {
      type: Object as PropType<CompareCurrentDate>,
    },
    getYearMonthToday: {
      type: String,
    },
    clickChildPrevMonth: {
      type: Function as PropType<ClickChildPrevMonth>,
    },
    clickChildNextMonth: {
      type: Function as PropType<ClickChildNextMonth>,
    },
  },
  setup(props: Props) {
    const grandChildPrevMonth = () => {
      props.clickChildPrevMonth();
    };
    const grandChildNextMonth = () => {
      props.clickChildNextMonth();
    };

    return {
      grandChildPrevMonth,
      grandChildNextMonth,
    };
  },
});
</script>

<style lang="scss">
.calendar-header {
  padding: 10px;
  height: 50px;
  width: 100%;
  max-width: 350px;
  background: #89535a;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;

  &-left {
    display: flex;
    align-items: center;
    cursor: pointer;

    &.empty {
      width: 44px;
    }

    &-text {
      margin-left: 6px;
      font-size: 0.875rem;
    }
  }

  &-center {
    font-weight: bold;
  }

  &-right {
    display: flex;
    align-items: center;
    cursor: pointer;

    &-text {
      margin-right: 6px;
      font-size: 0.875rem;
    }
  }
}
</style>