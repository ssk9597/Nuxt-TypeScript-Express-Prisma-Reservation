<template>
  <div class="time-wrapper">
    <!-- タイムピッカーヘッダ -->
    <div class="time-header">
      <div class="time-header-left" @click="prevSelectDate()">
        <span class="time-header-left-header-arrow">
          <fa icon="chevron-left" />
        </span>
        <p class="time-header-left-text">日付選択</p>
      </div>
      <p class="time-header-middle">{{ dateFormat }}</p>
      <div class="time-header-right"></div>
    </div>

    <!-- タイムピッカー -->
    <div class="time-table-header">
      <table class="time-table">
        <thead class="time-table-thead">
          <tr class="time-table-tr">
            <th class="time-table-th sticky"></th>
            <th class="time-table-th" v-for="(time, index) in timeTable" :key="index">
              {{ time.clock }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="time-table-tr">
            <th class="time-table-th sticky">空き状況</th>
            <td
              class="time-table-td"
              v-for="(time, index) in timeTable"
              :key="index"
              @click="chooseTime(time.clock)"
            >
              <span v-if="time.isEmpty">○</span>
              <span v-else>×</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="supplement">※横にスクロールしてください</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, PropType } from '@nuxtjs/composition-api';
import moment from 'moment';

// types
import {
  Reservations,
  TimeTable,
  ClickPrevSelectDate,
  ClickChooseTime,
  Props,
} from './types/Time.type';

export default defineComponent({
  props: {
    date: {
      type: String,
    },
    reservations: {
      type: Array as PropType<Reservations>,
    },
    today: {
      type: Object,
    },
    timeTable: {
      type: Array as PropType<TimeTable>,
    },
    clickPrevSelectDate: {
      type: Function as PropType<ClickPrevSelectDate>,
    },
    clickChooseTime: {
      type: Function as PropType<ClickChooseTime>,
    },
  },
  setup(props: Props) {
    // computed
    const dateFormat = computed(() => {
      return moment(props.date).format('YYYY年MM月DD日');
    });

    // methods
    const prevSelectDate = () => {
      props.clickPrevSelectDate();
    };

    const chooseTime = (time) => {
      props.clickChooseTime(time);
    };

    return {
      // computed
      dateFormat,
      // methods
      prevSelectDate,
      chooseTime,
    };
  },
});
</script>

<style lang="scss" scoped>
// wrapper
.time-wrapper {
  padding: 0 50px;
  max-width: 450px;
  margin: 0 auto;
  text-align: center;
}

// タイムピッカーヘッダー
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

// タイムピッカーテーブル
.time-table-header {
  border: 1px solid #ddd;
  border-right-width: 0;
  overflow-x: auto;

  & .time-table {
    width: 100%;
    text-align: center;

    &-tr {
      &:last-child {
        & th,
        & td {
          border-bottom-width: 0;
        }
      }
    }

    &-th {
      min-width: 50px;
      height: 50px;
      font-size: 0.75rem;
      background-color: #efefef;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      font-weight: bold;
      vertical-align: middle;
      white-space: nowrap;

      &.sticky {
        position: sticky;
        left: 0;
      }
    }

    &-td {
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      vertical-align: middle;
      white-space: nowrap;
    }
  }
}

.supplement {
  font-size: 0.5rem;
  text-align: left;
}
</style>
