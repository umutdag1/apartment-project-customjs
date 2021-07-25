<template>
  <div :class="formGroupProps.encapsulationElem.class">
    <div class="form-group">
      <label>{{ formGroupProps.labelName }}</label>
      <select class="form-control">
        <option :class="formGroupOption.class"
          v-for="(formGroupOption, index) in formGroupProps.options"
          :key="index"
        >
          {{ formGroupOption.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    formGroupProps: {
      required: true,
      type: Object,
    },
  },
});
</script>

<style>
</style>