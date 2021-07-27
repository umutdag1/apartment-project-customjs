<template>
  <div class="content-header">
    <div class="container-fluid">
      <app-header-component
        :headerObj="content.header"
      ></app-header-component>
    </div>
  </div>

  <section class="content">
    <div class="container-fluid">
      <app-data-table-component
        :dataTableProps="content.dataTableProps"
      ></app-data-table-component>

      <app-button-component
        :buttonProps="content.buttonGroupForAddNewGroup"
        @goBackPage="emitter.emit('goBackPage')"
        @goNextPage="emitter.emit('goNextPage', 'createTemplate')"
      ></app-button-component>
    </div>
  </section>
</template>
  
<script>
import { defineComponent } from "vue";
import AppHeaderComponent from "@/components/Header/AppHeader.vue";
import AppDataTableComponent from "@/components/Content/Table/AppDataTable.vue";
import AppButtonComponent from "@/components/Content/UI/AppButton.vue";

export default defineComponent({
  components: {
    AppHeaderComponent,
    AppDataTableComponent,
    AppButtonComponent,
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