<template>
  <div :class="buttonProps.encapsulationElem.class">
    <button
      :class="button.class"
      @click="$emit(button.clickEvent,$event)"
      v-for="(button, index) in buttonProps.buttons"
      :key="index"
      v-html="button.innerHtml"
    >
    </button>
  </div>
</template>

<script>
export default {
  props: {
    buttonProps: {
      required: true,
      type: Object,
    },
  }
};
</script>

<style>
</style>