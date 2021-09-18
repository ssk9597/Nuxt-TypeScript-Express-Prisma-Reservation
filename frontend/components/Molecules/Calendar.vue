<template>
  <div>
    <!-- カレンダーヘッダー -->
    <CalendarHeader
      :compareToday="compareToday"
      :compareCurrentDate="compareCurrentDate"
      :getYearMonthToday="getYearMonthToday"
      :clickChildPrevMonth="childPrevMonth"
      @childPrevMonth="childPrevMonth"
      :clickChildNextMonth="childNextMonth"
      @childNextMonth="childNextMonth"
    />
    <!-- カレンダーテーブル -->
    <CalendarTable
      :getCalendar="getCalendar"
      :compareCurrentDate="compareCurrentDate"
      :compareToday="compareToday"
      :clickChildChooseDate="childChooseDate"
      @childChooseDate="childChooseDate"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from '@nuxtjs/composition-api';
import moment from 'moment';

// components
import CalendarHeader from '../Atoms/CalendarHeader.vue';
import CalendarTable from '../Atoms/CalendarTable.vue';

// types
import { ClickPrevMonth, ClickNextMonth, ClickChooseDate, Props } from './types/Calendar.type';

export default defineComponent({
  components: {
    CalendarHeader,
    CalendarTable,
  },
  props: {
    currentDate: {
      type: Object,
    },
    today: {
      type: Object,
    },
    clickPrevMonth: {
      type: Function as PropType<ClickPrevMonth>,
    },
    clickNextMonth: {
      type: Function as PropType<ClickNextMonth>,
    },
    clickChooseDate: {
      type: Function as PropType<ClickChooseDate>,
    },
  },
  setup(props: Props) {
    // computed
    const getStartDate = computed(() => {
      let date = moment(props.currentDate);
      date.startOf('month');
      const dayOfWeek = date.day();
      return date.subtract(dayOfWeek, 'days');
    });

    const getEndDate = computed(() => {
      let date = moment(props.currentDate);
      date.endOf('month');
      const dayOfWeek = date.day();
      return date.add(6 - dayOfWeek, 'days');
    });

    const getCalendar = computed(() => {
      let startDate = getStartDate.value;
      const endDate = getEndDate.value;
      const weekNumber = Math.ceil(endDate.diff(startDate, 'days') / 7);

      let calendars = [];

      for (let week = 0; week < weekNumber; week++) {
        let weekRow = [];
        for (let day = 0; day < 7; day++) {
          weekRow.push({
            day: startDate.get('date'),
            date: startDate.format('DD'),
            month: startDate.format('MM'),
            yearMonth: Number(startDate.format('YYYYMM')),
            yearMonthDay: Number(startDate.format('YYYYMMDD')),
            googleCalendarDate: String(startDate.format('YYYY-MM-DD')),
          });
          startDate.add(1, 'days');
        }
        calendars.push(weekRow);
      }
      return calendars;
    });

    const getYearMonthToday = computed(() => {
      return moment(props.currentDate).format('YYYY年MM月');
    });

    const compareToday = computed(() => {
      return {
        yearMonth: Number(moment(props.today).format('YYYYMM')),
        yearMonthDay: Number(moment(props.today).format('YYYYMMDD')),
      };
    });

    const compareCurrentDate = computed(() => {
      return {
        yearMonth: Number(moment(props.currentDate).format('YYYYMM')),
        yearMonthDay: Number(moment(props.currentDate).format('YYYYMMDD')),
      };
    });

    // methods
    const childPrevMonth = () => {
      props.clickPrevMonth();
    };

    const childNextMonth = () => {
      props.clickNextMonth();
    };

    const childChooseDate = (date) => {
      props.clickChooseDate(date);
    };

    return {
      // computed
      getStartDate,
      getEndDate,
      getCalendar,
      getYearMonthToday,
      compareToday,
      compareCurrentDate,
      // methods
      childPrevMonth,
      childNextMonth,
      childChooseDate,
    };
  },
});
</script>