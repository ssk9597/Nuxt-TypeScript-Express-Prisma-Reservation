<template>
  <div>
    <Calendar />
    <br />
    <Time />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, useContext } from '@nuxtjs/composition-api';
import axios from '@nuxtjs/axios';

// components
import Calendar from '../Atoms/Calendar.vue';
import Time from '../Atoms/Time.vue';

export default defineComponent({
  components: {
    Calendar,
    Time,
  },
  setup() {
    // axios
    const { $axios } = useContext();

    onMounted(async () => {
      const sessionDate = sessionStorage.date;
      if (sessionDate) {
        reservations.value = await $axios.$get(`/api/reservations/${sessionDate}`);
        console.log(reservations.value);
      }
    });

    // data
    const reservations = ref<string[]>();

    return {
      reservations,
    };
  },
});
</script>
