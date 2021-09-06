<template>
  <div>
    <!-- カレンダーヘッダー -->
    <div class="calendar-header">
      <div
        class="calendar-header-left"
        v-if="compareToday.yearMonth < compareCurrentDate.yearMonth"
        @click="prevMonth()"
      >
        <span><fa icon="chevron-left" area-hidden="true" /></span>
        <p class="calendar-header-left-text">前月</p>
      </div>
      <div class="calendar-header-left empty" v-else></div>
      <p class="calendar-header-center">{{ getYearMonthToday }}</p>
      <div class="calendar-header-right" @click="nextMonth()">
        <p class="calendar-header-right-text">翌月</p>
        <span><fa icon="chevron-right" area-hidden="true" /></span>
      </div>
    </div>
    <!-- カレンダーテーブル -->
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
            @click="chooseDate(day.yearMonthDay)"
          >
            {{ day.day }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from '@nuxtjs/composition-api';
import moment from 'moment';

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log(getCalendar.value);
    });

    // data
    const currentDate = ref<any>(moment());
    const today = ref<any>(moment());

    // computed
    const getStartDate = computed(() => {
      let date = moment(currentDate.value);
      date.startOf('month');
      const dayOfWeek = date.day();
      return date.subtract(dayOfWeek, 'days');
    });

    const getEndDate = computed(() => {
      let date = moment(currentDate.value);
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
          });
          startDate.add(1, 'days');
        }
        calendars.push(weekRow);
      }
      return calendars;
    });

    const getYearMonthToday = computed(() => {
      return currentDate.value.format('YYYY年MM月');
    });

    const compareToday = computed(() => {
      return {
        yearMonth: Number(today.value.format('YYYYMM')),
        yearMonthDay: Number(today.value.format('YYYYMMDD')),
      };
    });
    const compareCurrentDate = computed(() => {
      return {
        yearMonth: Number(currentDate.value.format('YYYYMM')),
        yearMonthDay: Number(currentDate.value.format('YYYYMMDD')),
      };
    });

    // methods
    const prevMonth = () => {
      currentDate.value = moment(currentDate.value).subtract(1, 'month');
    };

    const nextMonth = () => {
      currentDate.value = moment(currentDate.value).add(1, 'month');
    };

    const chooseDate = (date) => {
      window.location.href = 'http://localhost:3000';
      localStorage.date = date;
    };

    return {
      // data
      currentDate,
      today,
      // computed
      getStartDate,
      getEndDate,
      getCalendar,
      getYearMonthToday,
      compareToday,
      compareCurrentDate,
      // methods
      prevMonth,
      nextMonth,
      chooseDate,
    };
  },
});
</script>

<style lang="scss" scoped>
// カレンダーヘッダー
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
// カレンダーテーブル
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
