<template>
  <div class="reservation-container">
    <Heading :content="'ご希望の日時をお選びください'" />
    <CalendarTime />
    <Heading :content="'お客様の情報を入力してください'" />
    <Form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

// component
import Heading from '../components/Atoms/Heading.vue';
import Form from '../components/Organisms/Form.vue';
import CalendarTime from '../components/Organisms/CalendarTime.vue';

export default defineComponent({
  components: {
    Heading,
    Form,
    CalendarTime,
  },
});
</script>

<style lang="scss" scoped>
.reservation {
  &-container {
    width: 100%;
    background: #f7f5ee;
    max-width: 450px;
    margin: 0 auto;
  }
}
</style>
