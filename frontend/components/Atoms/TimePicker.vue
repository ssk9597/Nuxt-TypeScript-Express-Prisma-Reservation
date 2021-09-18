<template>
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
            @click="grandChildChooseTime(time.clock)"
          >
            <span v-if="time.isEmpty">○</span>
            <span v-else>×</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';

// types
import { TimeTable, ClickChildChooseTime, Props } from './types/TimePicker.type';

export default defineComponent({
  props: {
    timeTable: {
      type: Array as PropType<TimeTable>,
    },
    clickChildChooseTime: {
      type: Function as PropType<ClickChildChooseTime>,
    },
  },
  setup(props: Props) {
    const grandChildChooseTime = (time) => {
      props.clickChildChooseTime(time);
    };

    return {
      grandChildChooseTime,
    };
  },
});
</script>

<style lang="scss" scoped>
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
</style>