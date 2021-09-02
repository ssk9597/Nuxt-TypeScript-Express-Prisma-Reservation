<template>
  <div>
    <h1>
      {{ data }}
    </h1>
    <FormLabel :title="'姓'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync, useContext } from '@nuxtjs/composition-api';
import axios from '@nuxtjs/axios';

// component
import FormLabel from '../components/Atoms/FormLabel';

export default defineComponent({
  components: {
    FormLabel,
  },
  setup() {
    const data = ref({});
    const { $axios } = useContext();
    useAsync(async () => {
      const result = await $axios.$get('/api');
      data.value = result;
    });
    return { data };
  },
});
</script>
