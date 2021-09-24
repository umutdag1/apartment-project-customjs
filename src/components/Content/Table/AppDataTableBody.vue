<template>
  <tbody>
    <tr v-for="(tableData, index) in tableDataProps.values" :key="index">
      <td
        v-for="(tableDataKey, keyIndex) in tableDataProps.keys"
        :key="keyIndex"
        v-html="tableData[tableDataKey]"
      >
      </td>
      <td>
        <app-button-component
          :buttonProps="content.buttonGroupForEditDeleteUser"
          @editUser="$emit('callEditUserFunc',tableData)"
        >
        </app-button-component>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { defineComponent } from "vue";
import AppButtonComponent from "@/components/Content/UI/AppButton.vue";

export default defineComponent({
  components: {
    AppButtonComponent,
  },
  props: {
    tableDataProps: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      content: {
        buttonGroupForEditDeleteUser: {
          buttons: [
            {
              class: "btn btn-block btn-primary my-2",
              clickEvent: "editUser",
              innerHtml: "Düzenle",
            },
            {
              class: "btn btn-block btn-danger my-2",
              clickEvent: "deleteUser",
              innerHtml: "Sil",
            },
          ],
          encapsulationElem: {
            class:
              "col-12 d-flex align-items-center justify-content-center flex-column",
          },
        },
      },
    };
  },
});
</script>

<style>
</style>