<template>
  <div
    :class="inputProps.encapsulationElem.class"
    v-for="(inputContent, index) in inputProps.content"
    :key="index"
  >
    <div class="input-group mb-3">
      <input
        :type="inputContent.type"
        class="form-control"
        :onfocus="
          inputContent.column === 'birth_date'
            ? `this.type = 'date'`
            : `this.type = '${inputContent.type}'`
        "
        :placeholder="inputContent.name"
        :pattern="inputContent.pattern ? inputContent.pattern : null"
        :title="inputContent.invalidMessage ? inputContent.invalidMessage : null"
        :aria-label="inputContent.name"
        :required="inputContent.required ? inputContent.required : false"
        aria-describedby="basic-addon2"
        v-model.trim="user.input[inputContent.column]"
      />
      <div class="input-group-append" v-if="inputContent.icon">
        <div class="input-group-text">
          <span :class="inputContent.icon"></span>
        </div>
      </div>
    </div>
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
      elem: "",
      user: {
        input: {},
      },
    };
  },
  watch: {
    user: {
      handler(val) {
        this.$emit("userInput", val);
      },
      deep: true,
    },
  },
});
</script>

<style scoped>

</style>