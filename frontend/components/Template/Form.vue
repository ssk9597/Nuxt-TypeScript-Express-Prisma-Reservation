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
import { defineComponent, ref } from '@nuxtjs/composition-api';
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
