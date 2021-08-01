<template>
  <tbody>
    <tr v-for="(tableData, index) in axiosRequest.response" :key="index">
      <td v-for="(tableDataKey, keyIndex) in tableDataProps.keys" :key="keyIndex">
        {{ tableData[tableDataKey] }}
      </td>
    </tr>
  </tbody>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      axiosRequest: {
        response: null,
      },
    };
  },
  props: {
    tableDataProps: {
      required: true,
      type: Object,
    },
  },
  computed: {
    response() {
      return this.$store.getters.axiosRequestResponse[this.tableDataProps.values];
    },
  },
  watch: {
    response(val) {
      this.axiosRequest.response = val.responseData.data;
      this.$emit("callDataTable");
    },
  },
});
</script>

<style>
</style>