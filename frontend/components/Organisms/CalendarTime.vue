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
    <Time
      :date="date"
      :reservations="reservations"
      :today="today"
      :timeTable="timeTable"
      :clickPrevSelectDate="prevSelectDate"
      @prevSelectDate="prevSelectDate()"
      :clickChooseTime="chooseTime"
      @chooseTime="chooseTime(time)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, useContext } from '@nuxtjs/composition-api';
import axios from '@nuxtjs/axios';
import moment from 'moment';

// components
import Calendar from '../Molecules/Calendar.vue';
import Time from '../Molecules/Time.vue';

export default defineComponent({
  components: {
    Calendar,
    Time,
  },
  setup() {
    // axios
    const { $axios } = useContext();

    // onMounted
    onMounted(async () => {
      if (sessionStorage.date) {
        date.value = sessionStorage.date;
      }

      const sessionDate = sessionStorage.date;
      if (sessionDate) {
        reservations.value = await $axios.$get(`/api/reservations/${sessionDate}`);
      } else {
        const todayFormat = today.value.format('YYYY-MM-DD');
        reservations.value = await $axios.$get(`/api/reservations/${todayFormat}`);
      }

      reservations.value.forEach((reservation) => {
        timeTable.value.forEach((time) => {
          if (reservation.time === time.clock) {
            time.isEmpty = false;
          }
        });
      });
    });

    // data
    const currentDate = ref<any>(moment());
    const today = ref<any>(moment());
    const date = ref<string>();
    const reservations = ref<string[]>();
    const timeTable = ref<string[]>([
      { clock: '9:00', isEmpty: true },
      { clock: '10:00', isEmpty: true },
      { clock: '11:00', isEmpty: true },
      { clock: '12:00', isEmpty: true },
      { clock: '13:00', isEmpty: true },
      { clock: '14:00', isEmpty: true },
      { clock: '15:00', isEmpty: true },
      { clock: '16:00', isEmpty: true },
      { clock: '17:00', isEmpty: true },
      { clock: '18:00', isEmpty: true },
    ]);

    // methods
    const prevMonth = () => {
      currentDate.value = moment(currentDate.value).subtract(1, 'month');
    };

    const nextMonth = () => {
      currentDate.value = moment(currentDate.value).add(1, 'month');
    };

    const chooseDate = (date) => {
      window.location.href = 'http://localhost:3000';
      sessionStorage.date = date;
    };

    const prevSelectDate = () => {
      sessionStorage.date = '';
      sessionStorage.time = '';
      window.location.href = 'http://localhost:3000';
    };

    const chooseTime = (time) => {
      sessionStorage.time = time;
      window.location.href = 'http://localhost:3000';
    };

    return {
      // data
      currentDate,
      today,
      date,
      reservations,
      timeTable,
      // methods
      prevMonth,
      nextMonth,
      chooseDate,
      prevSelectDate,
      chooseTime,
    };
  },
});
</script>
