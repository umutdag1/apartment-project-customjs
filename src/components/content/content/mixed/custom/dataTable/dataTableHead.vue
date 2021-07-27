<template>
  <thead>
    <tr>
      <th v-for="(tableHead, index) in tableHeads" :key="index">
        {{ tableHead }}
      </th>
    </tr>
  </thead>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    props : {
        tableHeads : {
            required : true,
            type : Array
        }
    }
});
</script>

<style>
</style>