<template>
  <table class="calendar-table">
    <thead class="calendar-table">
      <tr class="calendar-table-tr">
        <th class="calendar-table-tr-th">日</th>
        <th class="calendar-table-tr-th">月</th>
        <th class="calendar-table-tr-th">火</th>
        <th class="calendar-table-tr-th">水</th>
        <th class="calendar-table-tr-th">木</th>
        <th class="calendar-table-tr-th">金</th>
        <th class="calendar-table-tr-th">土</th>
      </tr>
    </thead>
    <tbody class="calendar-table">
      <tr class="calendar-table-tr" v-for="(week, index) in getCalendar" :key="index">
        <td
          class="calendar-table-tr-td"
          v-for="(day, index) in week"
          :key="index"
          :class="[
            { outside: compareCurrentDate.yearMonth !== day.yearMonth },
            { today: compareToday.yearMonthDay === day.yearMonthDay },
            { notClick: compareToday.yearMonthDay > day.yearMonthDay },
          ]"
          @click="grandChildChooseDate(day.googleCalendarDate)"
        >
          {{ day.day }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';

// types
import {
  GetCalendar,
  CompareCurrentDate,
  CompareToday,
  ClickChildChooseDate,
  Props,
} from './types/CalendarTable.type';

export default defineComponent({
  props: {
    getCalendar: {
      type: Array as PropType<GetCalendar>,
    },
    compareCurrentDate: {
      type: Object as PropType<CompareCurrentDate>,
    },
    compareToday: {
      type: Object as PropType<CompareToday>,
    },
    clickChildChooseDate: {
      type: Function as PropType<ClickChildChooseDate>,
    },
  },
  setup(props: Props) {
    const grandChildChooseDate = (date) => {
      props.clickChildChooseDate(date);
    };

    return {
      grandChildChooseDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.calendar-table {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-right-width: 0;
  text-align: center;

  &-tr {
    display: flex;
    &:last-child {
      &-th,
      &-td {
        border-bottom-width: 0;
      }
    }

    &-th {
      flex: 1;
      height: 50px;
      font-size: 0.75rem;
      background-color: #efefef;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      font-weight: bold;
      line-height: 50px;

      &:first-child {
        color: #ff4136;
      }
      &:last-child {
        color: #0074d9;
      }
    }

    &-td {
      flex: 1;
      height: 50px;
      font-size: 0.75rem;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      font-weight: bold;
      line-height: 50px;
      cursor: pointer;
    }
  }
}

.outside {
  background-color: #ddd;
  color: rgba(0, 1, 17, 0.2);
}

.today {
  background: #89535a;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
}

.notClick {
  color: rgba(0, 1, 17, 0.05);
  pointer-events: none;
}
</style>
