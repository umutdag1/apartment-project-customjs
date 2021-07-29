<template>
  <div class="content-header">
    <div class="container-fluid">
      <app-header-component :headerObj="content.header"></app-header-component>
    </div>
  </div>

  <section class="content">
    <div class="container-fluid">
      <app-form-component :formGroupProps="content.formGroupForSelectGroup">
      </app-form-component>

      <app-data-table-component
        :dataTableProps="content.dataTableProps"
      ></app-data-table-component>

      <app-button-component
        :buttonProps="content.buttonGroupForAddNewGroup"
        @goBackPage="$store.dispatch('changePage',null)"
        @goNextPage="$store.dispatch('changePage','createMeetingTemplate')"
      ></app-button-component>
    </div>
  </section>
</template>
  
<script>
import { defineComponent } from "vue";
import AppHeaderComponent from "@/components/Header/AppHeader.vue";
import AppFormComponent from "@/components/Content/Form/AppForm.vue";
import AppDataTableComponent from "@/components/Content/Table/AppDataTable.vue";
import AppButtonComponent from "@/components/Content/UI/AppButton.vue";

export default defineComponent({
  components: {
    AppHeaderComponent,
    AppFormComponent,
    AppDataTableComponent,
    AppButtonComponent,
  },
  data() {
    return {
      content: {
        header: {
          name: "Grup Kişileri Düzenle",
        },
        formGroupForSelectGroup: {
          labelName: "Grup Seç",
          options: [
            {
              name: "Group1",
              class: "",
            },
            {
              name: "Group2",
              class: "",
            },
          ],
          encapsulationElem: {
            class: "col-12",
          },
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
  }
});
</script>

<style>
</style>