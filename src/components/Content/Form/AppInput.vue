<template>
  <div
    :class="inputProps.encapsulationElem.class"
    v-for="(inputContent, index) in inputProps.content"
    :key="index"
  >
    <div :class="inputContent.attribute.outerClass">
      <input
        :name="inputContent.name"
        :type="inputContent.attribute.type"
        :class="inputContent.attribute.innerClass"
        :onfocus="
          inputContent.attribute.targetType
            ? `this.type = '${inputContent.attribute.targetType}'`
            : `this.type = '${inputContent.attribute.type}'`
        "
        :onkeyup="inputConf"
        oninput="setCustomValidity('')"
        :placeholder="inputContent.name"
        :pattern="inputContent.attribute.pattern"
        :aria-label="inputContent.name"
        :required="inputContent.attribute.required"
        aria-describedby="basic-addon2"
        v-model.trim="userInput[inputContent.column]"
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
      userInput: {
      },
    };
  },
  methods: {
    inputConf(e) {
      for (const userInputKey in this.userInput) {
        if (this.userInput[`${userInputKey}_conf`]) {
          if (
            this.userInput[`${userInputKey}`] !==
            this.userInput[`${userInputKey}_conf`]
          ) {
            if (e.target.type === userInputKey) {
              const targetElemNameArr = e.target.name.split(" ");
              e.target.setCustomValidity(`${targetElemNameArr[0]} ile ${targetElemNameArr.join(" ")} eşleşmiyor.`);
            }
          }
        }
      }
    },
  },
  watch: {
    userInput: {
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