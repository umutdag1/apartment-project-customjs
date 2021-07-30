<template>
  <div
    :class="inputProps.encapsulationElem.class"
    v-for="(inputContent, index) in inputProps.content"
    :key="index"
  >
    <div class="input-group mb-3">
      <input
        :type="inputContent.attribute.type"
        class="form-control"
        :onfocus="
          inputContent.attribute.targetType
            ? `this.type = '${inputContent.attribute.targetType}'`
            : `this.type = '${inputContent.attribute.type}'`
        "
        :placeholder="inputContent.name"
        :pattern="inputContent.attribute.pattern"
        :aria-label="inputContent.name"
        :required="inputContent.attribute.required"
        aria-describedby="basic-addon2"
        v-model.trim="user.input[inputContent.column]"
        :ref="inputContent.name"
        :title="inputContent.attribute.invalidMessage"
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
  methods: {
    onFocus(event) {
      console.log(event);
    },
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