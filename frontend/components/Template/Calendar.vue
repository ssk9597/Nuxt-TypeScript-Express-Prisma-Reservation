<template>
  <div>
    <Calendar
      :currentDate="currentDate"
      :today="today"
      :clickPrevMonth="prevMonth"
      @prevMonth="prevMonth()"
      :clickNextMonth="nextMonth"
      @nextMonth="nextMonth()"
      :clickChooseDate="chooseDate"
      @chooseDate="chooseDate(date)"
    />
    <br />
    <Time />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api';
import moment from 'moment';

// components
import Calendar from '../Atoms/Calendar.vue';
import Time from '../Atoms/Time.vue';

export default defineComponent({
  components: {
    Calendar,
    Time,
  },
  setup() {
    // data
    const currentDate = ref<any>(moment());
    const today = ref<any>(moment());

    // methods
    const prevMonth = () => {
      currentDate.value = moment(currentDate.value).subtract(1, 'month');
    };

    const nextMonth = () => {
      currentDate.value = moment(currentDate.value).add(1, 'month');
    };

    const chooseDate = date => {
      window.location.href = 'http://localhost:3000';
      sessionStorage.date = date;
    };

    return {
      // data
      currentDate,
      today,
      // methods
      prevMonth,
      nextMonth,
      chooseDate,
    };
  },
});
</script>
