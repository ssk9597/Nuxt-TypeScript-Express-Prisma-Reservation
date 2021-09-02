<template>
  <div>
    <FormLabel :title="'姓'" />
    <FormInput :placeholder="'例: 田中'" :value="firstName" @input="firstName = $event" />
    <FormLabel :title="'名'" />
    <FormInput :placeholder="'例: 太郎'" :value="lastName" @input="lastName = $event" />
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
import { defineComponent, ref, useAsync, useContext } from '@nuxtjs/composition-api';
import axios from '@nuxtjs/axios';

// component
import FormLabel from '../components/Atoms/FormLabel.vue';
import FormInput from '../components/Atoms/FormInput.vue';
import FormButton from '../components/Atoms/FormButton.vue';

export default defineComponent({
  components: {
    FormLabel,
    FormInput,
    FormButton,
  },
  setup() {
    const firstName = ref<string | undefined>();
    const lastName = ref<string | undefined>();
    const email = ref<string | undefined>();

    const submit = () => {
      console.log(firstName.value);
      console.log(lastName.value);
      console.log(email.value);
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
