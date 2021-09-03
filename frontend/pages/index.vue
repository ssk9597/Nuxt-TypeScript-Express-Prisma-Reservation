<template>
  <div class="reservation-container">
    <Heading :content="'ご希望の日時をお選びください'" />
    <Calendar />
    <Heading :content="'お客様の情報を入力してください'" />
    <Form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

// component
import Heading from '../components/Atoms/Heading.vue';
import Form from '../components/Template/Form.vue';
import Calendar from '../components/Template/Calendar.vue';

export default defineComponent({
  components: {
    Heading,
    Form,
    Calendar,
  },
});
</script>

<style lang="scss" scoped>
.reservation {
  &-container {
    width: 100%;
    height: 100vh;
    background: #f7f5ee;
    max-width: 450px;
    margin: 0 auto;
  }
}
</style>
