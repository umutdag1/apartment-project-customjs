<template>
  <template
    v-for="tabPaneIndex in tabPanesProps.panes.length"
    :key="tabPaneIndex"
  >
    <div
      class="tab-pane"
      :class="{
        active: tabPaneIndex - 1 === 0,
      }"
      :id="`tab_${tabPaneIndex}`"
    >
      <div class="row">
        <slot :name="tabPanesProps.panes[tabPaneIndex-1].name"></slot>
      </div>
    </div>
  </template>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    tabPanesProps: {
      required: true,
      type: Object,
    },
  },
});
</script>

<style>
</style>