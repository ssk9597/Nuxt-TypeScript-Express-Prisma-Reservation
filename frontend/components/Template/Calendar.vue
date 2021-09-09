<template>
  <div>
    <Calendar />
    <br />
    <Time />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

// components
import Calendar from '../Atoms/Calendar.vue';
import Time from '../Atoms/Time.vue';

export default defineComponent({
  components: {
    Calendar,
    Time,
  },
});
</script>