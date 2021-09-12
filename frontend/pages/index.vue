<template>
  <div>
    <Index />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

// component
import Index from '../components/Pages/Index.vue';

export default defineComponent({
  components: {
    Index,
  },
});
</script>
