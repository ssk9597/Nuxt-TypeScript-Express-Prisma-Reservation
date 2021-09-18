<template>
  <div class="form">
    <div class="form-name-container">
      <div class="form-name-container-item">
        <FormLabel :title="'姓'" />
        <FormInput :placeholder="'例: 田中'" :value="firstName" @input="firstName = $event" />
      </div>
      <div class="form-name-container-item">
        <FormLabel :title="'名'" />
        <FormInput :placeholder="'例: 太郎'" :value="lastName" @input="lastName = $event" />
      </div>
    </div>
    <FormLabel :title="'メールアドレス'" />
    <FormInput
      :type="'email'"
      :placeholder="'例: taro-tanaka@example.com'"
      :value="email"
      @input="email = $event"
    />
    <FormButton :click="submit" @submit="submit()" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api';
import axios from '@nuxtjs/axios';

// component
import FormLabel from '../Atoms/FormLabel.vue';
import FormInput from '../Atoms/FormInput.vue';
import FormButton from '../Atoms/FormButton.vue';

export default defineComponent({
  components: {
    FormLabel,
    FormInput,
    FormButton,
  },
  setup() {
    // axios
    const { $axios } = useContext();

    // data
    const firstName = ref<string | undefined>();
    const lastName = ref<string | undefined>();
    const email = ref<string | undefined>();

    const submit = async () => {
      const date = sessionStorage.date;
      const time = sessionStorage.time;

      sessionStorage.date = '';
      sessionStorage.time = '';

      window.location.href = 'http://localhost:3000';

      await $axios.$post('/api/users/store', {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        date: date,
        time: time,
      });
    };

    return {
      // data
      firstName,
      lastName,
      email,
      // methods
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
.form {
  padding: 0px 50px 30px 50px;
  &-name-container {
    display: flex;
    align-items: center;

    &-item {
      width: 100%;
      &:nth-child(1) {
        margin-right: 5px;
      }

      &:nth-child(2) {
        margin-left: 5px;
      }
    }
  }
}
</style>
