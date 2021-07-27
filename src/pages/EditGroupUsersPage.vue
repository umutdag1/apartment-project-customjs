<template>
  <div class="content-header">
    <div class="container-fluid">
      <content-header-component
        :headerObj="content.header"
      ></content-header-component>
    </div>
  </div>

  <section class="content">
    <div class="container-fluid">
      <data-table-component
        :dataTableProps="content.dataTableProps"
      ></data-table-component>

      <button-group-component
        :buttonProps="content.buttonGroupForAddNewGroup"
        @goBackPage="emitter.emit('goBackPage')"
        @goNextPage="emitter.emit('goNextPage', 'createTemplate')"
      ></button-group-component>
    </div>
  </section>
</template>
  
<script>
import { defineComponent } from "vue";
import ContentHeaderComponent from "@/components/content/header/header.vue";
import DataTableComponent from "@/components/content/content/mixed/custom/dataTable/dataTable.vue";
import ButtonGroupComponent from "@/components/content/content/mixed/custom/group/buttonGroup.vue";

export default defineComponent({
  components: {
    ContentHeaderComponent,
    DataTableComponent,
    ButtonGroupComponent,
  },
  data() {
    return {
      content: {
        header: {
          name: "Grup Kişileri Düzenle",
        },
        buttonGroupForAddNewGroup: {
          buttons: [
            {
              class: "btn btn-block btn-secondary my-2 mr-3",
              clickEvent: "goBackPage",
              innerHtml: "Geri Dön",
            },
            {
              class: "btn btn-block btn-primary my-2",
              clickEvent: "goNextPage",
              innerHtml: "Devam Et",
            },
          ],
          encapsulationElem: {
            class: "col-12 d-flex align-items-center justify-content-center",
          },
        },
        dataTableProps: {
          axios: {
            url: "https://jsonplaceholder.typicode.com/posts",
          },
          encapsulationElem: {
            class: "col-12",
          },
        },
      },
    };
  },
});
</script>

<style>
</style>