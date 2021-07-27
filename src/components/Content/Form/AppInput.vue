<template>
  <div
    :class="inputProps.encapsulationElem.class"
    v-for="(inputContentName, index) in inputProps.name"
    :key="index"
  >
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        :placeholder="inputContentName"
        :aria-label="inputContentName"
        aria-describedby="basic-addon2"
        v-model="user.input[index]"
      />
    </div>

    {{ user.input[index] }}
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    inputProps: {
      required: true,
      type: Object,
    },
  },
  emits: ["userInput"],
  data() {
    return {
      elem : "",
      user: {
        input: [],
      },
    };
  },
  watch: {
    user: {
      handler(val) {
        this.$emit("userInput",val);
      },
      deep: true,
    },
  },
});
</script>

<style>
</style>