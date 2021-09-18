<template>
  <div class="time-wrapper">
    <!-- タイムピッカーヘッダ -->
    <TimeHeader
      :dateFormat="dateFormat"
      :clickChildPrevSelectDate="childPrevSelectDate"
      @childPrevSelectDate="childPrevSelectDate"
    />
    <!-- タイムピッカー -->
    <TimePicker
      :timeTable="timeTable"
      :clickChildChooseTime="childChooseTime"
      @childChooseTime="childChooseTime"
    />
    <p class="supplement">※横にスクロールしてください</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, PropType } from '@nuxtjs/composition-api';
import moment from 'moment';

// components
import TimeHeader from '../Atoms/TimeHeader.vue';
import TimePicker from '../Atoms/TimePicker.vue';

// types
import {
  Reservations,
  TimeTable,
  ClickPrevSelectDate,
  ClickChooseTime,
  Props,
} from './types/Time.type';

export default defineComponent({
  components: {
    TimeHeader,
    TimePicker,
  },
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
    const childPrevSelectDate = () => {
      props.clickPrevSelectDate();
    };

    const childChooseTime = (time) => {
      props.clickChooseTime(time);
    };

    return {
      // computed
      dateFormat,
      // methods
      childPrevSelectDate,
      childChooseTime,
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

.supplement {
  font-size: 0.5rem;
  text-align: left;
}
</style>
