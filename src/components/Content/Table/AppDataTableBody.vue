<template>
  <tbody>
    <tr v-for="(tableData, index) in tableDataProps.values" :key="index">
      <td
        v-for="(tableDataKey, keyIndex) in tableDataProps.keys"
        :key="keyIndex"
      >
        {{ tableData[tableDataKey] }}
      </td>
      <slot name="editDeleteUserButton"></slot>
    </tr>
  </tbody>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    tableDataProps: {
      required: true,
      type: Object,
    },
  },
});
</script>

<style>
</style>