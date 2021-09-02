<template>
  <div class="form-button">
    <button class="button" @click="childClick">予約する</button>
  </div>
</template>

<script>
export default {
  props: {
    click: {
      type: Function,
      required: true,
    },
    invalid: {
      type: Boolean,
    },
  },
  methods: {
    childClick() {
      this.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.form-button {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}

.button {
  cursor: pointer;
  width: 200px;
  display: inline-block;
  padding: 0.7rem 0;
  font-weight: bold;
  color: #fff;
  background: #89535a;
  text-decoration: none;
  user-select: none;
  border: 1px #89535a solid;
  border-radius: 20px;
  transition: 0.4s ease;

  &:hover {
    color: #89535a;
    background: #fff;
  }
}
</style>
