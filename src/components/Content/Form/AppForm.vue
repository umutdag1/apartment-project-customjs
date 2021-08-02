<template>
  <div :class="formGroupProps.encapsulationElem.class">
    <div class="form-group">
      <label>{{ formGroupProps.labelName }}</label>
      <select class="form-control" v-model="selectedOption" :required="formGroupProps.required">
        <option value="">{{ formGroupProps.labelName }}</option>
        <option :class="formGroupOption.class"
          v-for="(formGroupOption, index) in formGroupProps.options"
          :key="index"
          :value="formGroupOption.name"
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
  data(){
    return{
      selectedOption : ''
    }
  },
  watch : {
    selectedOption(val){
      this.$emit("selectedOption",val);
      console.log(val);
    }
  }
});
</script>

<style>
</style>